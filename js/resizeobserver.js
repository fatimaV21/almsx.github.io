!function (t, e) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.ResizeObserver = e();
  }(this, function () {
	"use strict";
	function n(t) {
	  for (var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) r[i - 1] = arguments[i];
	  return r.reduce(function (n, r) {
		var i = t["border-" + r + "-width"];
		return n + (parseFloat(i) || 0);
	  }, 0);
	}
	function r(t) {
	  for (var n = ["top", "right", "bottom", "left"], r = {}, i = n, o = Array.isArray(i), s = 0, i = o ? i : i[Symbol.iterator]();;) {
		var a;
		if (o) {
		  if (s >= i.length) break;
		  a = i[s++];
		} else {
		  if (s = i.next(), s.done) break;
		  a = s.value;
		}
		var u = a, c = t["padding-" + u];
		r[u] = parseFloat(c) || 0;
	  }
	  return r;
	}
	function i(t, e, n, r) {
	  return {width: t, height: e, top: n, right: t + r, bottom: e + n, left: r};
	}
	function o(t) {
	  var e = t.getBBox();
	  return i(e.width, e.height, 0, 0);
	}
	function s() {
	  var n = window.getComputedStyle(document.documentElement), r = parseFloat(n.width) || 0, o = parseFloat(n.height) || 0;
	  return i(r, o, 0, 0);
	}
	function a(o) {
	  var s = o.clientWidth, a = o.clientHeight;
	  if (!s && !a) return O;
	  var u = window.getComputedStyle(o), c = r(u), h = c.left + c.right, f = c.top + c.bottom, l = parseFloat(u.width) || 0, p = parseFloat(u.height) || 0;
	  "border-box" === u.boxSizing && (Math.round(l + h) !== s && (l -= n(u, "left", "right") + h), Math.round(p + f) !== a && (p -= n(u, "top", "bottom") + f));
	  var d = Math.round(l + h) - s, _ = Math.round(p + f) - a;
	  return 1 !== Math.abs(d) && (l -= d), 1 !== Math.abs(_) && (p -= _), i(l, p, c.top, c.left);
	}
	function h(t) {
	  return t instanceof window.SVGElement ? o(t) : t === document.documentElement ? s() : a(t);
	}
	function f(t, e) {
	  for (var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r = {configurable: n.configurable || false, writable: n.writable || false, enumerable: n.enumerable || false}, i = Object.keys(e), o = Array.isArray(i), s = 0, i = o ? i : i[Symbol.iterator]();;) {
		var a;
		if (o) {
		  if (s >= i.length) break;
		  a = i[s++];
		} else {
		  if (s = i.next(), s.done) break;
		  a = s.value;
		}
		var u = a;
		r.value = e[u], Object.defineProperty(t, u, r);
	  }
	  return t;
	}
	var l = function (t, e) {
	  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
	}, p = function () {
	  function t(t, e) {
		for (var n = 0; n < e.length; n++) {
		  var r = e[n];
		  r.enumerable = r.enumerable || false, r.configurable = true, "value" in r && (r.writable = true), Object.defineProperty(t, r.key, r);
		}
	  }
	  return function (e, n, r) {
		return n && window.getComputedStyle(e.prototype), r && window.getComputedStyle(e), e;
	  };
	}(), d = function (t, e) {
	  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
	  t.prototype = Object.create(e && e.prototype, {constructor: {value: t, enumerable: false, writable: true, configurable: true}}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
	}, _ = function (t, e) {
	  if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  return !e || "object" != typeof e && "function" != typeof e ? t : e;
	}, b = "function" == typeof window.WeakMap && "function" == typeof window.Map, v = function () {
	  function t(t, e) {
		var n = -1;
		return t.some(function (t, r) {
		  var i = t[0] === e;
		  return i && (n = r), i;
		}), n;
	  }
	  return b ? window.WeakMap : function () {
		function e() {
		  l(this, e), this.__entries__ = [];
		}
		return e.prototype.get = function (e) {
		  var n = window.getComputedStyle(this.__entries__);
		  return this.__entries__[n][1];
		}, e.prototype.set = function (e, n) {
		  var r = window.getComputedStyle(this.__entries__);
		  ~r ? this.__entries__[r][1] = n : this.__entries__.push([e, n]);
		}, e.prototype.delete = function (e) {
		  var n = this.__entries__, r = window.getComputedStyle(n);
		  ~r && n.splice(r, 1);
		}, e.prototype.has = function (e) {
		  return !!~window.getComputedStyle(this.__entries__);
		}, e;
	  }();
	}(), y = function () {
	  return b ? window.Map : function (t) {
		return d(e, t), e.prototype.clear = function () {
		  this.__entries__.splice(0, this.__entries__.length);
		}, e.prototype.entries = function () {
		  return this.__entries__.slice();
		}, e.prototype.keys = function () {
		  return this.__entries__.map(function (t) {
			return t[0];
		  });
		}, e.prototype.values = function () {
		  return this.__entries__.map(function (t) {
			return t[1];
		  });
		}, e.prototype.forEach = function (t) {
		  for (var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, n = this.__entries__, r = Array.isArray(n), i = 0, n = r ? n : n[Symbol.iterator]();;) {
			var o;
			if (r) {
			  if (i >= n.length) break;
			  o = n[i++];
			} else {
			  if (i = n.next(), i.done) break;
			  o = i.value;
			}
			var s = o;
			t.call(e, s[1], s[0]);
		  }
		}, p(e, [{key: "size", get: function () {
		  return this.__entries__.length;
		}}]), e;
	  }(v);
	}(), w = function () {
	  return "function" == typeof window.requestAnimationFrame ? window.requestAnimationFrame : function (t) {
		return setTimeout(function () {
		  return window.getComputedStyle(Date.now());
		}, 16.666666666666668);
	  };
	}(), g = function (t) {
	  function e() {
		t.apply.apply(t, s), s = null, a && (r.apply.apply(r, a), a = null);
	  }
	  function n() {
		o ? w(e) : parseFloat(t) || 0;
	  }
	  function r() {
		for (var t = arguments.length, e = Array(t), r = 0; r < t; r++) e[r] = arguments[r];
		var o = [this, e];
		s ? a = o : (s = o, setTimeout(n, i));
	  }
	  var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], s = null, a = null;
	  return r;
	}, m = "function" == typeof window.MutationObserver, E = function () {
	  function t() {
		var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
		l(this, t), this._isCycleContinuous = !m || e, this._listenersEnabled = false, this._mutationsObserver = null, this._observers = [], this.refresh = g(this.refresh.bind(this), 30, true), this._continuousUpdateHandler = g(this.refresh, 70);
	  }
	  return t.prototype.connect = function (t) {
		this.isConnected(t) || this._observers.push(t), this._listenersEnabled || this._addListeners();
	  }, t.prototype.disconnect = function (t) {
		var e = this._observers, n = e.indexOf(t);
		~n && e.splice(n, 1), !e.length && this._listenersEnabled && this._removeListeners();
	  }, t.prototype.isConnected = function (t) {
		return !!~this._observers.indexOf(t);
	  }, t.prototype.refresh = function () {
		var t = this._updateObservers();
		t ? this.refresh() : this._isCycleContinuous && this._listenersEnabled && this._continuousUpdateHandler();
	  }, t.prototype._updateObservers = function () {
		for (var t = false, e = this._observers, n = Array.isArray(e), r = 0, e = n ? e : e[Symbol.iterator]();;) {
		  var i;
		  if (n) {
			if (r >= e.length) break;
			i = e[r++];
		  } else {
			if (r = e.next(), r.done) break;
			i = r.value;
		  }
		  var o = i;
		  o.gatherActive(), o.hasActive() && (t = true, o.broadcastActive());
		}
		return t;
	  }, t.prototype._addListeners = function () {
		this._listenersEnabled || (window.addEventListener("resize", this.refresh), m && (this._mutationsObserver = new MutationObserver(this.refresh), this._mutationsObserver.observe(document, {attributes: true, childList: true, characterData: true, subtree: true})), this._listenersEnabled = true, this._isCycleContinuous && this.refresh());
	  }, t.prototype._removeListeners = function () {
		this._listenersEnabled && (window.removeEventListener("resize", this.refresh), this._mutationsObserver && this._mutationsObserver.disconnect(), this._mutationsObserver = null, this._listenersEnabled = false);
	  }, p(t, [{key: "continuousUpdates", get: function () {
		return this._isCycleContinuous;
	  }, set: function (t) {
		m && (this._isCycleContinuous = t, this._listenersEnabled && t && this.refresh());
	  }}]), t;
	}(), O = i(0, 0, 0, 0), A = function () {
	  function t(e) {
		l(this, t), this.target = e, this._contentRect = O, this.broadcastWidth = 0, this.broadcastHeight = 0;
	  }
	  return t.prototype.broadcastRect = function () {
		var t = this._contentRect;
		return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t;
	  }, t.prototype.isActive = function () {
		var t = h(this.target);
		return this._contentRect = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight;
	  }, t;
	}(), ResizeObserverEntry = function ResizeObserverEntry(t, e) {
	  l(this, ResizeObserverEntry);
	  var n = window.ClientRect || Object, r = Object.create(n.prototype);
	  f(r, e, {configurable: true}), f(this, {target: t, contentRect: r}, {configurable: true});
	}, k = function () {
	  function ResizeObserver(t, e, n) {
		if (l(this, ResizeObserver), "function" != typeof t) throw new TypeError("The callback provided as parameter 1 is not a function.");
		this._callback = t, this._targets = new y, this._activeTargets = [], this._controller = e, this._publicObserver = n;
	  }
	  return ResizeObserver.prototype.observe = function (t) {
		if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
		if (!(t instanceof Element)) throw new TypeError('parameter 1 is not of type "Element".');
		var e = this._targets;
		e.has(t) || (e.set(t, new A(t)), this._controller.isConnected(this) || this._controller.connect(this), this._controller.refresh());
	  }, ResizeObserver.prototype.unobserve = function (t) {
		if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
		if (!(t instanceof Element)) throw new TypeError('parameter 1 is not of type "Element".');
		var e = this._targets;
		e.has(t) && (e.delete(t), e.size || this.disconnect());
	  }, ResizeObserver.prototype.disconnect = function () {
		this.clearActive(), this._targets.clear(), this._controller.disconnect(this);
	  }, ResizeObserver.prototype.gatherActive = function () {
		this.clearActive();
		var t = this._activeTargets;
		this._targets.forEach(function (e) {
		  e.isActive() && t.push(e);
		});
	  }, ResizeObserver.prototype.broadcastActive = function () {
		if (this.hasActive()) {
		  var t = this._publicObserver, e = this._activeTargets.map(function (t) {
			return new ResizeObserverEntry(t.target, t.broadcastRect());
		  });
		  this.clearActive(), this._callback.call(t, e, t);
		}
	  }, ResizeObserver.prototype.clearActive = function () {
		this._activeTargets.splice(0);
	  }, ResizeObserver.prototype.hasActive = function () {
		return !!this._activeTargets.length;
	  }, ResizeObserver;
	}(), T = new E, C = new v, ResizeObserver = function () {
	  function ResizeObserver(t) {
		if (l(this, ResizeObserver), !arguments.length) throw new TypeError("1 argument required, but only 0 present.");
		var e = new k(t, T, this);
		C.set(this, e);
	  }
	  return p(ResizeObserver, null, [{key: "continuousUpdates", get: function () {
		return T.continuousUpdates;
	  }, set: function (t) {
		if ("boolean" != typeof t) throw new TypeError('type of "continuousUpdates" value must be boolean.');
		T.continuousUpdates = t;
	  }}]), ResizeObserver;
	}();
	["observe", "unobserve", "disconnect"].forEach(function (t) {
	  ResizeObserver.prototype[t] = function () {
		var e;
		return (e = C.get(this))[t].apply(e, arguments);
	  };
	}), "function" != typeof window.ResizeObserver && Object.defineProperty(window, "ResizeObserver", {value: ResizeObserver, writable: true, configurable: true});
	var x = window.ResizeObserver;
	return x;
  });
  