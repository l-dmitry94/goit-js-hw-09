!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},r=n.parcelRequire7bc7;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var u=new Error("Cannot find module '"+e+"'");throw u.code="MODULE_NOT_FOUND",u}).register=function(e,n){o[e]=n},n.parcelRequire7bc7=r);var u=r("6JpON"),a={form:document.querySelector(".form"),delayInput:document.querySelector("[name='delay']"),stepInput:document.querySelector("[name='step']"),amountInput:document.querySelector("[name='amount']")};a.form.addEventListener("submit",(function(n){n.preventDefault();var t=Number(a.delayInput.value),o=Number(a.stepInput.value),r=Number(a.amountInput.value),i=0,l=1,c=t,d=setInterval((function(){var n,t;i!==r?((n=l,t=c,new Promise((function(e,o){var r=Math.random()>.3;setTimeout((function(){r&&e({position:n,delay:t}),o({position:n,delay:t})}),t)}))).then((function(n){var t=n.position,o=n.delay;e(u).Notify.success("✅ Fulfilled promise ".concat(t," in ").concat(o,"ms"))})).catch((function(n){var t=n.position,o=n.delay;e(u).Notify.failure("❌ Rejected promise ".concat(t," in ").concat(o,"ms"))})),i+=1,l+=1,c+=o):clearInterval(d)}),o)}))}();
//# sourceMappingURL=03-promises.914bcff6.js.map