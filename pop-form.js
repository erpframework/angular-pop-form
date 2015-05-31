(function () {
    'use strict';

    angular.module('PopForm', [])

    .directive('popForm', ['$log', '$sce', function ($log, $sce) {

        function parseClasses (dest, src, key) {
            if (!angular.isDefined(src[key]) || !src[key]) {
                src[key] = [];
            }
            src[key] = typeof src[key] === 'string' ? [src[key]] : src[key];
            dest = dest.concat(src[key]);
            return dest;
        }

        function parseElement (element, key) {
            element.modelProp = key;
            if (!angular.isDefined(element.type) && angular.isDefined(element.html)) {
                element.type = 'html';
            }
            element.type = element.type ? element.type : 'text';
            element.name = key;
            element.id = key;
            var defaultClasses = [];
            if (element.type === 'button' || element.type === 'submit') {
                defaultClasses.push('btn');
            } else {
                defaultClasses.push('form-control');
            }
            if (element.type === 'html') {
                element.trustedHtml = $sce.trustAsHtml(element.html);
            }
            defaultClasses.push('element-' + key);
            element.classes = parseClasses(defaultClasses, element, 'classes');
            return element;
        }

        return {
            restrict: 'AE',
            templateUrl: '/app/components/pop-form/pop-form.tpl.html',
            replace: true,
            scope: {
                form: '=',
                onInit: '=?',
                onSubmit: '='
            },
            link: function (scope, elem, attr, ctrl, transclude) {
                var groups = [];
                var weight = 0;
                angular.forEach(scope.form.elements, function (val, key) {
                    var group = {
                        elements: [],
                        weight: weight++
                    };
                    if (val.type === 'group') {
                        group.classes = parseClasses(['form-group'], val, 'classes');
                        group.wrapperClasses = parseClasses([], val, 'wrapperClasses');
                        var elemWeight = 0;
                        var element = null;
                        angular.forEach(val.elements, function (eVal, eKey) {
                            element = parseElement(eVal, eKey);
                            element.weight = elemWeight++;
                            group.elements.push(element);
                        });
                    } else {
                        group.elements.push(parseElement(val, key));
                        group.classes = parseClasses(['form-group'], val, 'groupClasses');
                        group.wrapperClasses = parseClasses([], val, 'wrapperClasses');
                    }
                    groups.push(group);
                });
                scope.groups = groups;
                $log.log('pop-form groups', scope.groups);
            },
            controller: function ($scope) {

                $scope.record = {};

                if ($scope.onInit) {
                    var data = $scope.onInit($scope.record);
                    angular.extend($scope.record, data);
                }

                $scope.doSubmit = function () {
                    if ($scope.popForm.$invalid) {

                    } else {
                        if ($scope.onSubmit) {
                            $scope.onSubmit($scope.record);
                        }
                    }
                };

            }
        };
    }]);

})();
