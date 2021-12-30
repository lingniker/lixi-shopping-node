var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Injectable = function () { return function (target) { }; };
var OtherService = /** @class */ (function () {
    function OtherService() {
        this.a = 1;
    }
    return OtherService;
}());
var TestService = /** @class */ (function () {
    function TestService(otherService) {
        this.otherService = otherService;
    }
    TestService.prototype.testMethod = function () {
        console.log(this.otherService.a);
    };
    TestService = __decorate([
        Injectable()
    ], TestService);
    return TestService;
}());
var Factory = function (target) {
    // 获取所有注入的服务
    var providers = Reflect.getMetadata('design:paramtypes', target); // [OtherService]
    var args = providers.map(function (provider) { return new provider(); });
    return new (target.bind.apply(target, __spreadArray([void 0], args, false)))();
};
Factory(TestService).testMethod(); // 1
