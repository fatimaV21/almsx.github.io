!function (n, t) {
	"object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((n = n || self).immer = {});
  }(this, function (n) {
	function t(n) {
	  for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), e = 1; e < t; e++) r[e - 1] = arguments[e];
	  throw Error("[Immer] minified error nr: " + n + (r.length ? " " + r.join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
	}
	function e(n) {
	  return !!n && (function (n) {
		if (!n || "object" != typeof n) return false;
		var t = Object.getPrototypeOf(n);
		return !t || t === Object.prototype;
	  }(n) || Array.isArray(n) || !!n[q] || !!n.constructor[q] || C && n instanceof Map || I && n instanceof Set);
	}
	function i(n, t, r) {
	  void 0 === r && (r = false), 0 === u(n) ? (r ? Object.keys : H)(n).forEach(function (r) {
		return t(r, n[r], n);
	  }) : n.forEach(function (r, e) {
		return t(e, r, n);
	  });
	}
	function u(n) {
	  var t = n[B];
	  return t ? t.t > 3 ? t.t - 4 : t.t : Array.isArray(n) ? 1 : C && n instanceof Map ? 2 : I && n instanceof Set ? 3 : 0;
	}
	function o(n, t) {
	  return 2 === u(n) ? n.has(t) : Object.prototype.hasOwnProperty.call(n, t);
	}
	function f(n, t) {
	  return 2 === u(n) ? n.get(t) : n[t];
	}
	function a(n, t) {
	  return n === t ? 0 !== n || 1 / n == 1 / t : n != n && t != t;
	}
	function p(n, r) {
	  if (void 0 === r && (r = false), Array.isArray(n)) return n.slice();
	  var e = Object.create(Object.getPrototypeOf(n));
	  return i(n, function (i) {
		if (i !== B) {
		  var u = Object.getOwnPropertyDescriptor(n, i), o = u.value;
		  u.get && (r || t(1), o = u.get.call(n)), u.enumerable ? e[i] = o : Object.defineProperty(e, i, {value: o, writable: true, configurable: true});
		}
	  }), e;
	}
	function h(n, t) {
	  !!n && !!n[B] || (null == n || "object" != typeof n || Object.isFrozen(n)) || !e(n) || (u(n) > 1 && (n.set = n.add = n.clear = n.delete = l), Object.freeze(n), t && i(n, function (n, t) {
		return h(t, true);
	  }, true));
	}
	function l() {
	  t(2);
	}
	function _(n) {
	  var r = L[n];
	  return r || t(19, n), r;
	}
	function y(n, t) {
	  L[n] = t;
	}
	function m(n, t) {
	  t && (_("Patches"), n.o = [], n.v = [], n.s = t);
	}
	function j(n) {
	  O(n), n.p.forEach(w), n.p = null;
	}
	function O(n) {
	  n === N && (N = n.h);
	}
	function S(n) {
	  return N = {p: [], h: N, l: n, _: true, m: 0};
	}
	function w(n) {
	  var t = n[B];
	  0 === t.t || 1 === t.t ? t.j() : t.O = true;
	}
	function P(n, r) {
	  r.m = r.p.length;
	  var i = r.p[0], u = void 0 !== n && n !== i;
	  return r.l.S || _("ES5").P(r, n, u), u ? (i[B].M && (j(r), t(4)), e(n) && (n = M(r, n), r.h || A(r, n)), r.o && _("Patches").g(i[B], n, r.o, r.v)) : n = M(r, i, []), j(r), r.o && r.s(r.o, r.v), n !== X ? n : void 0;
	}
	function M(n, t, r) {
	  if (null == t || "object" != typeof t || Object.isFrozen(t)) return t;
	  var e = t[B];
	  if (!e) return i(t, function (i, u) {
		return g(n, e, t, i, u, r);
	  }, true), t;
	  if (e.A !== n) return t;
	  if (!e.M) return A(n, e.u, true), e.u;
	  if (!e.R) {
		e.R = true, e.A.m--;
		var u = 4 === e.t || 5 === e.t ? e.i = p(e.k, true) : e.i;
		i(u, function (t, i) {
		  return g(n, e, u, t, i, r);
		}), A(n, u, false), r && n.o && _("Patches").F(e, r, n.o, n.v);
	  }
	  return e.i;
	}
	function g(n, t, i, c, v, s) {
	  if (!!v && !!v[B]) {
		var p = M(n, v, s && t && 3 !== t.t && !o(t.D, c) ? s.concat(c) : void 0);
		if (l = c, d = p, 2 === (_ = u(h = i)) ? h.set(l, d) : 3 === _ ? (h.delete(l), h.add(d)) : h[l] = d, !(!!p && !!p[B])) return;
		n._ = false;
	  }
	  var h, l, d, _;
	  if ((!t || !a(v, f(t.u, c))) && e(v)) {
		if (!n.l.J && n.m < 1) return;
		M(n, v), t && t.A.h || A(n, v);
	  }
	}
	function A(n, t, r) {
	  void 0 === r && (r = false), n.l.J && n._ && h(t, r);
	}
	function x(n, t) {
	  var r = n[B], e = Reflect.getOwnPropertyDescriptor(r ? r.i || r.u : n, t);
	  return e && e.value;
	}
	function z(n) {
	  if (!n.M) {
		if (n.M = true, 0 === n.t || 1 === n.t) {
		  var t = n.i = p(n.u);
		  i(n.p, function (n, r) {
			t[n] = r;
		  }), n.p = void 0;
		}
		n.h && z(n.h);
	  }
	}
	function E(n) {
	  n.i || (n.i = p(n.u));
	}
	function R(n, t, r) {
	  var e = C && t instanceof Map ? _("MapSet").K(t, r) : I && t instanceof Set ? _("MapSet").N(t, r) : n.S ? function (n, t) {
		var r = Array.isArray(n), e = {t: r ? 1 : 0, A: t ? t.A : N, M: false, R: false, D: {}, h: t, u: n, k: null, p: {}, i: null, j: null, $: false}, i = e, u = Q;
		r && (i = [e], u = T);
		var o = Proxy.revocable(i, u), f = o.revoke, a = o.proxy;
		return e.k = a, e.j = f, a;
	  }(t, r) : _("ES5").C(t, r);
	  return (r ? r.A : N).p.push(e), e;
	}
	function k(n, t) {
	  n.S ? z(t) : _("ES5").I(t);
	}
	function F() {
	  function n(n, t) {
		var r = n[B];
		if (r && !r.W) {
		  r.W = true;
		  var e = n[t];
		  return r.W = false, e;
		}
		return n[t];
	  }
	  function u(n) {
		n.M || (n.M = true, n.h && u(n.h));
	  }
	  function f(n) {
		n.i || (n.i = C && n.u instanceof Map);
	  }
	  function c(n) {
		var t = n && n[B];
		if (t) {
		  t.W = true;
		  var r = p(t.k, true);
		  return t.W = false, r;
		}
		return p(n);
	  }
	  function v(n) {
		for (var t = n.length - 1; t >= 0; t--) {
		  var r = n[t][B];
		  if (!r.M) switch (r.t) {
			case 5:
			  l(r) && u(r);
			  break;
			case 4:
			  h(r) && u(r);
		  }
		}
	  }
	  function h(n) {
		for (var t = n.u, r = n.k, e = Object.keys(r), i = e.length - 1; i >= 0; i--) {
		  var u = e[i], f = t[u];
		  if (void 0 === f && !o(t, u)) return true;
		  var c = r[u], v = c && c[B];
		  if (v ? v.u !== f : !a(c, f)) return true;
		}
		return e.length !== Object.keys(t).length;
	  }
	  function l(n) {
		var t = n.k;
		if (t.length !== n.u.length) return true;
		var r = Object.getOwnPropertyDescriptor(t, t.length - 1);
		return !(!r || r.get);
	  }
	  function d(n) {
		n.O && t(3, JSON.stringify(n.i || n.u));
	  }
	  var _ = {};
	  y("ES5", {C: function (t, r) {
		var o = Array.isArray(t), v = C && t instanceof Map;
		i(v, function (r) {
		  !function (t, r, i) {
			var o = _[r];
			o ? o.enumerable = i : _[r] = o = {enumerable: i, get: function () {
			  return function (t, r) {
				null == t || "object" != typeof t || Object.isFrozen(t);
				var i = n(t.i || t.u, r);
				return t.W ? i : i === n(t.u, r) && e(i) ? (f(t), t.i[r] = R(t.A.l, i, t)) : i;
			  }(this[B], r);
			}, set: function (t) {
			  !function (t, r, e) {
				if (null == t || "object" != typeof t || Object.isFrozen(t), t.D[r] = true, !t.M) {
				  if (a(e, n(t.i || t.u, r))) return;
				  u(t), f(t);
				}
				t.i[r] = e;
			  }(this[B], r, t);
			}}, Object.defineProperty(t, r, o);
		  }(v, r, o || function (n, t) {
			var r = Object.getOwnPropertyDescriptor(n, t);
			return !(!r || !r.enumerable);
		  }(t, r));
		});
		var p = {t: o ? 5 : 4, A: r ? r.A : N, M: false, W: false, R: false, D: {}, h: r, u: t, k: v, i: null, O: false, $: false};
		return Object.defineProperty(v, B, {value: p, writable: true}), v;
	  }, I: u, P: function (n, t, e) {
		n.p.forEach(function (n) {
		  n[B].W = true;
		}), e ? !!t && !!t[B] && t[B].A === n && (I && n.p instanceof Set) : (n.o && function n(t) {
		  if (t && "object" == typeof t) {
			var r = t[B];
			if (r) {
			  var e = r.u, f = r.k, a = r.D, c = r.t;
			  if (4 === c) i(f, function (t) {
				t !== B && (void 0 !== e[t] || o(e, t) ? a[t] || n(f[t]) : (a[t] = true, u(r)));
			  }), i(e, function (n) {
				void 0 !== f[n] || o(f, n) || (a[n] = false, u(r));
			  }); else if (5 === c) {
				if (l(r) && (u(r), a.length = true), f.length < e.length) for (var v = f.length; v < e.length; v++) a[v] = false; else for (var s = e.length; s < f.length; s++) a[s] = true;
				for (var p = Math.min(f.length, e.length), h = 0; h < p; h++) void 0 === a[h] && n(f[h]);
			  }
			}
		  }
		}(n.p[0]), I && n.p instanceof Set);
	  }});
	}
	function D() {
	  function n(t) {
		if (!t || "object" != typeof t) return t;
		if (Array.isArray(t)) return t.map(n);
		if (C && t instanceof Map) return new Map(Array.from(t.entries()).map(function (t) {
		  return [t[0], n(t[1])];
		}));
		if (I && t instanceof Set) return new Set(Array.from(t).map(n));
		var r = Object.create(Object.getPrototypeOf(t));
		for (var e in t) r[e] = n(t[e]);
		return r;
	  }
	  function e(t) {
		return !!t && !!t[B] ? n(t) : t;
	  }
	  var a = "add";
	  y("Patches", {X: function (r, e) {
		return e.forEach(function (e) {
		  for (var i = e.path, o = e.op, v = 0; v < i.length - 1; v++) "object" != typeof (c = f(c, i[v])) && t(15, i.join("/"));
		  var s = u(c), p = n(e.value), h = i[i.length - 1];
		  switch (o) {
			case "replace":
			  switch (s) {
				case 2:
				  return c.set(h, p);
				case 3:
				  t(16);
				default:
				  return c[h] = p;
			  }
			case a:
			  switch (s) {
				case 1:
				  return c.splice(h, 0, p);
				case 2:
				  return c.set(h, p);
				case 3:
				  return c.add(p);
				default:
				  return c[h] = p;
			  }
			case "remove":
			  switch (s) {
				case 1:
				  return c.splice(h, 1);
				case 2:
				  return c.delete(h);
				case 3:
				  return c.delete(e.value);
				default:
				  return delete c[h];
			  }
			default:
			  t(17, o);
		  }
		}), r;
	  }, F: function (n, t, r, u) {
		switch (n.t) {
		  case 0:
		  case 4:
		  case 2:
			return function (n, t, r, u) {
			  var c = n.u, v = n.i;
			  i(n.D, function (n, i) {
				var s = f(c, n), p = f(v, n), h = i ? o(c, n) ? "replace" : a : "remove";
				if (s !== p || "replace" !== h) {
				  var l = t.concat(n);
				  r.push("remove" === h ? {op: h, path: l} : {op: h, path: l, value: p}), u.push(h === a ? {op: "remove", path: l} : "remove" === h ? {op: a, path: l, value: e(s)} : {op: "replace", path: l, value: e(s)});
				}
			  });
			}(n, t, r, u);
		  case 5:
		  case 1:
			return function (n, t, r, i) {
			  var u = n.u, o = n.D, f = n.i;
			  if (f.length < u.length) {
				var c = [f, u];
				u = c[0], f = c[1];
				var v = [i, r];
				r = v[0], i = v[1];
			  }
			  for (var s = f.length - u.length, p = 0; u[p] === f[p] && p < u.length;) ++p;
			  for (var h = u.length; h > p && u[h - 1] === f[h + s - 1];) --h;
			  for (var l = p; l < h; ++l) if (o[l] && f[l] !== u[l]) {
				var d = t.concat([l]);
				r.push({op: "replace", path: d, value: e(f[l])}), i.push({op: "replace", path: d, value: e(u[l])});
			  }
			  for (var _ = r.length, y = h + s - 1; y >= h; --y) {
				var b = t.concat([y]);
				r[_ + y - h] = {op: a, path: b, value: e(f[y])}, i.push({op: "remove", path: b});
			  }
			}(n, t, r, u);
		  case 3:
			return function (n, t, r, e) {
			  var i = n.u, u = n.i, o = 0;
			  i.forEach(function (n) {
				if (!u.has(n)) {
				  var i = t.concat([o]);
				  r.push({op: "remove", path: i, value: n}), e.unshift({op: a, path: i, value: n});
				}
				o++;
			  }), o = 0, u.forEach(function (n) {
				if (!i.has(n)) {
				  var u = t.concat([o]);
				  r.push({op: a, path: u, value: n}), e.unshift({op: "remove", path: u, value: n});
				}
				o++;
			  });
			}(n, t, r, u);
		}
	  }, g: function (n, t, r, e) {
		r.push({op: "replace", path: [], value: t}), e.push({op: "replace", path: [], value: n.u});
	  }});
	}
	function J() {
	  function n(n, t) {
		function r() {
		  this.constructor = n;
		}
		o(n, t), n.prototype = (r.prototype = t.prototype, new r);
	  }
	  function r(n) {
		n.i || (n.D = new Map, n.i = new Map(n.u));
	  }
	  function i(n) {
		n.i || (n.i = new Set, n.u.forEach(function (t) {
		  if (e(t)) {
			var r = R(n.A.l, t, n);
			n.p.set(t, r), n.i.add(r);
		  } else n.i.add(t);
		}));
	  }
	  function u(n) {
		n.O && t(3, JSON.stringify(n.i || n.u));
	  }
	  var o = function (n, t) {
		return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (n, t) {
		  n.__proto__ = t;
		} || function (n, t) {
		  for (var r in t) t.hasOwnProperty(r) && (n[r] = t[r]);
		})(n, t);
	  }, f = function () {
		n(t, Map);
		var i = t.prototype;
		return Object.defineProperty(i, "size", {get: function () {
		  return (this[B].i || this[B].u).size;
		}}), i.has = function (n) {
		  return (this[B].i || this[B].u).has(n);
		}, i.set = function (n, t) {
		  var e = this[B];
		  return u(e), (e.i || e.u).get(n) !== t && (!!e && !!e[B], k(e.A.l, e), e.D.set(n, true), e.i.set(n, t), e.D.set(n, true)), this;
		}, i.delete = function (n) {
		  if (!this.has(n)) return false;
		  var t = this[B];
		  return u(t), !!t && !!t[B], k(t.A.l, t), t.D.set(n, false), t.i.delete(n), true;
		}, i.clear = function () {
		  var n = this[B];
		  return u(n), !!n && !!n[B], k(n.A.l, n), n.D = new Map, n.i.clear();
		}, i.forEach = function (n, t) {
		  var r = this;
		  (this[B].i || this[B].u).forEach(function (e, i) {
			n.call(t, r.get(i), i, r);
		  });
		}, i.get = function (n) {
		  var t = this[B];
		  u(t);
		  var i = (t.i || t.u).get(n);
		  if (t.R || !e(i)) return i;
		  if (i !== t.u.get(n)) return i;
		  var o = R(t.A.l, i, t);
		  return !!t && !!t[B], t.i.set(n, o), o;
		}, i.keys = function () {
		  return (this[B].i || this[B].u).keys();
		}, i.values = function () {
		  var n, t = this, r = this.keys();
		  return (n = {})[G] = function () {
			return t.values();
		  }, n.next = function () {
			var n = r.next();
			return n.done ? n : {done: false, value: t.get(n.value)};
		  }, n;
		}, i.entries = function () {
		  var n, t = this, r = this.keys();
		  return (n = {})[G] = function () {
			return t.entries();
		  }, n.next = function () {
			var n = r.next();
			if (n.done) return n;
			var e = t.get(n.value);
			return {done: false, value: [n.value, e]};
		  }, n;
		}, i[G] = function () {
		  return this.entries();
		}, t;
	  }(), a = function () {
		n(t, Set);
		var r = t.prototype;
		return Object.defineProperty(r, "size", {get: function () {
		  return (this[B].i || this[B].u).size;
		}}), r.has = function (n) {
		  var t = this[B];
		  return u(t), t.i ? !!t.i.has(n) || !(!t.p.has(n) || !t.i.has(t.p.get(n))) : t.u.has(n);
		}, r.add = function (n) {
		  var t = this[B];
		  return u(t), this.has(n) || (i(t), k(t.A.l, t), t.i.add(n)), this;
		}, r.delete = function (n) {
		  if (!this.has(n)) return false;
		  var t = this[B];
		  return u(t), i(t), k(t.A.l, t), t.i.delete(n) || !!t.p.has(n) && t.i.delete(t.p.get(n));
		}, r.clear = function () {
		  var n = this[B];
		  return u(n), i(n), k(n.A.l, n), n.i.clear();
		}, r.values = function () {
		  var n = this[B];
		  return u(n), i(n), n.i.values();
		}, r.entries = function () {
		  var n = this[B];
		  return u(n), i(n), n.i.entries();
		}, r.keys = function () {
		  return this.values();
		}, r[G] = function () {
		  return this.values();
		}, r.forEach = function (n, t) {
		  for (var r = this.values(), e = r.next(); !e.done;) n.call(t, e.value, e.value, this), e = r.next();
		}, t;
	  }();
	  y("MapSet", {K: function (n, t) {
		return new f(n, t);
	  }, N: function (n, t) {
		return new a(n, t);
	  }});
	}
	var K, N, $ = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x"), C = "undefined" != typeof Map, I = "undefined" != typeof Set, W = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect, X = $ ? Symbol("immer-nothing") : ((K = {})["immer-nothing"] = true, K), q = $ ? Symbol("immer-draftable") : "__$immer_draftable", B = $ ? Symbol("immer-state") : "__$immer_state", G = "undefined" != typeof Symbol && Symbol.iterator || "@@iterator", H = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function (n) {
	  return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n));
	} : Object.getOwnPropertyNames, L = {}, Q = {get: function (n, t) {
	  if (t === B) return n;
	  var r = n.p;
	  if (!n.M && o(r, t)) return r[t];
	  var i = (n.i || n.u)[t];
	  if (n.R || !e(i)) return i;
	  if (n.M) {
		if (i !== x(n.u, t)) return i;
		r = n.i;
	  }
	  return r[t] = R(n.A.l, i, n);
	}, has: function (n, t) {
	  return t in (n.i || n.u);
	}, ownKeys: function (n) {
	  return Reflect.ownKeys(n.i || n.u);
	}, set: function (n, t, r) {
	  if (!n.M) {
		var e = x(n.u, t);
		if (r ? a(e, r) || r === n.p[t] : a(e, r) && t in n.u) return true;
		E(n), z(n);
	  }
	  return n.D[t] = true, n.i[t] = r, true;
	}, deleteProperty: function (n, t) {
	  return void 0 !== x(n.u, t) || t in n.u ? (n.D[t] = false, E(n), z(n)) : n.D[t] && delete n.D[t], n.i && delete n.i[t], true;
	}, getOwnPropertyDescriptor: function (n, t) {
	  var r = n.i || n.u, e = Reflect.getOwnPropertyDescriptor(r, t);
	  return e && (e.writable = true, e.configurable = 1 !== n.t || "length" !== t), e;
	}, defineProperty: function () {
	  t(11);
	}, getPrototypeOf: function (n) {
	  return Object.getPrototypeOf(n.u);
	}, setPrototypeOf: function () {
	  t(12);
	}}, T = {};
	i(Q, function (n, t) {
	  T[n] = function () {
		return arguments[0] = arguments[0][0], t.apply(this, arguments);
	  };
	}), T.deleteProperty = function (n, t) {
	  return Q.deleteProperty.call(this, n[0], t);
	}, T.set = function (n, t, r) {
	  return Q.set.call(this, n[0], t, r, n[0]);
	};
	var U = function () {
	  function n(n) {
		this.S = W, this.J = false, "boolean" == typeof (null == n ? void 0 : n.useProxies) && this.setUseProxies(n.useProxies), "boolean" == typeof (null == n ? void 0 : n.autoFreeze) && this.setAutoFreeze(n.autoFreeze), this.produce = this.produce.bind(this), this.produceWithPatches = this.produceWithPatches.bind(this);
	  }
	  var i = n.prototype;
	  return i.produce = function (n, r, i) {
		if ("function" == typeof n && "function" != typeof r) {
		  r = n;
		  var o = this;
		  return function (n) {
			var t = this;
			void 0 === n && (n = u);
			for (var e = arguments.length, i = Array(e > 1 ? e - 1 : 0), f = 1; f < e; f++) i[f - 1] = arguments[f];
			return o.produce(n, function (n) {
			  var e;
			  return (e = r).call.apply(e, [t, n].concat(i));
			});
		  };
		}
		var f;
		if ("function" != typeof r && t(6), void 0 !== i && "function" != typeof i && t(7), e(n)) {
		  var a = S(this), c = R(this, n, void 0), v = true;
		  try {
			f = !!c && !!c[B], v = false;
		  } finally {
			v ? j(a) : O(a);
		  }
		  return "undefined" != typeof Promise && f instanceof Promise ? f.then(function (n) {
			return m(a, i), P(n, a);
		  }, function (n) {
			throw j(a), n;
		  }) : (m(a, i), P(f, a));
		}
		if ((f = !!n && !!n[B]) !== X) return void 0 === f && (f = n), this.J && h(f, true), f;
	  }, i.produceWithPatches = function (n, t) {
		var r, e, i = this;
		return "function" == typeof n ? function (t) {
		  for (var r = arguments.length, e = Array(r > 1 ? r - 1 : 0), u = 1; u < r; u++) e[u - 1] = arguments[u];
		  return i.produceWithPatches(t, function (t) {
			return n.apply(void 0, [t].concat(e));
		  });
		} : [this.produce(n, t, function (n, t) {
		  r = n, e = t;
		}), r, e];
	  }, i.createDraft = function (n) {
		e(n) || t(8);
		var r = S(this), i = R(this, n, void 0);
		return i[B].$ = true, O(r), i;
	  }, i.finishDraft = function (n, t) {
		var r = (n && n[B]).A;
		return m(r, t), P(void 0, r);
	  }, i.setAutoFreeze = function (n) {
		this.J = n;
	  }, i.setUseProxies = function (n) {
		W || t(20), this.S = n;
	  }, i.applyPatches = function (n, t) {
		var e;
		for (e = t.length - 1; e >= 0; e--) {
		  var i = t[e];
		  if (0 === i.path.length && "replace" === i.op) {
			n = i.value;
			break;
		  }
		}
		var u = _("Patches").X;
		return !!n && !!n[B] ? u(n, t) : this.produce(n, function (n) {
		  return u(n, t.slice(e + 1));
		});
	  }, n;
	}(), V = new U, Y = V.produce, Z = V.produceWithPatches.bind(V), nn = V.setAutoFreeze.bind(V), tn = V.setUseProxies.bind(V), rn = V.applyPatches.bind(V), en = V.createDraft.bind(V), un = V.finishDraft.bind(V);
	n.Immer = U, n.applyPatches = rn, n.castDraft = function (n) {
	  return n;
	}, n.castImmutable = function (n) {
	  return n;
	}, n.createDraft = en, n.default = Y, n.enableAllPlugins = function () {
	  F(), J(), D();
	}, n.enableES5 = F, n.enableMapSet = J, n.enablePatches = D, n.finishDraft = un, n.immerable = q, n.isDraft = r, n.isDraftable = e, n.nothing = X, n.original = function (n) {
	  if (n && n[B]) return n[B].u;
	}, n.produce = Y, n.produceWithPatches = Z, n.setAutoFreeze = nn, n.setUseProxies = tn, Object.defineProperty(n, "__esModule", {value: true});
  });
  