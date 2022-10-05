(function () {
	"use strict";
	var r;
	function aa(a) {
	  var b = 0;
	  return function () {
		return b < a.length ? {done: false, value: a[b++]} : {done: true};
	  };
	}
	function t(a) {
	  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
	  return b ? b.call(a) : {next: aa(a)};
	}
	function y(a) {
	  if (!(a instanceof Array)) {
		a = t(a);
		for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
		a = c;
	  }
	  return a;
	}
	var ba = "function" == typeof Object.create ? Object.create : function (a) {
	  function b() {}
	  b.prototype = a;
	  return new b;
	}, ca;
	if ("function" == typeof Object.setPrototypeOf) ca = Object.setPrototypeOf; else {
	  var da;
	  a: {
		var ea = {Ld: true}, fa = {};
		try {
		  fa.__proto__ = ea;
		  da = fa.Ld;
		  break a;
		} catch (a) {}
		da = false;
	  }
	  ca = da ? function (a, b) {
		a.__proto__ = b;
		if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
		return a;
	  } : null;
	}
	var ha = ca;
	function z(a, b) {
	  a.prototype = ba(b.prototype);
	  a.prototype.constructor = a;
	  if (ha) ha(a, b); else for (var c in b) if ("prototype" != c) if (Object.defineProperties) {
		var d = Object.getOwnPropertyDescriptor(b, c);
		d && Object.defineProperty(a, c, d);
	  } else a[c] = b[c];
	}
	function ia(a) {
	  a = ["object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, a];
	  for (var b = 0; b < a.length; ++b) {
		var c = a[b];
		if (c && c.Math == Math) return c;
	  }
	  return globalThis;
	}
	var ja = ia(this), ka = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
	  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
	};
	function B(a, b) {
	  if (b) {
		var c = ja;
		a = a.split(".");
		for (var d = 0; d < a.length - 1; d++) {
		  var e = a[d];
		  e in c || (c[e] = {});
		  c = c[e];
		}
		a = a[a.length - 1];
		d = c[a];
		b = b(d);
		b != d && null != b && ka(c, a, {configurable: true, writable: true, value: b});
	  }
	}
	B("Promise", function (a) {
	  function b(g) {
		this.f = 0;
		this.G = void 0;
		this.b = [];
		var h = this.s();
		try {
		  g(h.resolve, h.reject);
		} catch (k) {
		  h.reject(k);
		}
	  }
	  function c() {
		this.b = null;
	  }
	  function d(g) {
		return g instanceof b ? g : new b(function (h) {
		  h(g);
		});
	  }
	  if (a) return a;
	  c.prototype.f = function (g) {
		if (null == this.b) {
		  this.b = [];
		  var h = this;
		  this.s(function () {
			h.G();
		  });
		}
		this.b.push(g);
	  };
	  var e = ja.setTimeout;
	  c.prototype.s = function (g) {
		e(g, 0);
	  };
	  c.prototype.G = function () {
		for (; this.b && this.b.length;) {
		  var g = this.b;
		  this.b = [];
		  for (var h = 0; h < g.length; ++h) {
			var k = g[h];
			g[h] = null;
			try {
			  k();
			} catch (l) {
			  this.m(l);
			}
		  }
		}
		this.b = null;
	  };
	  c.prototype.m = function (g) {
		this.s(function () {
		  throw g;
		});
	  };
	  b.prototype.s = function () {
		function g(l) {
		  return function (m) {
			k || (k = true, l.call(h, m));
		  };
		}
		var h = this, k = false;
		return {resolve: g(this.l), reject: g(this.m)};
	  };
	  b.prototype.l = function (g) {
		if (g === this) this.m(new TypeError("A Promise cannot resolve to itself")); else if (g instanceof b) this.C(g); else {
		  a: switch (typeof g) {
			case "object":
			  var h = null != g;
			  break a;
			case "function":
			  h = true;
			  break a;
			default:
			  h = false;
		  }
		  h ? this.h(g) : this.O(g);
		}
	  };
	  b.prototype.h = function (g) {
		var h = void 0;
		try {
		  h = g.then;
		} catch (k) {
		  this.m(k);
		  return;
		}
		"function" == typeof h ? this.ma(h, g) : this.O(g);
	  };
	  b.prototype.m = function (g) {
		this.g(2, g);
	  };
	  b.prototype.O = function (g) {
		this.g(1, g);
	  };
	  b.prototype.g = function (g, h) {
		if (0 != this.f) throw Error("Cannot settle(" + g + ", " + h + "): Promise already settled in state" + this.f);
		this.f = g;
		this.G = h;
		this.P();
	  };
	  b.prototype.P = function () {
		if (null != this.b) {
		  for (var g = 0; g < this.b.length; ++g) f.f(this.b[g]);
		  this.b = null;
		}
	  };
	  var f = new c;
	  b.prototype.C = function (g) {
		var h = this.s();
		g.Qb(h.resolve, h.reject);
	  };
	  b.prototype.ma = function (g, h) {
		var k = this.s();
		try {
		  g.call(h, k.resolve, k.reject);
		} catch (l) {
		  k.reject(l);
		}
	  };
	  b.prototype.then = function (g, h) {
		function k(p, w) {
		  return "function" == typeof p ? function (v) {
			try {
			  l(p(v));
			} catch (C) {
			  m(C);
			}
		  } : w;
		}
		var l, m, q = new b(function (p, w) {
		  l = p;
		  m = w;
		});
		this.Qb(k(g, l), k(h, m));
		return q;
	  };
	  b.prototype.catch = function (g) {
		return this.then(void 0, g);
	  };
	  b.prototype.Qb = function (g, h) {
		function k() {
		  switch (l.f) {
			case 1:
			  g(l.G);
			  break;
			case 2:
			  h(l.G);
			  break;
			default:
			  throw Error("Unexpected state: " + l.f);
		  }
		}
		var l = this;
		null == this.b ? f.f(k) : this.b.push(k);
	  };
	  b.resolve = d;
	  b.reject = function (g) {
		return new b(function (h, k) {
		  k(g);
		});
	  };
	  b.race = function (g) {
		return new b(function (h, k) {
		  for (var l = t(g), m = l.next(); !m.done; m = l.next()) d(m.value).Qb(h, k);
		});
	  };
	  b.all = function (g) {
		var h = t(g), k = h.next();
		return k.done ? d([]) : new b(function (l, m) {
		  function q(v) {
			return function (C) {
			  p[v] = C;
			  w--;
			  0 == w && l(p);
			};
		  }
		  var p = [], w = 0;
		  do p.push(void 0), w++, d(k.value).Qb(q(p.length - 1), m), k = h.next(); while (!k.done);
		});
	  };
	  return b;
	});
	function la() {
	  la = function () {};
	  ja.Symbol || (ja.Symbol = ma);
	}
	function na(a, b) {
	  this.b = a;
	  ka(this, "description", {configurable: true, writable: true, value: b});
	}
	na.prototype.toString = function () {
	  return this.b;
	};
	var ma = function () {
	  function a(c) {
		if (this instanceof a) throw new TypeError("Symbol is not a constructor");
		return new na("jscomp_symbol_" + (c || "") + "_" + b++, c);
	  }
	  var b = 0;
	  return a;
	}();
	function oa() {
	  la();
	  var a = ja.Symbol.iterator;
	  a || (a = ja.Symbol.iterator = ja.Symbol("Symbol.iterator"));
	  "function" != typeof Array.prototype[a] && ka(Array.prototype, a, {configurable: true, writable: true, value: function () {
		return pa(aa(this));
	  }});
	  oa = function () {};
	}
	function pa(a) {
	  oa();
	  a = {next: a};
	  a[ja.Symbol.iterator] = function () {
		return this;
	  };
	  return a;
	}
	function ra() {
	  this.G = false;
	  this.f = null;
	  this.s = void 0;
	  this.b = 1;
	  this.g = 0;
	  this.m = null;
	}
	function sa(a) {
	  if (a.G) throw new TypeError("Generator is already running");
	  a.G = true;
	}
	ra.prototype.O = function (a) {
	  this.s = a;
	};
	function ta(a, b) {
	  a.m = {ue: b, Ne: true};
	  a.b = a.g;
	}
	ra.prototype.return = function (a) {
	  this.m = {return: a};
	  this.b = this.g;
	};
	function va(a, b, c) {
	  a.b = c;
	  return {value: b};
	}
	function wa(a) {
	  this.b = new ra;
	  this.f = a;
	}
	function xa(a, b) {
	  sa(a.b);
	  var c = a.b.f;
	  if (c) return ya(a, "return" in c ? c.return : function (d) {
		return {value: d, done: true};
	  }, b, a.b.return);
	  a.b.return(b);
	  return za(a);
	}
	function ya(a, b, c, d) {
	  try {
		var e = b.call(a.b.f, c);
		if (!(e instanceof Object)) throw new TypeError("Iterator result " + e + " is not an object");
		if (!e.done) return a.b.G = false, e;
		var f = e.value;
	  } catch (g) {
		return a.b.f = null, ta(a.b, g), za(a);
	  }
	  a.b.f = null;
	  d.call(a.b, f);
	  return za(a);
	}
	function za(a) {
	  for (; a.b.b;) try {
		var b = a.f(a.b);
		if (b) return a.b.G = false, {value: b.value, done: false};
	  } catch (c) {
		a.b.s = void 0, ta(a.b, c);
	  }
	  a.b.G = false;
	  if (a.b.m) {
		b = a.b.m;
		a.b.m = null;
		if (b.Ne) throw b.ue;
		return {value: b.return, done: true};
	  }
	  return {value: void 0, done: true};
	}
	function Aa(a) {
	  this.next = function (b) {
		sa(a.b);
		a.b.f ? b = ya(a, a.b.f.next, b, a.b.O) : (a.b.O(b), b = za(a));
		return b;
	  };
	  this.throw = function (b) {
		sa(a.b);
		a.b.f ? b = ya(a, a.b.f.throw, b, a.b.O) : (ta(a.b, b), b = za(a));
		return b;
	  };
	  this.return = function (b) {
		return xa(a, b);
	  };
	  oa();
	  this[Symbol.iterator] = function () {
		return this;
	  };
	}
	function Ba(a) {
	  return new Promise(function (d, e) {
		function f(g) {
		  g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e);
		}
		f(a.next());
	  });
	}
	B("globalThis", function (a) {
	  return a || ja;
	});
	function Da(a, b) {
	  oa();
	  a instanceof String && (a += "");
	  var c = 0, d = {next: function () {
		if (c < a.length) {
		  var e = c++;
		  return {value: b(e, a[e]), done: false};
		}
		d.next = function () {
		  return {done: true, value: void 0};
		};
		return d.next();
	  }};
	  d[Symbol.iterator] = function () {
		return d;
	  };
	  return d;
	}
	B("Array.prototype.keys", function (a) {
	  return a ? a : function () {
		return Da(this, function (b) {
		  return b;
		});
	  };
	});
	B("Object.is", function (a) {
	  return a ? a : function (b, c) {
		return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
	  };
	});
	B("Array.prototype.includes", function (a) {
	  return a ? a : function (b, c) {
		var d = this;
		d instanceof String && (d = String(d));
		var e = d.length;
		c = c || 0;
		for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
		  var f = d[c];
		  if (f === b || Object.is(f, b)) return true;
		}
		return false;
	  };
	});
	function Ea(a, b, c) {
	  if (null == a) throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
	  if (b instanceof RegExp) throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
	  return a + "";
	}
	B("String.prototype.includes", function (a) {
	  return a ? a : function (b, c) {
		return -1 !== Ea(this, b, "includes").indexOf(b, c || 0);
	  };
	});
	B("WeakMap", function (a) {
	  function b(k) {
		this.b = (h += Math.random() + 1).toString();
		if (k) {
		  k = t(k);
		  for (var l; !(l = k.next()).done;) l = l.value, this.set(l[0], l[1]);
		}
	  }
	  function c() {}
	  function d(k) {
		var l = typeof k;
		return "object" === l && null !== k || "function" === l;
	  }
	  function e(k) {
		if (!Object.prototype.hasOwnProperty.call(k, g)) {
		  var l = new c;
		  ka(k, g, {value: l});
		}
	  }
	  function f(k) {
		var l = Object[k];
		l && (Object[k] = function (m) {
		  if (m instanceof c) return m;
		  e(m);
		  return l(m);
		});
	  }
	  if (function () {
		if (!a || !Object.seal) return false;
		try {
		  var k = Object.seal({}), l = Object.seal({}), m = new a([[k, 2], [l, 3]]);
		  if (2 != m.get(k) || 3 != m.get(l)) return false;
		  m.delete(k);
		  m.set(l, 4);
		  return !m.has(k) && 4 == m.get(l);
		} catch (q) {
		  return false;
		}
	  }()) return a;
	  var g = "$jscomp_hidden_" + Math.random();
	  f("freeze");
	  f("preventExtensions");
	  f("seal");
	  var h = 0;
	  b.prototype.set = function (k, l) {
		if (!d(k)) throw Error("Invalid WeakMap key");
		e(k);
		if (!Object.prototype.hasOwnProperty.call(k, g)) throw Error("WeakMap key fail: " + k);
		k[g][this.b] = l;
		return this;
	  };
	  b.prototype.get = function (k) {
		return d(k) && Object.prototype.hasOwnProperty.call(k, g) ? k[g][this.b] : void 0;
	  };
	  b.prototype.has = function (k) {
		return d(k) && Object.prototype.hasOwnProperty.call(k, g) && Object.prototype.hasOwnProperty.call(k[g], this.b);
	  };
	  b.prototype.delete = function (k) {
		return d(k) && Object.prototype.hasOwnProperty.call(k, g) && Object.prototype.hasOwnProperty.call(k[g], this.b) ? delete k[g][this.b] : false;
	  };
	  return b;
	});
	B("Map", function (a) {
	  function b() {
		var h = {};
		return h.Ka = h.next = h.head = h;
	  }
	  function c(h, k) {
		var l = h.b;
		return pa(function () {
		  if (l) {
			for (; l.head != h.b;) l = l.Ka;
			for (; l.next != l.head;) return l = l.next, {done: false, value: k(l)};
			l = null;
		  }
		  return {done: true, value: void 0};
		});
	  }
	  function d(h, k) {
		var l = k && typeof k;
		"object" == l || "function" == l ? f.has(k) ? l = f.get(k) : (l = "" + ++g, f.set(k, l)) : l = "p_" + k;
		var m = h.f[l];
		if (m && Object.prototype.hasOwnProperty.call(h.f, l)) for (h = 0; h < m.length; h++) {
		  var q = m[h];
		  if (k !== k && q.key !== q.key || k === q.key) return {id: l, list: m, index: h, $: q};
		}
		return {id: l, list: m, index: -1, $: void 0};
	  }
	  function e(h) {
		this.f = {};
		this.b = b();
		this.size = 0;
		if (h) {
		  h = t(h);
		  for (var k; !(k = h.next()).done;) k = k.value, this.set(k[0], k[1]);
		}
	  }
	  if (function () {
		if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return false;
		try {
		  var h = Object.seal({x: 4}), k = new a(t([[h, "s"]]));
		  if ("s" != k.get(h) || 1 != k.size || k.get({x: 4}) || k.set({x: 4}, "t") != k || 2 != k.size) return false;
		  var l = k.entries(), m = l.next();
		  if (m.done || m.value[0] != h || "s" != m.value[1]) return false;
		  m = l.next();
		  return m.done || 4 != m.value[0].x || "t" != m.value[1] || !l.next().done ? false : true;
		} catch (q) {
		  return false;
		}
	  }()) return a;
	  oa();
	  var f = new WeakMap;
	  e.prototype.set = function (h, k) {
		h = 0 === h ? 0 : h;
		var l = d(this, h);
		l.list || (l.list = this.f[l.id] = []);
		l.$ ? l.$.value = k : (l.$ = {next: this.b, Ka: this.b.Ka, head: this.b, key: h, value: k}, l.list.push(l.$), this.b.Ka.next = l.$, this.b.Ka = l.$, this.size++);
		return this;
	  };
	  e.prototype.delete = function (h) {
		h = d(this, h);
		return h.$ && h.list ? (h.list.splice(h.index, 1), h.list.length || delete this.f[h.id], h.$.Ka.next = h.$.next, h.$.next.Ka = h.$.Ka, h.$.head = null, this.size--, true) : false;
	  };
	  e.prototype.clear = function () {
		this.f = {};
		this.b = this.b.Ka = b();
		this.size = 0;
	  };
	  e.prototype.has = function (h) {
		return !!d(this, h).$;
	  };
	  e.prototype.get = function (h) {
		return (h = d(this, h).$) && h.value;
	  };
	  e.prototype.entries = function () {
		return c(this, function (h) {
		  return [h.key, h.value];
		});
	  };
	  e.prototype.keys = function () {
		return c(this, function (h) {
		  return h.key;
		});
	  };
	  e.prototype.values = function () {
		return c(this, function (h) {
		  return h.value;
		});
	  };
	  e.prototype.forEach = function (h, k) {
		for (var l = this.entries(), m; !(m = l.next()).done;) m = m.value, h.call(k, m[1], m[0], this);
	  };
	  e.prototype[Symbol.iterator] = e.prototype.entries;
	  var g = 0;
	  return e;
	});
	B("Set", function (a) {
	  function b(c) {
		this.b = new Map;
		if (c) {
		  c = t(c);
		  for (var d; !(d = c.next()).done;) this.add(d.value);
		}
		this.size = this.b.size;
	  }
	  if (function () {
		if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return false;
		try {
		  var c = Object.seal({x: 4}), d = new a(t([c]));
		  if (!d.has(c) || 1 != d.size || d.add(c) != d || 1 != d.size || d.add({x: 4}) != d || 2 != d.size) return false;
		  var e = d.entries(), f = e.next();
		  if (f.done || f.value[0] != c || f.value[1] != c) return false;
		  f = e.next();
		  return f.done || f.value[0] == c || 4 != f.value[0].x || f.value[1] != f.value[0] ? false : e.next().done;
		} catch (g) {
		  return false;
		}
	  }()) return a;
	  oa();
	  b.prototype.add = function (c) {
		c = 0 === c ? 0 : c;
		this.b.set(c, c);
		this.size = this.b.size;
		return this;
	  };
	  b.prototype.delete = function (c) {
		c = this.b.delete(c);
		this.size = this.b.size;
		return c;
	  };
	  b.prototype.clear = function () {
		this.b.clear();
		this.size = 0;
	  };
	  b.prototype.has = function (c) {
		return this.b.has(c);
	  };
	  b.prototype.entries = function () {
		return this.b.entries();
	  };
	  b.prototype.values = function () {
		return this.b.values();
	  };
	  b.prototype.keys = b.prototype.values;
	  b.prototype[Symbol.iterator] = b.prototype.values;
	  b.prototype.forEach = function (c, d) {
		var e = this;
		this.b.forEach(function (f) {
		  return c.call(d, f, f, e);
		});
	  };
	  return b;
	});
	B("String.prototype.repeat", function (a) {
	  return a ? a : function (b) {
		var c = Ea(this, null, "repeat");
		if (0 > b || 1342177279 < b) throw new RangeError("Invalid count value");
		b |= 0;
		for (var d = ""; b;) if (b & 1 && (d += c), b >>>= 1) c += c;
		return d;
	  };
	});
	B("String.prototype.startsWith", function (a) {
	  return a ? a : function (b, c) {
		var d = Ea(this, b, "startsWith"), e = d.length, f = b.length;
		c = Math.max(0, Math.min(c | 0, d.length));
		for (var g = 0; g < f && c < e;) if (d[c++] != b[g++]) return false;
		return g >= f;
	  };
	});
	function Ga(a, b, c) {
	  a instanceof String && (a = String(a));
	  for (var d = a.length, e = 0; e < d; e++) {
		var f = a[e];
		if (b.call(c, f, e, a)) return {ld: e, Cd: f};
	  }
	  return {ld: -1, Cd: void 0};
	}
	B("Array.prototype.findIndex", function (a) {
	  return a ? a : function (b, c) {
		return Ga(this, b, c).ld;
	  };
	});
	B("Array.prototype.find", function (a) {
	  return a ? a : function (b, c) {
		return Ga(this, b, c).Cd;
	  };
	});
	B("Object.entries", function (a) {
	  return a ? a : function (b) {
		var c = [], d;
		for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push([d, b[d]]);
		return c;
	  };
	});
	B("Object.values", function (a) {
	  return a ? a : function (b) {
		var c = [], d;
		for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push(b[d]);
		return c;
	  };
	});
	B("String.prototype.endsWith", function (a) {
	  return a ? a : function (b, c) {
		var d = Ea(this, b, "endsWith");
		void 0 === c && (c = d.length);
		c = Math.max(0, Math.min(c | 0, d.length));
		for (var e = b.length; 0 < e && 0 < c;) if (d[--c] != b[--e]) return false;
		return 0 >= e;
	  };
	});
	B("String.prototype.padStart", function (a) {
	  return a ? a : function (b, c) {
		var d = Ea(this, null, "padStart");
		b -= d.length;
		c = void 0 !== c ? String(c) : " ";
		return (0 < b && c ? c.repeat(Math.ceil(b / c.length)).substring(0, b) : "") + d;
	  };
	});
	var Ha = "function" == typeof Object.assign ? Object.assign : function (a, b) {
	  for (var c = 1; c < arguments.length; c++) {
		var d = arguments[c];
		if (d) for (var e in d) Object.prototype.hasOwnProperty.call(d, e) && (a[e] = d[e]);
	  }
	  return a;
	};
	B("Object.assign", function (a) {
	  return a || Ha;
	});
	function D(a, b, c) {
	  b = void 0 === b ? {} : b;
	  a = [a];
	  c && a.push(c);
	  c = a.slice();
	  for (var d = t(Object.keys(b)), e = d.next(); !e.done; e = d.next()) {
		e = e.value;
		for (var f = b[e], g = t(a), h = g.next(); !h.done; h = g.next()) if (h = h.value, "boolean" == typeof f) f && c.push(h + "_" + e); else if ("string" == typeof f) c.push(f ? h + "_" + e + "_" + f : h + "_" + e); else throw Error("modifier '" + e + "' has invalid type");
	  }
	  return c.join(" ");
	}
	window.__getCssClass = D;
	function Ia(a, b) {
	  for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
	  console.warn.apply(console, [a].concat(y(c)));
	}
	function E(a, b) {
	  for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
	  console.error.apply(console, [a].concat(y(c)));
	}
	function Ja(a, b) {
	  a || E("Assertion failed" + (b ? ": " + b : ""));
	}
	;
	function F(a, b) {
	  Ja(a, b);
	  return a;
	}
	;
	function La(a) {
	  var b = typeof a;
	  return "object" == b && null != a || "function" == b;
	}
	function H(a) {
	  var b = void 0 === b ? "Unhandled value: " + JSON.stringify(a, null, " ") : b;
	  E(b);
	}
	;
	var Oa = 0;
	function Pa(a, b, c, d, e) {
	  this.b = a;
	  this.src = b;
	  this.type = c;
	  this.capture = !!d;
	  this.zb = void 0 === e ? null : e;
	  this.key = ++Oa;
	}
	;
	function Qa(a, b, c, d, e, f) {
	  Pa.call(this, a, c, d, e, f);
	  this.proxy = b;
	  this.f = this.dc = false;
	}
	z(Qa, Pa);
	function Ra(a) {
	  a.f = true;
	  a.b = null;
	  a.proxy = null;
	  a.src = null;
	  a.zb = null;
	}
	;
	function Sa(a, b) {
	  var c = {};
	  if (a) for (var d in a) b.call(void 0, a[d], d, a) && (c[d] = a[d]);
	  return c;
	}
	function Ta(a, b) {
	  for (var c in a) a.hasOwnProperty(c) && b.call(void 0, a[c], c, a);
	}
	function Ua(a, b) {
	  for (var c = {}, d = t(Object.keys(a)), e = d.next(); !e.done; e = d.next()) e = e.value, c[e] = b(a[e]);
	  return c;
	}
	function Va(a, b) {
	  var c = b(a);
	  if (void 0 !== c) return c;
	  if ("object" !== typeof a || null == a) return a;
	  if (Array.isArray(a)) return a.map(function (f) {
		return Va(f, b);
	  });
	  c = {};
	  for (var d = t(Object.keys(a)), e = d.next(); !e.done; e = d.next()) e = e.value, c[e] = Va(a[e], b);
	  return c;
	}
	;
	function Wa(a) {
	  this.src = a;
	  this.b = {};
	  this.f = 0;
	}
	Wa.prototype.add = function (a, b, c, d, e) {
	  var f = a.toString();
	  a = this.b[f];
	  a || (a = this.b[f] = [], this.f++);
	  var g = Xa(a, b, d, e);
	  -1 < g ? (b = a[g], c || (b.dc = false)) : (b = new Qa(b, null, this.src, f, !!d, e), b.dc = c, a.push(b));
	  return b;
	};
	Wa.prototype.remove = function (a, b, c, d) {
	  a = a.toString();
	  if (!(a in this.b)) return false;
	  var e = this.b[a];
	  b = Xa(e, b, c, d);
	  return -1 < b ? (Ra(e[b]), e.splice(b, 1), 0 == e.length && (delete this.b[a], this.f--), true) : false;
	};
	function Xa(a, b, c, d) {
	  for (var e = 0; e < a.length; ++e) {
		var f = a[e];
		if (!f.f && f.b == b && f.capture == !!c && f.zb == d) return e;
	  }
	  return -1;
	}
	;
	var Ya = "ispring_lm_" + (1e6 * Math.random() | 0), Za;
	function $a() {
	  if (!ab.addEventListener || !Object.defineProperty) return false;
	  var a = false, b = Object.defineProperty({}, "passive", {get: function () {
		a = true;
	  }});
	  ab.addEventListener("test", Function.prototype, b);
	  ab.removeEventListener("test", Function.prototype, b);
	  return a;
	}
	function bb(a) {
	  a = a[Ya];
	  return a instanceof Wa ? a : null;
	}
	function cb(a) {
	  if (!a || a.f) return false;
	  var b = a.src, c = a.type, d = a.proxy;
	  b.removeEventListener && b.removeEventListener(c, d, a.capture);
	  if (c = bb(b)) {
		d = a.type;
		if (d in c.b) {
		  var e = c.b[d], f = e.indexOf(a);
		  0 <= f && (e.splice(f, 1), Ra(a), 0 == c.b[d].length && (delete c.b[d], --c.f));
		}
		0 == c.f && (b[Ya] = null);
	  } else Ra(a);
	  return true;
	}
	function db(a) {
	  var b = a.b, c = a.zb, d = a.dc, e = c ? b.bind(c) : b;
	  return d ? function (f) {
		for (var g = [], h = 0; h < arguments.length; ++h) g[h] = arguments[h];
		e.apply(null, y(g));
		cb(a);
	  } : e;
	}
	function eb(a, b, c, d, e) {
	  e = void 0 === e ? null : e;
	  var f = La(d) ? F(d).capture : !!d, g = bb(a);
	  g || (g = new Wa(a), a[Ya] = g);
	  c = g.add(b, c, !(!d || !d.once), f, e);
	  if (c.proxy) return c;
	  e = db(c);
	  c.proxy = e;
	  if (a.addEventListener) void 0 !== Za || (Za = $a()), d = Za ? d : f, void 0 !== d || (d = false), a.addEventListener(b.toString(), e, d); else throw Error("addEventListener is unavailable.");
	  return c;
	}
	;
	function fb() {}
	;
	var gb = 0;
	function hb() {
	  this.sb = this.G = this.s = this.O = null;
	}
	z(hb, fb);
	function ib(a, b) {
	  a.sb = a.sb || [];
	  a.sb.push(b);
	}
	hb.prototype.cd = function () {
	  this.bc();
	  if (this.sb) for (var a = t(this.sb), b = a.next(); !b.done; b = a.next()) b = b.value, b();
	  if (this.G) for (a = t(this.G), b = a.next(); !b.done; b = a.next()) jb(b.value);
	  if (this.O) {
		b = t(this.O);
		for (a = b.next(); !a.done; a = b.next()) cb(a.value);
		this.O = null;
	  }
	  if (this.s) for (b = t(Object.keys(this.s)), a = b.next(); !a.done; a = b.next()) kb(this, a.value);
	};
	function lb(a, b, c, d) {
	  a.O = a.O || [];
	  b = eb(b, c, d, void 0, a);
	  a.O.push(b);
	  return b;
	}
	function mb(a, b) {
	  a = F(a.O);
	  var c = a.indexOf(b);
	  0 <= c && a.splice(c, 1);
	  cb(b);
	}
	function nb(a, b, c) {
	  a.s = a.s || {};
	  b.add(c, a, void 0);
	  var d = ++gb;
	  a.s[d] = {bd: b, xb: c, priority: void 0};
	  return d;
	}
	function kb(a, b) {
	  if (a.s && a.s[b]) {
		var c = a.s[b];
		c.bd.remove(c.xb, a, c.priority);
		delete a.s[b];
	  } else Ia("unknown signal key");
	}
	function ob(a, b) {
	  if (b) {
		if (a.s) {
		  var c = Sa(a.s, function (e) {
			return e.bd.Kd == b;
		  }), d = t(Object.keys(c));
		  for (c = d.next(); !c.done; c = d.next()) kb(a, c.value);
		}
		if (a.O) for (c = a.O.filter(function (e) {
		  return e.src == b;
		}), d = t(c), c = d.next(); !c.done; c = d.next()) mb(a, c.value);
	  }
	}
	function pb(a, b) {
	  a.G = a.G || [];
	  if (!b || a.G.includes(b)) return b;
	  a.G.push(b);
	  return b;
	}
	hb.prototype.Wd = function (a) {
	  for (var b = [], c = 0; c < arguments.length; ++c) b[c] = arguments[c];
	  if (this.G) for (b = t(b), c = b.next(); !c.done; c = b.next()) if (c = c.value) {
		ob(this, c);
		var d = this.G.indexOf(c);
		0 <= d && (this.G.splice(d, 1), jb(c));
	  }
	};
	hb.prototype.bc = function () {};
	function qb(a, b) {
	  return a > b ? 1 : a < b ? -1 : 0;
	}
	function rb(a, b) {
	  if (a.length !== b.length) return false;
	  for (var c = 0; c < a.length; ++c) if (a[c] !== b[c]) return false;
	  return true;
	}
	;
	function sb() {
	  this.f = this.b = this.s = null;
	}
	sb.prototype.push = function (a, b) {
	  if (0 == b) this.f = this.f || []; else if (this.s = this.s || [0], this.b = this.b || {}, !(b in this.b)) {
		this.b[b] = [];
		var c = this.s, d = void 0;
		d = void 0 === d ? qb : d;
		for (var e = 0, f = c.length; e < f;) {
		  var g = e + f >> 1;
		  var h = d(b, c[g]);
		  if (0 < h) e = g + 1; else {
			f = g;
			var k = !h;
		  }
		}
		k = k ? e : ~e;
		0 > k && c.splice(-(k + 1), 0, b);
	  }
	  (b = tb(this, b)) ? b.push(a) : Ia("Priority array values are zero");
	};
	sb.prototype.remove = function (a, b) {
	  (b = tb(this, b)) && b && (a = b.indexOf(a), 0 <= a && b.splice(a, 1));
	};
	function ub(a, b) {
	  if (0 == b) return a.f || [];
	  if (!a.b) return Ia("Priority array values are zero"), [];
	  if (!(b in a.b)) return [];
	  a = tb(a, b);
	  return a ? a : (Ia("Priority array values are zero"), []);
	}
	function vb(a) {
	  if (!a.b) return a.f ? a.f.slice() : [];
	  for (var b = [], c = F(a.s), d = 0; d < c.length; ++d) {
		var e = tb(a, c[d]);
		e && b.push.apply(b, y(e));
	  }
	  return b;
	}
	function tb(a, b) {
	  return 0 == b ? a.f : F(a.b)[b];
	}
	;
	function wb(a) {
	  a = void 0 === a ? null : a;
	  hb.call(this);
	  this.b = null;
	  this.Kd = a;
	}
	z(wb, hb);
	wb.prototype.add = function (a, b, c) {
	  c = void 0 === c ? 0 : c;
	  this.b = this.b || new sb;
	  this.b.push({xb: a, context: b}, c);
	};
	function xb(a, b) {
	  function c(e) {
		b.call(void 0, e);
		a.remove(c, void 0, d);
	  }
	  var d = void 0 === d ? 0 : d;
	  a.add(c, void 0, d);
	}
	wb.prototype.remove = function (a, b, c) {
	  c = void 0 === c ? 0 : c;
	  if (this.b) for (var d = ub(this.b, c), e = d.length, f = 0; f < e; ++f) {
		var g = d[f];
		if (g.xb == a && g.context == b) {
		  a = f;
		  (c = tb(this.b, c)) && c.splice(a, 1);
		  break;
		}
	  } else Ia("Signal has no handlers!");
	};
	wb.prototype.has = function (a, b, c) {
	  if (!this.b) return false;
	  c = ub(this.b, void 0 === c ? 0 : c);
	  for (var d = c.length, e = 0; e < d; ++e) {
		var f = c[e];
		if (f.xb == a && f.context == b) return true;
	  }
	  return false;
	};
	wb.prototype.dispatch = function (a) {
	  if (this.b) for (var b = vb(this.b), c = b.length, d = 0; d < c; ++d) {
		var e = b[d];
		if (-1 != vb(this.b).indexOf(e)) try {
		  e.xb.apply(e.context, [a]);
		} catch (f) {
		  yb(f);
		}
	  }
	};
	function zb(a) {
	  return function (b) {
		return a.dispatch(b);
	  };
	}
	;
	var ab = Function("return this")();
	function yb(a) {
	  var b = a.stack || a.toString();
	  0 > String(b).indexOf(a.message) && E(a.message);
	  E(b);
	}
	Object.getPrototypeOf({});
	function jb(a) {
	  a && (F(!a.disposed), "function" == typeof a.cd && a.cd(), a.disposed = true);
	}
	ab.onerror = function (a) {
	  for (var b = [], c = 0; c < arguments.length; ++c) b[c] = arguments[c];
	  c = t(b);
	  b = c.next().value;
	  c.next();
	  c.next();
	  c.next();
	  (c = c.next().value) ? yb(c) : E(b);
	  return true;
	};
	;
	function Bb(a) {
	  var b = void 0 === b ? {} : b;
	  return new Promise(function (c, d) {
		function e() {
		  var h = [], k = [], l = {}, m;
		  f.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function (q, p, w) {
			h.push(p = p.toLowerCase());
			k.push([p, w]);
			m = l[p];
			l[p] = m ? m + "," + w : w;
			return "";
		  });
		  return {ok: 2 == (f.status / 100 | 0), status: f.status, statusText: f.statusText, url: f.responseURL, clone: e, text: function () {
			return Promise.resolve(f.responseText);
		  }, json: function () {
			return Promise.resolve(f.responseText).then(function (q) {
			  return JSON.parse(q);
			});
		  }, blob: function () {
			return Promise.resolve(new Blob([f.response]));
		  }, headers: {keys: function () {
			return h;
		  }, entries: function () {
			return k;
		  }, get: function (q) {
			return l[q.toLowerCase()];
		  }, has: function (q) {
			return q.toLowerCase() in l;
		  }}};
		}
		var f = new XMLHttpRequest;
		F(b);
		f.open(b.method || "get", a, true);
		for (var g in b.headers) b.headers.hasOwnProperty(g) && f.setRequestHeader(g, b.headers[g]);
		f.withCredentials = "include" == b.credentials;
		f.onload = function () {
		  c(e());
		};
		f.onerror = d;
		f.send(b.body);
	  });
	}
	;
	function Cb(a) {
	  var b;
	  return Ba(new Aa(new wa(function (c) {
		if (1 == c.b) return va(c, Bb(a), 2);
		b = c.s;
		return b.ok ? c.return(b.json()) : c.return(null);
	  })));
	}
	function Db() {
	  return new Promise(function (a, b) {
		var c = new XMLHttpRequest;
		c.open("GET", "data-1.bin", true);
		c.responseType = "arraybuffer";
		c.onload = function () {
		  a(new Blob([c.response]));
		};
		c.onerror = b;
		c.send(null);
	  });
	}
	;
	function Eb(a) {
	  var b = Fb(a) + ", ";
	  a: switch (a) {
		case "Lato":
		case "Roboto":
		case "Open Sans":
		case "Exo 2":
		case "Montserrat":
		  a = "sans-serif";
		  break a;
		case "Merriweather":
		case "Roboto Slab":
		case "PT Serif":
		  a = "serif";
		  break a;
		default:
		  a = "";
	  }
	  return b + a;
	}
	function Fb(a) {
	  switch (a) {
		case "Lato":
		  return "Lato";
		case "Roboto":
		  return "roboto";
		case "Open Sans":
		  return "open-sans";
		case "Merriweather":
		  return "merriweather";
		case "Roboto Slab":
		  return "roboto-slab";
		case "Exo 2":
		  return "exo-2";
		case "Montserrat":
		  return "montserrat";
		case "PT Serif":
		  return "pt-serif";
		default:
		  return "";
	  }
	}
	;
	;
	var Ib = {include: 'link[href*="bundle"],link[href*="legacy_components_customization"]', silent: true}, Jb = {};
	function Kb(a, b) {
	  if (a instanceof HTMLElement || a instanceof SVGElement) window.navigator.userAgent.includes("MSIE") || window.navigator.userAgent.includes("Trident") ? (Object.keys(b).forEach(function (c) {
		var d = b[c];
		d = null === d ? "" : d.toString();
		Jb[c] = d;
	  }), cssVars(Object.assign({}, Ib, {variables: Jb}))) : Object.keys(b).forEach(function (c) {
		var d = b[c];
		null != d && (d = d.toString());
		a.style.setProperty(c, d);
	  });
	}
	function Lb(a) {
	  a = (a = window.getComputedStyle(a)) && a.transform ? a.transform : "";
	  "none" == a && (a = "");
	  return a;
	}
	function Mb(a) {
	  for (var b = [], c = 0; c < arguments.length; ++c) b[c] = arguments[c];
	  return b.filter(function (d) {
		return d;
	  }).join(" ");
	}
	;
	function Nb() {
	  hb.apply(this, arguments);
	}
	z(Nb, hb);
	function Ob(a, b) {
	  var c = new wb(a);
	  pb(a, c);
	  if (b) if (Array.isArray(b)) {
		b = t(b);
		for (var d = b.next(); !d.done; d = b.next()) nb(a, d.value, function (e) {
		  return c.dispatch(e);
		});
	  } else nb(a, b, function (e) {
		return c.dispatch(e);
	  });
	  return c;
	}
	;
	var Pb = "Learn.Reports.SendReportOnSchedulePopup.Schedule.Month.Day Learn.EditContent.CompletionTab.ReenrollmentAfterCourseCompletion.Part1 Learn.EditContent.CompletionTab.ReenrollmentBeforeCertExpires.Part1 Learn.EditContent.CompletionTab.ReenrollmentAfterCourseCompletion.Part2 Studio.SideBar.StorageBar.Progress.Part1 Studio.SideBar.StorageBar.Progress.Part2".split(" ");
	function Qb(a) {
	  Nb.call(this);
	  this.b = a;
	}
	z(Qb, Nb);
	Qb.prototype.f = function (a) {
	  return "{" + a.toLowerCase() + "}";
	};
	var Rb;
	function I(a, b) {
	  var c = "string" == typeof a ? a : a.value;
	  if (!Rb) return Ia("i18n is not initialized"), c;
	  a = Rb;
	  if (a.b.hasOwnProperty(c)) {
		c = F(a.b[c] || Pb.includes(c));
		"string" !== typeof c && (c = "");
		if (b) {
		  a = a.f;
		  for (var d = t(Object.keys(b)), e = d.next(); !e.done; e = d.next()) {
			var f = e.value;
			e = b[f];
			f = a(f);
			var g = void 0;
			g = void 0 === g ? "g" : g;
			c = c.replace(new RegExp(f.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"), g), e);
		  }
		}
		b = c;
	  } else Ia("unknown message id: " + c), b = c;
	  return b;
	}
	;
	function Sb(a) {
	  var b = parseInt(a.substr(1, 2), 16), c = parseInt(a.substr(3, 2), 16);
	  a = parseInt(a.substr(5, 2), 16);
	  return [b, c, a];
	}
	function Tb(a) {
	  var b = Sb(a);
	  a = b[0] / 255;
	  var c = b[1] / 255;
	  b = b[2] / 255;
	  var d = Math.max(a, c, b), e = Math.min(a, c, b), f = 0, g = 0, h = 0.5 * (d + e);
	  d != e && (d == a ? f = 60 * (c - b) / (d - e) : d == c ? f = 60 * (b - a) / (d - e) + 120 : d == b && (f = 60 * (a - c) / (d - e) + 240), g = 0 < h && 0.5 >= h ? (d - e) / (2 * h) : (d - e) / (2 - 2 * h));
	  return [Math.round(f + 360) % 360, g, h];
	}
	;
	var Ub = {ta: "#2972E0", link: "#2972E0", xd: "#FFFFFF", yd: "#42484E"};
	function Vb(a, b) {
	  var c = t(Sb(a));
	  a = c.next().value;
	  var d = c.next().value;
	  c = c.next().value;
	  return "rgba(" + a + ", " + d + ", " + c + ", " + b + ")";
	}
	function Wb(a) {
	  var b = t(Tb(a));
	  a = b.next().value;
	  var c = b.next().value;
	  b = b.next().value;
	  return "hsl(" + a + ", " + 100 * c + "%, " + 100 * (b + -0.08) + "%)";
	}
	;
	var Xb = {Ce: "Roboto", le: "Roboto"};
	var K = null;
	function Yb(a, b) {
	  var c = t(Sb(a));
	  a = c.next().value;
	  var d = c.next().value;
	  c = c.next().value;
	  return "rgba(" + a + ", " + d + ", " + c + ", " + b + ")";
	}
	function Zb(a, b) {
	  var c = t(Tb(a)), d = c.next().value;
	  a = c.next().value;
	  c = c.next().value;
	  d = d.toFixed(2);
	  a = (100 * a + -1).toFixed(2);
	  b = (100 * c + b).toFixed(2);
	  return "hsl(" + d + ", " + a + "%, " + b + "%)";
	}
	;
	function $b(a) {
	  function b() {
		c && (clearTimeout(c.id), c = void 0);
	  }
	  var c;
	  return {Sg: function () {
		return void 0 !== c;
	  }, cancel: b, flush: function () {
		if (c) {
		  var d = c.zb;
		  b();
		  d();
		}
	  }, call: function (d) {
		function e() {
		  b();
		  a.apply(null, y(f));
		}
		for (var f = [], g = 0; g < arguments.length; ++g) f[g] = arguments[g];
		b();
		c = {id: setTimeout(e, 100), zb: e};
	  }, Eg: function (d) {
		for (var e = [], f = 0; f < arguments.length; ++f) e[f] = arguments[f];
		b();
		a.apply(null, y(e));
	  }};
	}
	;
	;
	immer.enableAllPlugins();
	var bc = immer.produce;
	for (var cc = Array(64), dc = Array(123), ec = 0; 64 > ec;) dc[cc[ec] = 26 > ec ? ec + 65 : 52 > ec ? ec + 71 : 62 > ec ? ec - 4 : ec - 59 | 43] = ec++;
	function fc(a) {
	  this.Type = a;
	}
	;
	function gc(a, b) {
	  var c = Uint8Array, d;
	  if (d = a.length) {
		for (var e = 0; 1 < --d % 4 && "=" === a.charAt(d);) ++e;
		d = Math.ceil(3 * a.length) / 4 - e;
	  } else d = 0;
	  c = new c(d);
	  var f = void 0 === f ? 0 : f;
	  d = 0;
	  for (e = 0; e < a.length;) {
		var g = a.charCodeAt(e++);
		if (61 === g && 1 < d) break;
		if (void 0 === (g = dc[g])) throw Error("invalid encoding");
		switch (d) {
		  case 0:
			var h = g;
			d = 1;
			break;
		  case 1:
			c[f++] = h << 2 | (g & 48) >> 4;
			h = g;
			d = 2;
			break;
		  case 2:
			c[f++] = (h & 15) << 4 | (g & 60) >> 2;
			h = g;
			d = 3;
			break;
		  case 3:
			c[f++] = (h & 3) << 6 | g, d = 0;
		}
	  }
	  if (1 === d) throw Error("invalid encoding");
	  a = new Uint32Array(c.buffer.slice(0, Uint32Array.BYTES_PER_ELEMENT))[0];
	  f = new Uint8Array(c.buffer.slice(Uint32Array.BYTES_PER_ELEMENT));
	  b = b(a).Type;
	  a = b.decode(f);
	  return b.toObject(a);
	}
	;
	function hc(a, b) {
	  var c = {order: [], A: {}};
	  a = t(a);
	  for (var d = a.next(); !d.done; d = a.next()) {
		d = d.value;
		var e = b(d);
		c.order.push(e);
		c.A[e] = d;
	  }
	  return c;
	}
	function ic(a) {
	  return 0 >= a.order.length ? null : a.A[a.order[0]];
	}
	function jc(a, b) {
	  a.order.forEach(function (c) {
		b(a.A[c]);
	  });
	}
	;
	function kc(a, b) {
	  var c = a.findIndex(function (e) {
		return e.name === b.name;
	  }), d = a.slice();
	  switch (b.name) {
		case "bold":
		case "italic":
		case "underline":
		case "strikethrough":
		  if (0 <= c) return a;
		  d.push(b);
		  break;
		case "fontSize":
		case "fontColor":
		case "textHighlightColor":
		case "textHighlightOpacity":
		  0 <= c ? d[c] = b : d.push(b);
		  break;
		default:
		  throw H(b), Error("Unknown text style type: " + b);
	  }
	  return d;
	}
	function lc(a) {
	  return y(a).concat().sort(function (b, c) {
		return qb(b.name, c.name);
	  }).map(function (b) {
		return JSON.stringify(b);
	  }).join("$");
	}
	function mc(a, b) {
	  return 0 <= a.findIndex(function (c) {
		return c.name === b;
	  });
	}
	;
	function nc(a) {
	  a = void 0 === a ? {} : a;
	  return {url: void 0 === a.url ? null : a.url, style: void 0 === a.style ? [] : a.style};
	}
	function oc(a, b) {
	  var c;
	  if (c = a.url === b.url) b = b.style, c = lc(a.style) === lc(b);
	  return c;
	}
	;
	var pc = {}, qc = Math.pow(2, 24);
	function rc() {
	  for (var a; void 0 === a || pc.hasOwnProperty(a) || !isNaN(+a);) a = Math.floor(Math.random() * qc).toString(32);
	  pc[a] = true;
	  return a;
	}
	var sc = new WeakMap;
	function tc(a, b) {
	  jc(a, b);
	}
	;
	function uc(a) {
	  return a && "p" === a.type ? a : null;
	}
	;
	var vc = ["ul", "ol"];
	y(["header", "subheader"]).concat(y(["blockquote", "pullquote"]), y(vc), ["text"]);
	function wc(a) {
	  a = void 0 === a ? {} : a;
	  var b = a.B || [];
	  "string" === typeof b && (b = xc(b));
	  return "ol" == a.N ? {type: "p", key: a.key || rc(), N: a.N, textAlign: a.textAlign || "left", B: b, bb: a.bb || false} : {type: "p", key: a.key || rc(), N: a.N || "text", textAlign: a.textAlign || "left", B: b};
	}
	function xc(a) {
	  var b = nc();
	  return y(a).concat().map(function (c) {
		return {text: c, sa: b};
	  });
	}
	function yc(a) {
	  a = uc(a);
	  return !!a && 0 == a.B.length;
	}
	function zc(a) {
	  var b;
	  b || (b = function (h) {
		return h;
	  });
	  a = a.B;
	  if (0 == a.length) return [];
	  for (var c = [{text: a[0].text, ga: b(a[0].sa), Wb: false}], d = 1; d < a.length; ++d) {
		var e = a[d], f = b(e.sa), g = c.length - 1;
		oc(f, c[g].ga) ? c[g].text += e.text : c.push({text: e.text, ga: f, Wb: false});
	  }
	  c[c.length - 1].Wb = true;
	  return c;
	}
	;
	function Ac(a) {
	  var b = [];
	  a = t(a);
	  for (var c = a.next(); !c.done; c = a.next()) b.push({text: c.value, sa: nc()});
	  return b;
	}
	;
	function Bc(a) {
	  a = void 0 === a ? {} : a;
	  return {key: void 0 === a.key ? rc() : a.key, L: void 0 === a.L ? false : a.L, content: Cc([wc({B: void 0 === a.text ? [] : a.text})])};
	}
	;
	function Dc(a) {
	  a = void 0 === a ? {} : a;
	  return {ka: void 0 === a.ka ? [Bc({L: true, text: Ac(I("Roll.Exercise.Question.Content.PossibleAnswer") + " 1")}), Bc({text: Ac(I("Roll.Exercise.Question.Content.PossibleAnswer") + " 2")}), Bc({text: Ac(I("Roll.Exercise.Question.Content.PossibleAnswer") + " 3")})] : a.ka};
	}
	;
	function Ec(a) {
	  a = void 0 === a ? {} : a;
	  return {key: void 0 === a.key ? rc() : a.key, text: void 0 === a.text ? "" : a.text};
	}
	;
	function Fc(a) {
	  var b = a = void 0 === a ? {} : a;
	  a = void 0 === b.Da ? false : b.Da;
	  b = void 0 === b.ia ? [Ec({text: I("Roll.Exercise.TypeIn.Answer") + " 1"})] : b.ia;
	  return {Da: a, ia: b};
	}
	;
	function Gc(a) {
	  a = void 0 === a ? {} : a;
	  var b = void 0 === a.L ? [] : a.L, c = void 0 === a.Ga ? [] : a.Ga;
	  return {type: void 0 === a.type ? "correctIncorrect" : a.type, o: Cc([wc({B: void 0 === a.o ? [] : a.o})]), L: Cc([wc({B: b})]), Ga: Cc([wc({B: c})])};
	}
	function Hc(a, b) {
	  a = uc(ic(("answered" == a.type ? a.o : b ? a.L : a.Ga).T));
	  return F(a);
	}
	;
	function Ic(a) {
	  var b = void 0 === a.key ? rc() : a.key, c = a.type, d = void 0 === a.M ? null : a.M, e = void 0 === a.description ? "" : a.description;
	  if (void 0 === a.content) a: {
		var f = a.type;
		switch (f) {
		  case "mc":
		  case "mr":
			f = Dc();
			break a;
		  case "ti":
			f = Fc();
			break a;
		  default:
			throw H(f), Error("Unknown question type: " + f);
		}
	  } else f = a.content;
	  a = void 0 === a.V ? Gc() : a.V;
	  return {key: b, type: c, M: d, description: Cc([wc({B: e})]), content: f, V: a};
	}
	;
	function Jc(a) {
	  a = void 0 === a ? {} : a;
	  return {ab: void 0 === a.ab ? false : a.ab, Ma: void 0 === a.Ma ? false : a.Ma, H: void 0 === a.H ? true : a.H};
	}
	;
	function Kc(a) {
	  a = void 0 === a ? {} : a;
	  return {type: "", key: a.key || rc(), w: a.w || "inner"};
	}
	;
	function Lc(a) {
	  a = void 0 === a ? {} : a;
	  var b = a.B || [];
	  "string" === typeof b && (b = xc(b));
	  return Object.assign({}, Kc(a), {width: a.width || 0, height: a.height || 0, B: b});
	}
	;
	function Mc(a) {
	  var b = {order: [], A: {}};
	  a = t(a);
	  for (var c = a.next(); !c.done; c = a.next()) c = c.value, b.order.push(c.key), b.A[c.key] = c;
	  return b;
	}
	function Cc(a) {
	  a = void 0 === a ? [wc()] : a;
	  return {T: Mc(a)};
	}
	;
	function Nc(a) {
	  return "mc" === a.type || "mr" === a.type ? a : null;
	}
	;
	function Oc(a) {
	  for (var b = 0; b < a.length; ++b) {
		var c = Math.floor(Math.random() * b), d = a[b];
		a[b] = a[c];
		a[c] = d;
	  }
	}
	function Pc(a, b) {
	  a = a.map(function (c) {
		return {ja: c, selected: false};
	  });
	  b && Oc(a);
	  return a;
	}
	;
	function Qc(a, b) {
	  var c = Nc(a);
	  if (c) b = {da: Pc(c.content.ka, b)}; else if (b = "ti" === a.type ? a : null) b = {Bd: b.content, ua: ""}; else throw Error("Unknown question type: " + a.type);
	  return {ba: a, o: false, j: b};
	}
	;
	function Rc(a, b) {
	  return a.map(function (c) {
		return Qc(c, b);
	  });
	}
	function Sc(a) {
	  var b = Rc(a.Z, a.R.Ma);
	  return {key: a.key, type: "E", Sb: a, la: b, ca: 0 < b.length ? 0 : -1};
	}
	function Tc(a) {
	  var b = a.ca;
	  return 0 <= b ? a.la[b] : null;
	}
	;
	function Uc(a) {
	  a = void 0 === a ? [] : a;
	  var b = Mc(a), c = [];
	  a = t(a);
	  for (var d = a.next(); !d.done; d = a.next()) (d = (d = d.value) && "E" === d.type ? d : null) && c.push(Sc(d));
	  return {T: b, progress: 0, oa: c};
	}
	;
	function Vc(a) {
	  a = void 0 === a ? {} : a;
	  return {title: a.title || "", kf: a.kf || ""};
	}
	;
	function Wc(a, b) {
	  return (Math.floor(a.progress) + b.reduce(function (c, d) {
		return c + Math.floor(d.progress);
	  }, 0)) / (b.length + 1);
	}
	function Yc(a) {
	  var b = a.fa;
	  return -1 == b ? a.intro : a.chapters[b];
	}
	;
	function Zc(a) {
	  for (var b = [], c = t(a.T.order), d = c.next(); !d.done; d = c.next()) b.push(a.T.A[d.value]);
	  return Uc(b);
	}
	function $c(a) {
	  var b = {aa: a.u.aa, title: a.u.title, jb: a.u.qa};
	  a.u.qa && (b.jb = {src: a.u.qa.src, width: a.u.qa.width, height: a.u.qa.height, color: a.u.qa.color, opacity: a.u.qa.opacity});
	  b = void 0 === b ? {} : b;
	  b = {title: b.title || "", aa: b.aa || "", jb: b.jb || null};
	  a = Zc(a.j);
	  return {key: "intro", u: b, j: a, index: -1, progress: 0};
	}
	function ad(a) {
	  var b = $c(a.intro), c = a.chapters.order.map(function (d, e) {
		d = a.chapters.A[d];
		e = {key: d.key, index: e, u: Vc({title: d.u.title}), j: Zc(d.j)};
		return {key: e.key || "", u: e.u || Vc(), j: e.j || Uc(), index: e.index || 0, progress: e.progress || 0};
	  });
	  return {intro: b, chapters: c, fa: -1, Ta: false};
	}
	;
	function bd(a) {
	  return Nc(a.ba) ? a : null;
	}
	;
	function cd(a) {
	  var b = a.ba;
	  return "ti" === b.type && b ? a : null;
	}
	;
	var dd = protobuf.Type, ed = protobuf.Field, fd = 0;
	var hd = new protobuf.Root;
	function Q(a) {
	  var b = b || "Type" + ++fd;
	  b = new dd(b);
	  for (var c = t(Object.keys(a)), d = c.next(); !d.done; d = c.next()) {
		d = d.value;
		var e = a[d], f = e.La;
		"string" == typeof f ? b = b.add(new ed(d, e.id, f, e.Cc)) : f instanceof dd ? b = b.add(new ed(d, e.id, f.name, e.Cc)) : (f = Q(f), b = b.add(new ed(d, e.id, f.name, e.Cc)));
	  }
	  hd.add(b);
	  return b;
	}
	function M(a, b, c) {
	  return {id: a, La: b, Cc: void 0 === c ? "required" : c};
	}
	function R(a, b) {
	  "function" == typeof b && (b = b(a).La);
	  return M(a, b, "repeated");
	}
	function S(a, b) {
	  "function" == typeof b && (b = b(a).La);
	  return M(a, b, "optional");
	}
	function id(a) {
	  for (var b = Q({}), c = Q({}).add(new ed("type", 0, "string", "required")), d = t(Object.keys(a)), e = d.next(); !e.done; e = d.next()) e = e.value, a[e] = a[e].add(new ed("type", 0, "string", "required"));
	  b.fromObject = function (f) {
		return a[f.type].fromObject(f);
	  };
	  b.toObject = function (f) {
		return a[f.type].toObject(f);
	  };
	  b.encode = function (f, g) {
		return a[f.type].encode(f, g);
	  };
	  b.decode = function (f, g) {
		for (var h = [], k = 1; k < arguments.length; ++k) h[k - 1] = arguments[k];
		if (f instanceof protobuf.Reader) {
		  k = f.pos;
		  var l = c.decode.apply(c, [f].concat(y(h)));
		  l = a[l.type];
		  f.pos = k;
		  return l.decode.apply(l, [f].concat(y(h)));
		}
		throw Error("top level union is not supported");
	  };
	  b.verify = function (f) {
		var g = a[f.type];
		return g ? g.verify(f) : "unknown type " + f.type;
	  };
	  return b;
	}
	;
	var jd = Q({key: M(1, "string"), selected: M(2, "bool")}), kd = Q({da: R(1, jd)}), ld = Q({da: R(1, jd)}), md = Q({ua: M(1, "string")}), nd = Q({key: M(1, "string"), o: M(2, "bool"), j: M(3, kd)}), od = Q({key: M(1, "string"), o: M(2, "bool"), j: M(3, ld)}), pd = Q({key: M(1, "string"), o: M(2, "bool"), j: M(3, md)}), qd = id({mc: nd, mr: od, ti: pd}), rd = Q({key: M(1, "string"), ca: M(2, "int32"), la: R(3, qd)});
	var sd = {}, td = id((sd.E = rd, sd)), ud = Q({intro: M(1, {progress: S(1, gd), oa: R(2, td)}), chapters: R(2, {progress: S(1, gd), oa: R(2, td)}), rd: S(3, N)}), vd = new fc(ud);
	function wd(a, b) {
	  var c = b.la;
	  if (c) {
		for (var d = a.la, e = 0; e < d.length; ++e) {
		  var f = d[e], g = c[e];
		  f.o = g.o;
		  g = g.j;
		  var h = bd(f);
		  if (h) {
			if (f = h.j, h = g, h.da) {
			  var k = f.da;
			  g = new Map;
			  k = t(k);
			  for (var l = k.next(); !l.done; l = k.next()) l = l.value, g.set(l.ja.key, l);
			  k = [];
			  h = t(h.da);
			  for (l = h.next(); !l.done; l = h.next()) {
				l = l.value;
				var m = g.get(l.key);
				m.selected = l.selected;
				k.push(m);
			  }
			  f.da = k;
			}
		  } else if (h = cd(f)) h.j.ua = g.ua; else throw Error("Unknown question type: " + f.ba.type);
		}
		b = b.ca;
		"number" == typeof b && (a.ca = b);
	  }
	}
	;
	function xd(a, b) {
	  var c = b.intro, d = b.chapters;
	  b = b.rd;
	  if (c) {
		var e = c.progress;
		c = c.oa;
		"number" == typeof e && (a.intro.progress = e);
		c && yd(a.intro.j.oa, c);
	  }
	  d && a.chapters.forEach(function (f, g) {
		var h = F(d)[g];
		g = h.progress;
		h = h.oa;
		g && (f.progress = g);
		h && yd(f.j.oa, h);
	  });
	  "number" == typeof b && 0 <= b && (a.fa = b);
	}
	function yd(a, b) {
	  var c = {};
	  b = t(b);
	  for (var d = b.next(); !d.done; c = {Jb: c.Jb}, d = b.next()) if (c.Jb = d.value, d = a.find(function (f) {
		return function (g) {
		  return f.Jb.key == g.key;
		};
	  }(c))) {
		var e = "E" != d.type ? null : d;
		if (e) wd(e, c.Jb); else throw Error("Unexpected block state type: " + d.type);
	  }
	}
	;
	function zd(a, b) {
	  a = ad(a.content);
	  if (b) try {
		var c = gc(b, function () {
		  return vd;
		});
		xd(a, c);
	  } catch (d) {
		Ia(d);
	  }
	  return a;
	}
	;
	function Ad(a) {
	  return a.map(function (b) {
		var c = b.ba, d = c.key;
		c = c.type;
		var e = b.o;
		var f = bd(b);
		if (f) b = Bd(f.j); else if (f = cd(b)) b = {ua: f.j.ua}; else throw Error("Unknown question type: " + b.ba.type);
		return {key: d, type: c, o: e, j: b};
	  });
	}
	function Bd(a) {
	  return {da: a.da.map(function (b) {
		return {key: b.ja.key, selected: b.selected};
	  })};
	}
	;
	function Cd(a) {
	  return a.map(function (b) {
		var c = "E" != b.type ? null : b;
		if (c) return {key: c.key, type: c.type, ca: c.ca, la: Ad(c.la)};
		throw Error("Unexpected block state type: " + b.type);
	  });
	}
	function Dd(a) {
	  return {intro: {progress: a.intro.progress, oa: Cd(a.intro.j.oa)}, chapters: a.chapters.map(function (b) {
		return {progress: b.progress, oa: Cd(b.j.oa)};
	  }), rd: a.fa};
	}
	;
	function Ed(a) {
	  this.cb = a.Cb.cb;
	  this.qd = false;
	  this.Ia = a.Cb.Ia;
	  this.Ha = a.Cb.Ha;
	  this.Ra = a.Cb.Ra;
	  this.fonts = {Wa: Fb("Lato"), dh: Fb(a.kb.qc), content: Fb(a.kb.ec)};
	}
	;
	var Fd = ab.requestAnimationFrame || ab.mozRequestAnimationFrame || ab.webkitRequestAnimationFrame || ab.msRequestAnimationFrame || setTimeout, Gd = ab.cancelAnimationFrame || ab.mozCancelAnimationFrame || ab.webkitCancelAnimationFrame || ab.msCancelAnimationFrame || clearTimeout;
	function Hd() {
	  function a() {
		Gd(c);
		c = null;
	  }
	  var b = Id, c;
	  return {call: function () {
		c && a();
		c = Fd(b);
	  }, cancel: a, Tg: function () {
		return null != c;
	  }};
	}
	;
	function Jd(a) {
	  function b() {
		if (!m) {
		  var p = Math.max(0, Math.min(f, Date.now() - l)), w = e(p / f);
		  d.animate(w);
		  p < f ? Fd(b) : (k && k(), g && g.remove(c), q.dispatch(true), Fd(function () {
			d.complete();
		  }));
		}
	  }
	  function c() {
		m = true;
		F(g).remove(c);
		q.dispatch(false);
	  }
	  var d = a.fb, e = a.Hb, f = a.duration, g = a.Xa, h = a.Yd, k = a.Uc, l = Date.now(), m = false, q = new wb;
	  h && h();
	  Fd(b);
	  g && g.add(c);
	  return q;
	}
	;
	function Ld(a) {
	  return 0.5 > a ? 4 * a * a * a : (a - 1) * (2 * a - 2) * (2 * a - 2) + 1;
	}
	function Md(a) {
	  return function (b) {
		return b < a ? 0 : --((b - a) / (1 - a)) * ((b - a) / (1 - a)) * ((b - a) / (1 - a)) + 1;
	  };
	}
	function Nd(a) {
	  return function (b) {
		return 1 - a(b);
	  };
	}
	;
	function Od(a, b, c, d) {
	  a = a.getBoundingClientRect();
	  var e = 0;
	  "top" == c && d.top > a.top ? e = a.top - d.top : "bottom" == c && d.bottom < a.bottom && (e = a.bottom - d.bottom);
	  if (e) {
		var f = b.scrollTop;
		Jd({duration: 500, Hb: Kd, fb: {animate: function (g) {
		  b.scrollTop = f + e * g;
		}, complete: function () {}, wb: []}});
	  }
	}
	;
	function Pd(a) {
	  var b = window.getComputedStyle(a), c = b && b.opacity ? parseFloat(b.opacity) : 1;
	  return {animate: function (d) {
		a.style.opacity = "" + (c - c * d);
	  }, complete: function () {
		a.style.opacity = "";
	  }, wb: ["opacity"]};
	}
	;
	function Qd(a) {
	  return {animate: function (b) {
		a.forEach(function (c) {
		  return c.animate(b);
		});
	  }, complete: function () {
		a.forEach(function (b) {
		  return b.complete();
		});
	  }, wb: []};
	}
	;
	function T(a, b, c) {
	  function d() {
		return [a, b, c];
	  }
	  d.Hd = "renderBinding";
	  return d;
	}
	function Rd(a, b, c) {
	  "string" != typeof a && (sc.has(a) || sc.set(a, rc()), a = sc.get(a));
	  return {id: a, Zd: T(b, c, void 0)};
	}
	;
	var Sd = new Map, Td = null;
	function Ud() {
	  Td || (Td = new MutationObserver(function (a) {
		a = t(a);
		for (var b = a.next(); !b.done; b = a.next()) {
		  b = b.value;
		  for (var c = t(b.removedNodes), d = c.next(); !d.done; d = c.next()) {
			var e = d.value, f = t(Sd.keys());
			for (d = f.next(); !d.done; d = f.next()) {
			  d = d.value;
			  var g = F(Sd.get(d));
			  g.remove && e.contains && e.contains(d) && g.remove();
			}
		  }
		  b = t(b.addedNodes);
		  for (c = b.next(); !c.done; c = b.next()) for (c = c.value, e = t(Sd.keys()), d = e.next(); !d.done; d = e.next()) d = d.value, f = F(Sd.get(d)), f.add && c.contains && c.contains(d) && f.add();
		}
	  }));
	  return Td;
	}
	function Vd(a, b) {
	  var c = 0 == Sd.size;
	  Ja(!Sd.has(a));
	  Sd.set(a, b);
	  c && Ud().observe(document, {subtree: true, childList: true});
	  return function () {
		Sd.delete(a);
		0 == Sd.size && Ud().disconnect();
	  };
	}
	;
	function Xd(a) {
	  var b = Yd[Yd.length - 1].fc;
	  return b.has(a) ? b.get(a).value : a.Ke;
	}
	var Zd = new Map;
	var $d = [], ae = [];
	function be(a) {
	  for (var b = t(a), c = b.next(); !c.done; c = b.next()) {
		c = c.value;
		c.clear && c.clear();
		try {
		  c.clear = c.Yc(), c.clear && "function" != typeof c.clear && (E("useEffect's callback should return a function"), c.clear = void 0);
		} catch (d) {
		  console.log(d);
		}
	  }
	  a.length = 0;
	}
	function ce() {
	  be($d);
	}
	function de(a) {
	  a.clear && (a.clear(), a.clear = null);
	  a.sync ? $d.push(a) : ae.push(a);
	}
	;
	var ee = null, fe = new Map;
	function ge() {
	  ee || (ee = Hd().call);
	  ee();
	}
	var he = false, ie = false;
	function Id() {
	  if (!he) if (he = true, be(ae), he = false, ie) E("render was already started"), ge(); else {
		ie = true;
		Zd.clear();
		var a = fe;
		fe = new Map;
		a = t(a.keys());
		for (var b = a.next(); !b.done; b = a.next()) {
		  b = b.value;
		  try {
			b();
		  } catch (c) {
			console.log(c);
		  }
		}
		ce();
		ie = false;
	  }
	}
	function je(a) {
	  fe.set(a, true);
	  ge();
	}
	;
	var ke = new Map, Yd = [];
	function le() {
	  if (!Yd.length) throw Error("Hooks can be used only in render functions");
	  var a = F(Yd[Yd.length - 1]).pd;
	  ke.has(a) || ke.set(a, {Bb: 0, ra: [], pc: 0, Ea: [], eb: a, connected: false});
	  return F(ke.get(a));
	}
	function me(a) {
	  var b = le(), c = b.Bb;
	  b.ra.length == c && (a = "function" == typeof a ? a() : a, b.ra.push([a, function (d) {
		"function" === typeof d && (d = d(b.ra[c][0]));
		b.ra[c][0] = d;
		je(b.eb);
	  }]));
	  ++b.Bb;
	  return b.ra[c];
	}
	function U(a) {
	  var b = le(), c = b.Bb;
	  b.ra.length == c && b.ra.push({current: a});
	  a = b.ra[c];
	  ++b.Bb;
	  return a;
	}
	function ne(a, b, c) {
	  var d = le(), e = d.pc;
	  d.Ea.length == e ? d.Ea.push({Yc: a, sync: c, clear: null, ad: b}) : d.Ea[e].Yc = a;
	  a = d.Ea[e];
	  !d.connected || b && rb(F(a.ad), b) || (de(a), a.sync || ge());
	  a.ad = b;
	  ++d.pc;
	}
	function V(a, b) {
	  ne(a, b, false);
	}
	function oe(a, b) {
	  ne(a, b, true);
	}
	function pe(a) {
	  var b = U();
	  V(function () {
		b.current = a;
	  }, [a]);
	  return b.current;
	}
	function qe(a, b) {
	  var c = U(), d = pe(b);
	  d && rb(d, b) || (c.current = a());
	  return c.current;
	}
	function re(a, b) {
	  return qe(function () {
		return a;
	  }, b);
	}
	function se() {}
	;
	hyperHTML.define("save-ref", function (a, b) {
	  b = void 0 === b ? {} : b;
	  b.current = a;
	});
	var te = new WeakMap;
	hyperHTML.define("passive-events", function (a, b) {
	  for (var c = te.get(a) || te.set(a, {}).get(a), d = t(Object.keys(b)), e = d.next(); !e.done; e = d.next()) if (e = e.value, "on" === e.slice(0, 2) && c[e] !== b[e]) {
		var f = e.slice(2);
		c[e] && a.removeEventListener(f, c[e]);
		c[e] = b[e];
		c[e] && a.addEventListener(f, c[e], {passive: true});
	  }
	  return "";
	});
	var ue = hyperHTML.wire;
	var ve = new Map, we = new WeakMap;
	function xe(a, b, c, d, e) {
	  c = void 0 === c ? new Map : c;
	  e = void 0 === e ? "html" : e;
	  var f = b ? b : "__root";
	  ve.has(a) || ve.set(a, {});
	  var g = ve.get(a);
	  if (!g[f]) {
		var h = ue(void 0, e), k = 0, l = new Map(c), m = 0, q = [], p = [], w = null, v = new Map, C = new Map, A = function (u, n) {
		  for (var x = [], G = 1; G < arguments.length; ++G) x[G - 1] = arguments[G];
		  if ("function" === typeof u && "renderBinding" == u.Hd || null == u) return A.Na(function () {
			return u;
		  }, x[0]);
		  if ("function" === typeof u) return G = x[0], x = x[1], A.Sc("_c" + ++k, u, G, x);
		  w && !Object.is(u, w) && Ia("Template literal was changed");
		  w = u;
		  x = h.apply(null, [u].concat(y(x)));
		  x.uf = function () {
			h = ue(void 0, e);
		  };
		  A.Gd();
		  d && (d.current = x);
		  return x;
		};
		A.fc = c;
		A.Na = function (u, n) {
		  q[m] || (q[m] = new Map);
		  var x = q[m], G = p[m];
		  u = u();
		  if (!u) return ++m, null;
		  var P = t(u());
		  u = P.next().value;
		  var J = P.next().value;
		  P = P.next().value;
		  if (!x.get(u)) {
			var ua = x.has(u) ? y(x.keys()).concat().indexOf(u) : x.size;
			x.set(u, ye(u, A.Qc("_u" + m + "_" + ua, e), l, n, P));
		  }
		  ++m;
		  G && G.delete(u);
		  return F(x.get(u))(J);
		};
		A.Ac = function (u, n) {
		  var x = [], G = new Set;
		  u.forEach(function (P, J) {
			if (J = n(P, J)) {
			  P = J.id;
			  J = J.Zd;
			  for (var ua = P; G.has(P);) P += "_copy";
			  G.add(P);
			  ua != P && E("duplicated child id: " + ua);
			  var qa = t(J());
			  J = qa.next().value;
			  ua = qa.next().value;
			  qa = qa.next().value;
			  P || (E("unexpected error: empty id in render all"), P = "_c" + ++k);
			  x.push(A.Sc(P, J, ua, qa));
			}
		  });
		  return x;
		};
		A.Qc = function (u, n) {
		  return xe(a, (b || "") + u, l, void 0, n);
		};
		A.Sc = function (u, n, x, G) {
		  u = A.Qc(u, e);
		  v.has(u) ? C.delete(u) : (n = ye(n, u, l, G), v.set(u, n));
		  return F(v.get(u))(x);
		};
		A.Gd = function () {
		  if (C.size) for (var u = t(C.keys()), n = u.next(); !n.done; n = u.next()) {
			var x = n.value, G = v.get(x);
			G ? (G.Qa(), v.delete(x)) : Ia("clean child error");
		  }
		  for (u = 0; u < p.length; ++u) for (x = p[u], G = t(x.keys()), n = G.next(); !n.done; n = G.next()) {
			n = n.value;
			var P = x.get(n);
			P ? (P.Qa(), q[u].set(n, null)) : null !== P && Ia("clean child error");
		  }
		  C = new Map(v);
		  p = q.map(function (J) {
			return new Map(J);
		  });
		  m = k = 0;
		};
		A.K = function (u, n, x) {
		  n = n();
		  return n ? A(u, n, x) : (++k, null);
		};
		A.Dc = function (u, n) {
		  var x = l.get(u);
		  x && x.value === n || (Zd.set(u, true), x ? x.value = n : l.set(u, {value: n}));
		  return A;
		};
		A.Qa = function () {
		  A.Qa = function () {
			console.log("clean already complete");
		  };
		  g[f] = null;
		  for (var u = t(v.values()), n = u.next(); !n.done; n = u.next()) n.value.Qa();
		  u = t(q);
		  for (n = u.next(); !n.done; n = u.next()) {
			var x = t(n.value.values());
			for (n = x.next(); !n.done; n = x.next()) (n = n.value) && n.Qa();
		  }
		  v.clear();
		  C.clear();
		};
		g[f] = A;
	  }
	  return g[f];
	}
	function ze(a, b, c) {
	  var d = t(b());
	  b = d.next().value;
	  var e = d.next().value;
	  d = d.next().value;
	  a = b(a, e);
	  a instanceof Element && Ae(a, d);
	  c && (c.current = a);
	  return a;
	}
	function Ae(a, b) {
	  if (b) if (b = String(b), b.includes(" ")) E("multiple classNames not allowed: " + b); else if (a instanceof Element) if (a.classList) a.classList.add(b); else {
		if (a.classList) var c = a.classList.contains(b); else a.classList ? c = a.classList : (c = a.className, c = "string" == typeof c && c.match(/\S+/g) || []), c = c.includes(b);
		if (!c) {
		  c = "string" == typeof a.className ? a.className : a.className.baseVal;
		  var d = "";
		  c && (d = c + " ");
		  b = d + b;
		  "string" == typeof a.className ? a.className = b : a.className.baseVal = b;
		}
	  }
	}
	function ye(a, b, c, d, e) {
	  function f() {
		if (!m) {
		  var q = F(c);
		  Yd.push({pd: f, fc: q});
		  ke.has(f) && (q = F(ke.get(f)), q.Bb = 0, q.pc = 0);
		  q = a(b, h);
		  var p = F(Yd.pop());
		  if (p = ke.get(p.pd)) {
			Ja(q instanceof Element);
			if (p.connected) Ja(p.gd == p.ra.length, "Incorrect hooks count\nexpected: " + p.gd + "\nactual: " + p.ra.length), Ja(p.fd == p.Ea.length, "Incorrect effects count\nexpected: " + p.fd + "\nactual: " + p.Ea.length); else {
			  p.connected = true;
			  for (var w = t(p.Ea), v = w.next(); !v.done; v = w.next()) v = v.value, de(v), v.sync || ge();
			  p.gd = p.ra.length;
			  p.fd = p.Ea.length;
			}
			p = true;
		  } else p = false;
		  k && p ? k != q && window.console.error("[" + a.name + "] dom element was changed") : k = q;
		  k instanceof Element && (Ae(k, l.className), Ae(k, e));
		  l.La && (l.La.current = k);
		  return q;
		}
	  }
	  function g(q) {
		a: {
		  var p = F(c);
		  p = t(p.keys());
		  for (var w = p.next(); !w.done; w = p.next()) if (Zd.has(w.value)) {
			p = true;
			break a;
		  }
		  p = false;
		}
		if ((p = !p) && !(p = h === q) && (p = "object" === typeof h && "object" === typeof q)) a: {
		  for (var v in h) if (!(v in q) || h[v] !== q[v]) {
			p = false;
			break a;
		  }
		  for (var C in q) if (!(C in h)) {
			p = false;
			break a;
		  }
		  p = true;
		}
		if (p && k) return k;
		h = q;
		return F(f());
	  }
	  c = void 0 === c ? new Map : c;
	  d = void 0 === d ? "" : d;
	  e = void 0 === e ? "" : e;
	  var h, k = null, l = "string" == typeof d || d.___css ? {className: String(d)} : d, m = false;
	  g.Qa = function () {
		m = true;
		var q = ke.get(f);
		if (q) {
		  q = t(q.Ea);
		  for (var p = q.next(); !p.done; p = q.next()) p = p.value, p.clear && p.clear();
		  ke.delete(f);
		}
		b.Qa();
	  };
	  return g;
	}
	function Be(a, b, c, d) {
	  c = void 0 === c ? xe(b) : c;
	  d = void 0 === d ? new Map : d;
	  var e = we.has(c);
	  e || we.set(c, ye(a, c, d));
	  var f = we.get(c), g = f(b);
	  if (!e) var h = Vd(g, {remove: function () {
		document.body.contains(g) || (f.Qa(), h(), we.delete(c));
	  }});
	  g.hasAttribute("data-root") || g.setAttribute("data-root", "true");
	  Fd(ce);
	  return g;
	}
	function Ce(a) {
	  return function (b, c) {
		return Be(a, b, c, c && c.fc);
	  };
	}
	function De(a, b) {
	  var c = Ee;
	  b = void 0 === b ? a : b;
	  var d = Ce(c), e = xe(b), f = true;
	  return function (g) {
		if (f) {
		  var h = d(g, e);
		  a(h);
		  f = false;
		} else je(function () {
		  d(g, e);
		});
	  };
	}
	;
	function Fe(a) {
	  if (a) {
		if ("string" == typeof a) {
		  var b = {};
		  a = (b.id = a, b);
		}
		return Object.entries(a).filter(function (c) {
		  c = t(c);
		  c.next();
		  return null != c.next().value;
		}).map(function (c) {
		  var d = t(c);
		  c = d.next().value;
		  d = d.next().value;
		  return c + "=" + d;
		}).join(";");
	  }
	}
	;
	var Ge = [];
	function He(a, b, c, d) {
	  c = void 0 === c ? {} : c;
	  return D(a + b, c, d);
	}
	var Ie = "";
	function Je(a, b, c, d, e, f) {
	  a = Ke(Ke(b, a), Ke(d, f));
	  return Ke(a << e | a >>> 32 - e, c);
	}
	function Ke(a, b) {
	  var c = (65535 & a) + (65535 & b);
	  return (a >> 16) + (b >> 16) + (c >> 16) << 16 | 65535 & c;
	}
	new Set;
	function Pe(a) {
	  var b = a[0];
	  a = Array(b.length >> 2);
	  for (var c = 0; c < a.length; c++) a[c] = 0;
	  for (c = 0; c < 8 * b.length; c += 8) a[c >> 5] |= (255 & b.charCodeAt(c / 8)) << c % 32;
	  b = 8 * b.length;
	  a[b >> 5] |= 128 << b % 32;
	  a[14 + (b + 64 >>> 9 << 4)] = b;
	  b = 1732584193;
	  c = -271733879;
	  for (var d = -1732584194, e = 271733878, f = 0; f < a.length; f += 16) {
		var g = b, h = c, k = d, l = e;
		c = Je(e ^ ((d = Je(b ^ ((e = Je(c ^ ((b = Je(d ^ (c | ~e), b, c, a[f + 4], 6, -145523070)) | ~d), e, b = Je(d ^ (c | ~e), b, c, a[f + 4], 6, -145523070), a[f + 11], 10, -1120210379)) | ~c), d, e = Je(c ^ ((b = Je(d ^ (c | ~e), b, c, a[f + 4], 6, -145523070)) | ~d), e, b = Je(d ^ (c | ~e), b, c, a[f + 4], 6, -145523070), a[f + 11], 10, -1120210379), a[f + 2], 15, 718787259)) | ~b), c = Je(e ^ ((d = Je(b ^ ((e = Je(c ^ ((b = Je(d ^ (c | ~e), b, c, a[f + 8], 6, 1873313359)) | ~d), e, b = Je(d ^ (c | ~e), b, c, a[f + 8], 6, 1873313359), a[f + 15], 10, -30611744)) | ~c), d, e = Je(c ^ ((b = Je(d ^ (c | ~e), b, c, a[f + 8], 6, 1873313359)) | ~d), e, b = Je(d ^ (c | ~e), b, c, a[f + 8], 6, 1873313359), a[f + 15], 10, -30611744), a[f + 6], 15, -1560198380)) | ~b), c = Je(e ^ ((d = Je(b ^ ((e = Je(c ^ ((b = Je(d ^ (c | ~e), b, c, a[f + 12], 6, 1700485571)) | ~d), e, b = Je(d ^ (c | ~e), b, c, a[f + 12], 6, 1700485571), a[f + 3], 10, -1894986606)) | ~c), d, e = Je(c ^ ((b = Je(d ^ (c | ~e), b, c, a[f + 12], 6, 1700485571)) | ~d), e, b = Je(d ^ (c | ~e), b, c, a[f + 12], 6, 1700485571), a[f + 3], 10, -1894986606), a[f + 10], 15, -1051523)) | ~b), c = Je(e ^ ((d = Je(b ^ ((e = Je(c ^ ((b = Je(d ^ (c | ~e), b, c, a[f], 6, -198630844)) | ~d), e, b = Je(d ^ (c | ~e), b, c, a[f], 6, -198630844), a[f + 7], 10, 1126891415)) | ~c), d, e = Je(c ^ ((b = Je(d ^ (c | ~e), b, c, a[f], 6, -198630844)) | ~d), e, b = Je(d ^ (c | ~e), b, c, a[f], 6, -198630844), a[f + 7], 10, 1126891415), a[f + 14], 15, -1416354905)) | ~b), c = Je((d = Je((e = Je((b = Je(c ^ d ^ e, b, c, a[f + 9], 4, -640364487)) ^ c ^ d, e, b = Je(c ^ d ^ e, b, c, a[f + 9], 4, -640364487), a[f + 12], 11, -421815835)) ^ b ^ c, d, e = Je((b = Je(c ^ d ^ e, b, c, a[f + 9], 4, -640364487)) ^ c ^ d, e, b = Je(c ^ d ^ e, b, c, a[f + 9], 4, -640364487), a[f + 12], 11, -421815835), a[f + 15], 16, 530742520)) ^ e ^ b, c = Je((d = Je((e = Je((b = Je(c ^ d ^ e, b, c, a[f + 13], 4, 681279174)) ^ c ^ d, e, b = Je(c ^ d ^ e, b, c, a[f + 13], 4, 681279174), a[f], 11, -358537222)) ^ b ^ c, d, e = Je((b = Je(c ^ d ^ e, b, c, a[f + 13], 4, 681279174)) ^ c ^ d, e, b = Je(c ^ d ^ e, b, c, a[f + 13], 4, 681279174), a[f], 11, -358537222), a[f + 3], 16, -722521979)) ^ e ^ b, c = Je((d = Je((e = Je((b = Je(c ^ d ^ e, b, c, a[f + 1], 4, -1530992060)) ^ c ^ d, e, b = Je(c ^ d ^ e, b, c, a[f + 1], 4, -1530992060), a[f + 4], 11, 1272893353)) ^ b ^ c, d, e = Je((b = Je(c ^ d ^ e, b, c, a[f + 1], 4, -1530992060)) ^ c ^ d, e, b = Je(c ^ d ^ e, b, c, a[f + 1], 4, -1530992060), a[f + 4], 11, 1272893353), a[f + 7], 16, -155497632)) ^ e ^ b, c = Je((d = Je((e = Je((b = Je(c ^ d ^ e, b, c, a[f + 5], 4, -378558)) ^ c ^ d, e, b = Je(c ^ d ^ e, b, c, a[f + 5], 4, -378558), a[f + 8], 11, -2022574463)) ^ b ^ c, d, e = Je((b = Je(c ^ d ^ e, b, c, a[f + 5], 4, -378558)) ^ c ^ d, e, b = Je(c ^ d ^ e, b, c, a[f + 5], 4, -378558), a[f + 8], 11, -2022574463), a[f + 11], 16, 1839030562)) ^ e ^ b, c = Je((d = Je((e = Je((b = Je(c & e | d & ~e, b, c, a[f + 13], 5, -1444681467)) & d | c & ~d, e, b = Je(c & e | d & ~e, b, c, a[f + 13], 5, -1444681467), a[f + 2], 9, -51403784)) & c | b & ~c, d, e = Je((b = Je(c & e | d & ~e, b, c, a[f + 13], 5, -1444681467)) & d | c & ~d, e, b = Je(c & e | d & ~e, b, c, a[f + 13], 5, -1444681467), a[f + 2], 9, -51403784), a[f + 7], 14, 1735328473)) & b | e & ~b, c = Je((d = Je((e = Je((b = Je(c & e | d & ~e, b, c, a[f + 9], 5, 568446438)) & d | c & ~d, e, b = Je(c & e | d & ~e, b, c, a[f + 9], 5, 568446438), a[f + 14], 9, -1019803690)) & c | b & ~c, d, e = Je((b = Je(c & e | d & ~e, b, c, a[f + 9], 5, 568446438)) & d | c & ~d, e, b = Je(c & e | d & ~e, b, c, a[f + 9], 5, 568446438), a[f + 14], 9, -1019803690), a[f + 3], 14, -187363961)) & b | e & ~b, c = Je((d = Je((e = Je((b = Je(c & e | d & ~e, b, c, a[f + 5], 5, -701558691)) & d | c & ~d, e, b = Je(c & e | d & ~e, b, c, a[f + 5], 5, -701558691), a[f + 10], 9, 38016083)) & c | b & ~c, d, e = Je((b = Je(c & e | d & ~e, b, c, a[f + 5], 5, -701558691)) & d | c & ~d, e, b = Je(c & e | d & ~e, b, c, a[f + 5], 5, -701558691), a[f + 10], 9, 38016083), a[f + 15], 14, -660478335)) & b | e & ~b, c = Je((d = Je((e = Je((b = Je(c & e | d & ~e, b, c, a[f + 1], 5, -165796510)) & d | c & ~d, e, b = Je(c & e | d & ~e, b, c, a[f + 1], 5, -165796510), a[f + 6], 9, -1069501632)) & c | b & ~c, d, e = Je((b = Je(c & e | d & ~e, b, c, a[f + 1], 5, -165796510)) & d | c & ~d, e, b = Je(c & e | d & ~e, b, c, a[f + 1], 5, -165796510), a[f + 6], 9, -1069501632), a[f + 11], 14, 643717713)) & b | e & ~b, c = Je((d = Je((e = Je((b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682), a[f + 13], 12, -40341101)) & b | ~(e = Je((b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682), a[f + 13], 12, -40341101)) & c, d, e = Je((b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682), a[f + 13], 12, -40341101), a[f + 14], 17, -1502002290)) & e | ~(d = Je((e = Je((b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682), a[f + 13], 12, -40341101)) & b | ~(e = Je((b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682), a[f + 13], 12, -40341101)) & c, d, e = Je((b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682), a[f + 13], 12, -40341101), a[f + 14], 17, -1502002290)) & b, c = Je((d = Je((e = Je((b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416), a[f + 9], 12, -1958414417)) & b | ~(e = Je((b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416), a[f + 9], 12, -1958414417)) & c, d, e = Je((b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416), a[f + 9], 12, -1958414417), a[f + 10], 17, -42063)) & e | ~(d = Je((e = Je((b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416), a[f + 9], 12, -1958414417)) & b | ~(e = Je((b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416), a[f + 9], 12, -1958414417)) & c, d, e = Je((b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416), a[f + 9], 12, -1958414417), a[f + 10], 17, -42063)) & b, c = Je((d = Je((e = Je((b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897), a[f + 5], 12, 1200080426)) & b | ~(e = Je((b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897), a[f + 5], 12, 1200080426)) & c, d, e = Je((b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897), a[f + 5], 12, 1200080426), a[f + 6], 17, -1473231341)) & e | ~(d = Je((e = Je((b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897), a[f + 5], 12, 1200080426)) & b | ~(e = Je((b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897), a[f + 5], 12, 1200080426)) & c, d, e = Je((b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897), a[f + 5], 12, 1200080426), a[f + 6], 17, -1473231341)) & b, c = Je((d = Je((e = Je((b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936)) & d, e, b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936), a[f + 1], 12, -389564586)) & b | ~(e = Je((b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936)) & d, e, b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936), a[f + 1], 12, -389564586)) & c, d, e = Je((b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936)) & d, e, b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936), a[f + 1], 12, -389564586), a[f + 2], 17, 606105819)) & e | ~(d = Je((e = Je((b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936)) & d, e, b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936), a[f + 1], 12, -389564586)) & b | ~(e = Je((b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936)) & d, e, b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936), a[f + 1], 12, -389564586)) & c, d, e = Je((b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936)) & d, e, b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936), a[f + 1], 12, -389564586), a[f + 2], 17, 606105819)) & b, c, d = Je((e = Je((b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936)) & d, e, b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936), a[f + 1], 12, -389564586)) & b | ~(e = Je((b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936)) & d, e, b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936), a[f + 1], 12, -389564586)) & c, d, e = Je((b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936)) & d, e, b = Je(c & d | ~c & e, b, c, a[f], 7, -680876936), a[f + 1], 12, -389564586), a[f + 2], 17, 606105819), a[f + 3], 22, -1044525330), d = Je((e = Je((b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897), a[f + 5], 12, 1200080426)) & b | ~(e = Je((b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897), a[f + 5], 12, 1200080426)) & c, d, e = Je((b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 4], 7, -176418897), a[f + 5], 12, 1200080426), a[f + 6], 17, -1473231341), a[f + 7], 22, -45705983), d = Je((e = Je((b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416), a[f + 9], 12, -1958414417)) & b | ~(e = Je((b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416), a[f + 9], 12, -1958414417)) & c, d, e = Je((b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 8], 7, 1770035416), a[f + 9], 12, -1958414417), a[f + 10], 17, -42063), a[f + 11], 22, -1990404162), d = Je((e = Je((b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682), a[f + 13], 12, -40341101)) & b | ~(e = Je((b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682), a[f + 13], 12, -40341101)) & c, d, e = Je((b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682)) & c | ~(b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682)) & d, e, b = Je(c & d | ~c & e, b, c, a[f + 12], 7, 1804603682), a[f + 13], 12, -40341101), a[f + 14], 17, -1502002290), a[f + 15], 22, 1236535329), d = Je((e = Je((b = Je(c & e | d & ~e, b, c, a[f + 1], 5, -165796510)) & d | c & ~d, e, b = Je(c & e | d & ~e, b, c, a[f + 1], 5, -165796510), a[f + 6], 9, -1069501632)) & c | b & ~c, d, e = Je((b = Je(c & e | d & ~e, b, c, a[f + 1], 5, -165796510)) & d | c & ~d, e, b = Je(c & e | d & ~e, b, c, a[f + 1], 5, -165796510), a[f + 6], 9, -1069501632), a[f + 11], 14, 643717713), a[f], 20, -373897302), d = Je((e = Je((b = Je(c & e | d & ~e, b, c, a[f + 5], 5, -701558691)) & d | c & ~d, e, b = Je(c & e | d & ~e, b, c, a[f + 5], 5, -701558691), a[f + 10], 9, 38016083)) & c | b & ~c, d, e = Je((b = Je(c & e | d & ~e, b, c, a[f + 5], 5, -701558691)) & d | c & ~d, e, b = Je(c & e | d & ~e, b, c, a[f + 5], 5, -701558691), a[f + 10], 9, 38016083), a[f + 15], 14, -660478335), a[f + 4], 20, -405537848), d = Je((e = Je((b = Je(c & e | d & ~e, b, c, a[f + 9], 5, 568446438)) & d | c & ~d, e, b = Je(c & e | d & ~e, b, c, a[f + 9], 5, 568446438), a[f + 14], 9, -1019803690)) & c | b & ~c, d, e = Je((b = Je(c & e | d & ~e, b, c, a[f + 9], 5, 568446438)) & d | c & ~d, e, b = Je(c & e | d & ~e, b, c, a[f + 9], 5, 568446438), a[f + 14], 9, -1019803690), a[f + 3], 14, -187363961), a[f + 8], 20, 1163531501), d = Je((e = Je((b = Je(c & e | d & ~e, b, c, a[f + 13], 5, -1444681467)) & d | c & ~d, e, b = Je(c & e | d & ~e, b, c, a[f + 13], 5, -1444681467), a[f + 2], 9, -51403784)) & c | b & ~c, d, e = Je((b = Je(c & e | d & ~e, b, c, a[f + 13], 5, -1444681467)) & d | c & ~d, e, b = Je(c & e | d & ~e, b, c, a[f + 13], 5, -1444681467), a[f + 2], 9, -51403784), a[f + 7], 14, 1735328473), a[f + 12], 20, -1926607734), d = Je((e = Je((b = Je(c ^ d ^ e, b, c, a[f + 5], 4, -378558)) ^ c ^ d, e, b = Je(c ^ d ^ e, b, c, a[f + 5], 4, -378558), a[f + 8], 11, -2022574463)) ^ b ^ c, d, e = Je((b = Je(c ^ d ^ e, b, c, a[f + 5], 4, -378558)) ^ c ^ d, e, b = Je(c ^ d ^ e, b, c, a[f + 5], 4, -378558), a[f + 8], 11, -2022574463), a[f + 11], 16, 1839030562), a[f + 14], 23, -35309556), d = Je((e = Je((b = Je(c ^ d ^ e, b, c, a[f + 1], 4, -1530992060)) ^ c ^ d, e, b = Je(c ^ d ^ e, b, c, a[f + 1], 4, -1530992060), a[f + 4], 11, 1272893353)) ^ b ^ c, d, e = Je((b = Je(c ^ d ^ e, b, c, a[f + 1], 4, -1530992060)) ^ c ^ d, e, b = Je(c ^ d ^ e, b, c, a[f + 1], 4, -1530992060), a[f + 4], 11, 1272893353), a[f + 7], 16, -155497632), a[f + 10], 23, -1094730640), d = Je((e = Je((b = Je(c ^ d ^ e, b, c, a[f + 13], 4, 681279174)) ^ c ^ d, e, b = Je(c ^ d ^ e, b, c, a[f + 13], 4, 681279174), a[f], 11, -358537222)) ^ b ^ c, d, e = Je((b = Je(c ^ d ^ e, b, c, a[f + 13], 4, 681279174)) ^ c ^ d, e, b = Je(c ^ d ^ e, b, c, a[f + 13], 4, 681279174), a[f], 11, -358537222), a[f + 3], 16, -722521979), a[f + 6], 23, 76029189), d = Je((e = Je((b = Je(c ^ d ^ e, b, c, a[f + 9], 4, -640364487)) ^ c ^ d, e, b = Je(c ^ d ^ e, b, c, a[f + 9], 4, -640364487), a[f + 12], 11, -421815835)) ^ b ^ c, d, e = Je((b = Je(c ^ d ^ e, b, c, a[f + 9], 4, -640364487)) ^ c ^ d, e, b = Je(c ^ d ^ e, b, c, a[f + 9], 4, -640364487), a[f + 12], 11, -421815835), a[f + 15], 16, 530742520), a[f + 2], 23, -995338651), d = Je(b ^ ((e = Je(c ^ ((b = Je(d ^ (c | ~e), b, c, a[f], 6, -198630844)) | ~d), e, b = Je(d ^ (c | ~e), b, c, a[f], 6, -198630844), a[f + 7], 10, 1126891415)) | ~c), d, e = Je(c ^ ((b = Je(d ^ (c | ~e), b, c, a[f], 6, -198630844)) | ~d), e, b = Je(d ^ (c | ~e), b, c, a[f], 6, -198630844), a[f + 7], 10, 1126891415), a[f + 14], 15, -1416354905), a[f + 5], 21, -57434055), d = Je(b ^ ((e = Je(c ^ ((b = Je(d ^ (c | ~e), b, c, a[f + 12], 6, 1700485571)) | ~d), e, b = Je(d ^ (c | ~e), b, c, a[f + 12], 6, 1700485571), a[f + 3], 10, -1894986606)) | ~c), d, e = Je(c ^ ((b = Je(d ^ (c | ~e), b, c, a[f + 12], 6, 1700485571)) | ~d), e, b = Je(d ^ (c | ~e), b, c, a[f + 12], 6, 1700485571), a[f + 3], 10, -1894986606), a[f + 10], 15, -1051523), a[f + 1], 21, -2054922799), d = Je(b ^ ((e = Je(c ^ ((b = Je(d ^ (c | ~e), b, c, a[f + 8], 6, 1873313359)) | ~d), e, b = Je(d ^ (c | ~e), b, c, a[f + 8], 6, 1873313359), a[f + 15], 10, -30611744)) | ~c), d, e = Je(c ^ ((b = Je(d ^ (c | ~e), b, c, a[f + 8], 6, 1873313359)) | ~d), e, b = Je(d ^ (c | ~e), b, c, a[f + 8], 6, 1873313359), a[f + 15], 10, -30611744), a[f + 6], 15, -1560198380), a[f + 13], 21, 1309151649), d = Je(b ^ ((e = Je(c ^ ((b = Je(d ^ (c | ~e), b, c, a[f + 4], 6, -145523070)) | ~d), e, b = Je(d ^ (c | ~e), b, c, a[f + 4], 6, -145523070), a[f + 11], 10, -1120210379)) | ~c), d, e = Je(c ^ ((b = Je(d ^ (c | ~e), b, c, a[f + 4], 6, -145523070)) | ~d), e, b = Je(d ^ (c | ~e), b, c, a[f + 4], 6, -145523070), a[f + 11], 10, -1120210379), a[f + 2], 15, 718787259), a[f + 9], 21, -343485551);
		b = Ke(b, g);
		c = Ke(c, h);
		d = Ke(d, k);
		e = Ke(e, l);
	  }
	  a = [b, c, d, e];
	  b = "";
	  for (c = 0; c < 32 * a.length; c += 8) b += String.fromCharCode(a[c >> 5] >>> c % 32 & 255);
	  a = b;
	  c = "";
	  for (d = 0; d < a.length; d++) b = a.charCodeAt(d), c += "0123456789ABCDEF".charAt(b >>> 4 & 15) + "0123456789ABCDEF".charAt(15 & b);
	  Ie = c;
	  a = "x" + Ie.toLowerCase().slice(0, 5) + "__";
	  Ge.push("");
	  return {v: He.bind(null, a)};
	}
	;
	function Qe(a) {
	  var b = t(me(function () {
		return {width: 0, height: 0};
	  })), c = b.next().value, d = b.next().value;
	  V(function () {
		var e = F(a.current), f = new ResizeObserver(function (g) {
		  g = t(g).next().value;
		  d(g.contentRect);
		});
		f.observe(e);
		return function () {
		  f.disconnect();
		};
	  }, [a]);
	  return [c.width, c.height];
	}
	;
	var Re = [];
	function Se(a, b) {
	  b = void 0 === b ? Re : b;
	  var c = t(me(false)), d = c.next().value, e = c.next().value;
	  c = t(me(false));
	  var f = c.next().value, g = c.next().value;
	  c = t(Qe(a));
	  var h = c.next().value, k = c.next().value;
	  V(function () {
		var l = a.current.scrollWidth > a.current.clientWidth;
		l != d && e(l);
		l = a.current.scrollHeight > a.current.clientHeight;
		l != f && g(l);
		se.apply(null, [h, k].concat(y(b)));
	  }, [a, d, f, h, k, b]);
	  return [d, f];
	}
	;
	function Te(a) {
	  var b = void 0 === a.dd ? {width: 0, height: 0} : a.dd, c = a.$e, d = a.I, e = a.align, f = void 0 === a.offsetX ? 0 : a.offsetX;
	  a = void 0 === a.offsetY ? 0 : a.offsetY;
	  var g = {x: 0, y: 0};
	  switch (d) {
		case "top":
		  g.y = -c.height - a;
		  break;
		case "bottom":
		  g.y = b.height + a;
		  break;
		case "left":
		  g.x = -c.width - f;
		  break;
		case "right":
		  g.x = b.width + f;
		  break;
		default:
		  H(d);
	  }
	  switch (e) {
		case "start":
		  switch (d) {
			case "top":
			case "bottom":
			  g.x = f;
			  break;
			case "right":
			case "left":
			  g.y = a;
			  break;
			default:
			  H(d);
		  }
		  break;
		case "center":
		  switch (d) {
			case "top":
			case "bottom":
			  g.x = (b.width - c.width) / 2;
			  break;
			case "right":
			case "left":
			  g.y = (b.height - c.height) / 2;
			  break;
			default:
			  H(d);
		  }
		  break;
		case "end":
		  switch (d) {
			case "top":
			case "bottom":
			  g.x = b.width - c.width - f;
			  break;
			case "right":
			case "left":
			  g.y = b.height - c.height - a;
			  break;
			default:
			  H(d);
		  }
		  break;
		default:
		  H(e);
	  }
	  return g;
	}
	function Ue(a, b, c) {
	  var d = 0;
	  switch (a) {
		case "top":
		  d = c.top - b.top;
		  break;
		case "right":
		  d = b.right - c.right;
		  break;
		case "bottom":
		  d = b.bottom - c.bottom;
		  break;
		case "left":
		  d = c.left - b.left;
		  break;
		default:
		  H(a);
	  }
	  return Math.max(0, d);
	}
	function Ve(a, b, c, d) {
	  var e = 0;
	  switch (b) {
		case "start":
		  switch (a) {
			case "top":
			case "bottom":
			  e = c.right - d.right;
			  break;
			case "right":
			case "left":
			  e = c.bottom - d.bottom;
			  break;
			default:
			  H(a);
		  }
		  break;
		case "center":
		  switch (a) {
			case "top":
			case "bottom":
			  e = Math.max(c.right - d.right, d.left - c.left);
			  break;
			case "right":
			case "left":
			  e = Math.max(c.bottom - d.bottom, d.top - c.top);
			  break;
			default:
			  H(a);
		  }
		  break;
		case "end":
		  switch (a) {
			case "top":
			case "bottom":
			  e = d.left - c.left;
			  break;
			case "right":
			case "left":
			  e = d.top - c.top;
			  break;
			default:
			  H(a);
		  }
		  break;
		default:
		  H(b);
	  }
	  return Math.max(0, e);
	}
	function We(a) {
	  switch (a) {
		case "top":
		  return "bottom";
		case "right":
		  return "left";
		case "bottom":
		  return "top";
		case "left":
		  return "right";
		default:
		  throw H(a), Error();
	  }
	}
	function Xe(a, b, c) {
	  switch (a) {
		case "top":
		case "bottom":
		  if (b.right >= c.right) return "end";
		  if (b.left <= c.left) return "start";
		  break;
		case "right":
		case "left":
		  if (b.bottom > c.bottom) return "end";
		  if (b.top < c.top) return "start";
		  break;
		default:
		  H(a);
	  }
	  return "center";
	}
	;
	function Ye(a, b, c) {
	  var d = U(c);
	  d.current = c;
	  var e = null === c;
	  V(function () {
		if (!e) {
		  var f = eb(a.current, b, function (g) {
			return F(d.current)(g);
		  });
		  return function () {
			return cb(f);
		  };
		}
	  }, [a, b, e]);
	}
	;
	var Ze = ["<div class=", ">", "</div>"];
	Ze.raw = Ze.slice();
	var $e = ["\n<div save-ref=", " class=", ">\n	", "\n</div>"];
	$e.raw = $e.slice();
	function af(a, b) {
	  var c = void 0 === b.size ? "small" : b.size, d = void 0 === b.color ? "dark" : b.color, e = U();
	  Ye(e, "mousedown", function (g) {
		return g.stopPropagation();
	  });
	  var f = "text" == b.type ? T(bf, b.text) : b.content;
	  return a($e, e, D("x17c2d__tooltip", {type: b.type, size: c, color: d}), a(f));
	}
	;
	function cf(a, b, c, d) {
	  void 0 !== a.current && (clearTimeout(a.current), a.current = void 0);
	  0 >= d ? b(c) : a.current = setTimeout(function () {
		a.current = void 0;
		b(c);
	  }, d);
	}
	function df() {
	  var a = t(me(function () {
		return false;
	  })), b = a.next().value, c = a.next().value, d = U(void 0);
	  a = re(function (e, f) {
		return cf(d, function (g) {
		  return c(g);
		}, e, f);
	  }, []);
	  return [b, a];
	}
	;
	function ef(a) {
	  var b = a.od, c = a.defaultValue, d = a.units, e = a.element, f = a.kd, g = (a = (a = window.getComputedStyle(e)) && a.getPropertyValue(b)) ? parseFloat(a) : c, h = e.style.getPropertyValue(b);
	  return {animate: function (k) {
		e.style.setProperty(b, "" + f(k, g) + (d || ""));
	  }, complete: function () {
		e.style.setProperty(b, h);
	  }, wb: [b]};
	}
	function ff(a, b, c) {
	  var d = a.style.transform, e = Lb(a);
	  return {animate: function (f) {
		var g = [e], h = c && c(f);
		if (null != h) {
		  var k = t(h);
		  h = k.next().value;
		  k = k.next().value;
		  g.push("translate(" + h + "px, " + k + "px)");
		}
		f = b && b(f);
		null != f && ("number" == typeof f ? g.push("scale(" + f + ")") : (h = t(f), f = h.next().value, h = h.next().value, null != f && g.push("scaleX(" + f + ")"), null != h && g.push("scaleY(" + h + ")")));
		a.style.transform = g.join(" ");
	  }, complete: function () {
		a.style.transform = d;
	  }, wb: ["transform"]};
	}
	function gf(a) {
	  var b = a.fb, c = a.duration, d = a.Xa, e = a.before, f = a.after;
	  return new Promise(function (g) {
		function h() {
		  var q = Math.max(0, Math.min(c, Date.now() - k));
		  b.animate(q / c);
		  l || q >= c ? (m(), b.complete(), g(), f && f()) : requestAnimationFrame(h);
		}
		var k = Date.now(), l = false, m = d ? d.add(function () {
		  l = true;
		}) : function () {};
		e && e();
		h();
	  });
	}
	function hf(a) {
	  var b = a.opacity, c = a.maxHeight, d = a.scale, e = a.translate, f = a.duration, g = a.before, h = a.after;
	  return {play: function (k, l) {
		return gf({fb: Qd([b ? ef({od: "opacity", defaultValue: 1, element: k, kd: b}) : null, c ? ef({od: "max-height", defaultValue: 0, units: "px", element: k, kd: c}) : null, d || e ? ff(k, d, e) : null].filter(Na)), duration: f, Xa: l, before: g && function () {
		  return F(g)(k);
		}, after: h && function () {
		  return F(h)(k);
		}});
	  }};
	}
	;
	function jf(a, b, c) {
	  var d = b - a;
	  return function (e) {
		c && (e = c(e));
		return 1 <= e ? b : a + d * e;
	  };
	}
	function kf(a, b, c) {
	  var d = b[0] - a[0], e = b[1] - a[1];
	  return function (f) {
		c && (f = c(f));
		return 1 <= f ? b : [a[0] + d * f, a[1] + e * f];
	  };
	}
	;
	function lf(a) {
	  var b = U();
	  b.current = a;
	  return b;
	}
	;
	function mf(a, b) {
	  function c() {
		if (!e) {
		  var f = a.getBoundingClientRect();
		  if (Math.round(f.top) != Math.round(d.top) || Math.round(f.left) != Math.round(d.left) || f.width != d.width || f.height != d.height) d = f, b();
		  requestAnimationFrame(c);
		}
	  }
	  var d = a.getBoundingClientRect(), e = false;
	  requestAnimationFrame(c);
	  return function () {
		e = true;
	  };
	}
	;
	var nf = {};
	function of(a) {
	  var b = a.ea, c = a.nb, d = a.ne, e = a.show, f = a.Nb, g = a.Tb, h = U(null), k = U(null), l = re(function () {
		k.current && (k.current.parentElement == c && c.removeChild(k.current), k.current = null);
	  }, [c]), m = re(function () {
		l();
		h.current && c.removeChild(h.current);
	  }, [l, c]);
	  V(function () {
		return m;
	  }, [m]);
	  a = e ? d() : null;
	  var q = b(a);
	  oe(function () {
		h.current != q && (q ? (l(), q.style.position = "absolute", Ja(null == h.current), c.appendChild(q), f && f(q)) : h.current && (k.current = h.current, g ? g(h.current).then(l) : l()), h.current = q);
	  });
	  return h;
	}
	;
	function pf(a) {
	  var b = a.Ae, c = a.I, d = a.align, e = a.ff, f = a.Sd;
	  a = a.offset;
	  var g = b(a), h = Ue(c, g, e);
	  if (h) {
		c = We(c);
		var k = Te(Object.assign({}, f, {I: c})), l = b(k);
		Ue(c, l, e) < h && (f.I = c, a = k);
	  }
	  if (h = Ve(f.I, d, g, e)) {
		if ("center" == d) d = Xe(f.I, g, e); else a: switch (d) {
		  case "start":
			d = "end";
			break a;
		  case "center":
			throw Error();
		  case "end":
			d = "start";
			break a;
		  default:
			throw H(d), Error();
		}
		g = Te(Object.assign({}, f, {align: d}));
		b = b(g);
		Ve(f.I, d, b, e) < h && (f.align = d, a = g);
	  }
	  return a;
	}
	;
	function qf(a, b) {
	  a = a ? a.getBoundingClientRect() : {top: 0, right: document.body.scrollHeight - document.body.offsetHeight ? document.body.offsetWidth : window.innerWidth, bottom: document.body.offsetHeight, left: 0};
	  return {top: a.top + b.y, right: a.right + b.x, bottom: a.bottom + b.y, left: a.left + b.x};
	}
	function rf(a) {
	  function b(p) {
		var w = p.x + m.left + l.x;
		p = p.y + m.top + l.y;
		return {left: w, top: p, right: w + q.width, bottom: p + q.height};
	  }
	  var c = a.element, d = a.Ze, e = a.Se, f = a.I, g = a.align, h = a.ze, k = a.Vd, l = e ? {x: window.pageXOffset, y: window.pageYOffset} : {x: 0, y: 0};
	  a = qf(a.eh, l);
	  var m = c.getBoundingClientRect();
	  c = {width: m.width, height: m.height};
	  var q = {width: d.offsetWidth, height: d.offsetHeight};
	  d = h && h() || {x: 0, y: 0};
	  d = {dd: c, $e: q, I: f, align: g, offsetX: d.x, offsetY: d.y};
	  h = Te(d);
	  k && (h = pf({Ae: b, I: f, align: g, ff: a, Sd: d, offset: h}));
	  e && (h.x += m.left + l.x, h.y += m.top + l.y);
	  return h;
	}
	;
	function sf(a) {
	  var b = a.rf, c = a.Za, d = a.position, e = a.hf;
	  a = a.rc;
	  b.style.left = "0";
	  b.style.top = "0";
	  b.style.transform = "translateX(" + d.x + "px) translateY(" + d.y + "px)";
	  if (a = !a) a = b.getBoundingClientRect(), a = !(0 <= a.top && 0 <= a.left && a.bottom <= (window.innerHeight || document.documentElement.clientHeight) && a.right <= (window.innerWidth || document.documentElement.clientWidth));
	  if (a) return b.style.display = "none", e(false, 0), Promise.resolve();
	  c = d.y > c.current.getBoundingClientRect().top ? -5 : 5;
	  return hf({opacity: jf(0, 1), translate: kf([0, c], [0, 0]), duration: 150}).play(b);
	}
	function tf(a) {
	  var b = a.ea, c = a.Za, d = a.je, e = void 0 === a.show ? true : a.show, f = void 0 === a.$b ? false : a.$b, g = void 0 === a.I ? "top" : a.I, h = void 0 === a.align ? "center" : a.align, k = void 0 === a.offset ? {x: 0, y: 8} : a.offset, l = void 0 === a.Rd ? 500 : a.Rd, m = void 0 === a.De ? f ? 500 : 0 : a.De, q = void 0 === a.vc ? false : a.vc, p = void 0 === a.rc ? false : a.rc, w = U(null), v = U(null);
	  a = t(df());
	  var C = a.next().value, A = a.next().value;
	  V(function () {
		e || A(false, m);
	  }, [m, A, e]);
	  Ye(c, "mouseover", function () {
		return A(true, l);
	  });
	  Ye(c, "mouseout", function () {
		return A(false, m);
	  });
	  Ye(c, "click", function (n) {
		return q && n.preventDefault();
	  });
	  var u = of({ea: b, nb: nf.tooltip || document.body, ne: function () {
		return d;
	  }, show: e && C, Nb: function (n) {
		function x() {
		  return rf({element: c.current, Ze: n, I: g, align: h, Se: true, ze: function () {
			return k;
		  }, Vd: true});
		}
		w.current = mf(c.current, function () {
		  return A(false, 0);
		});
		return sf({Za: c, rf: n, position: x(), hf: A, rc: !!p}).then(function () {
		  v.current = new ResizeObserver(function () {
			var G = x();
			n.style.transform = "translateX(" + G.x + "px) translateY(" + G.y + "px)";
		  });
		  v.current.observe(n);
		});
	  }, Tb: function () {
		w.current && (w.current(), w.current = null);
		v.current && (v.current.disconnect(), v.current = null);
		return Promise.resolve();
	  }});
	  oe(function () {
		var n = u.current;
		if (f && n) {
		  n.addEventListener("mouseover", x);
		  n.addEventListener("mouseout", G);
		  return function () {
			n.removeEventListener("mouseover", x);
			n.removeEventListener("mouseout", G);
		  };
		}
	  });
	}
	;
	function uf(a) {
	  tf(Object.assign({}, a, {je: T(af, {type: "text", text: a.text, size: a.size, color: a.color})}));
	}
	;
	var vf = ["\n<div\n	class=", "\n	save-ref=", "\n	data-at=", "\n>\n	", "\n</div>"];
	vf.raw = vf.slice();
	function wf(a, b) {
	  var c = b.text, d = b.oc;
	  b = b.Ob;
	  var e = U();
	  var f = t(Se(e, ["string" == typeof c ? c : c.html])).next().value;
	  uf({ea: a, Za: e, text: c, show: !d && f});
	  return a(vf, "x31b75__text", e, Fe(b), c);
	}
	;
	function xf(a, b) {
	  if (!b.hasOwnProperty(a)) throw Error("getValueByCheckedKey(" + a + ")");
	  return b[a];
	}
	;
	function yf(a, b) {
	  var c = b.focused, d = b.Vg;
	  if (void 0 !== c && !(void 0 !== d)) throw Error("useFocusProps: `focused` requires `onFocusedChange`");
	  V(function () {
		if (void 0 !== c) {
		  var e = a.current, f = e === document.activeElement;
		  c && !f ? e.focus() : !c && f && e.blur();
		}
	  }, [c, a]);
	  Ye(a, "focus", function () {
		d && d(true);
	  });
	  Ye(a, "blur", function () {
		d && d(false);
	  });
	}
	;
	var zf = ["\n<svg\n	class=", '\n	viewBox="0 0 32 32"\n	xmlns="http://www.w3.org/2000/svg"\n>\n	<path\n		d="M30 16C30 23.732 23.732 30 16 30C8.26801 30 2 23.732 2 16C2 8.26801 8.26801 2 16 2"\n		stroke="currentColor"\n		stroke-width="2.5"\n		stroke-linecap="round"\n		fill="none"\n	/>\n</svg>\n'];
	zf.raw = zf.slice();
	;
	var Bf = ["\n<div class=", ">\n	", "\n</div>\n"];
	Bf.raw = Bf.slice();
	var Cf = ["\n<div class=", ">\n	", "\n</div>\n"];
	Cf.raw = Cf.slice();
	var Df = ["\n<div class=", ">\n	", "\n</div>\n"];
	Df.raw = Df.slice();
	var Ef = "\n<button\n	class= \n	disabled= \n	onclick= \n	save-ref= \n	data-at= \n>\n	 \n	 \n	 \n	 \n</button>\n".split(" ");
	Ef.raw = Ef.slice();
	var Ff = {button: {za: function (a) {
	  return D("xeba1a__button", a);
	}}, icon: "xeba1a__icon", text: "xeba1a__text", wa: "xeba1a__preloader"}, Gf = {button: {za: function (a) {
	  return D("x3e989__button", a);
	}}, icon: "x3e989__icon", text: "x3e989__text", wa: "x3e989__preloader"}, Hf = {button: {za: function (a) {
	  return D("x1ebbb__button", a);
	}}, text: "x1ebbb__text", icon: "x1ebbb__icon", wa: "x1ebbb__preloader"}, If = {button: {za: function (a) {
	  return D("xb6cd3__button", a);
	}}, icon: "xb6cd3__icon", text: "xb6cd3__text", wa: "xb6cd3__preloader"}, Jf = {button: {za: function (a) {
	  return D("x133d5__button", a);
	}}, text: "x133d5__text", icon: "x133d5__icon", wa: "x133d5__preloader"}, Kf = {button: {za: function (a) {
	  return D("x959fd__button", a);
	}}, text: "x959fd__text", icon: "x959fd__icon", wa: "x959fd__preloader"}, Lf = {button: {za: function (a) {
	  return D("x9131e__button", a);
	}}, text: "x9131e__text", icon: "x9131e__icon", wa: "x9131e__preloader"}, Mf = {button: {za: function (a) {
	  return D("x08261__button", a);
	}}, text: "x08261__text", icon: "x08261__icon", wa: "x08261__preloader"}, Nf = {button: {za: function (a) {
	  return D("xc515f__button", a);
	}}, text: "xc515f__text", icon: "xc515f__icon", wa: "xc515f__preloader"}, Of = {button: {za: function (a) {
	  return D("x2278a__button", a);
	}}, text: "x2278a__text", icon: "x2278a__icon", wa: "x2278a__preloader"};
	function Pf(a, b) {
	  var c = U(), d = void 0 === b.size ? "medium" : b.size, e = void 0 === b.state ? "default" : b.state, f = void 0 === b.minWidth ? true : b.minWidth, g = b.Ob, h = b.Wa, k = Qf(b), l = k.Ub, m = k.text, q = k.Vb;
	  a: switch (b.style) {
		case "link":
		case "linkInversed":
		case "linkSecondary":
		  k = b.fh || "default";
		  break a;
		case "primary":
		case "secondary":
		case "secondaryInversed":
		case "destructive":
		case "ghost":
		case "ghostInversed":
		case "complementary":
		  k = "default";
		  break a;
		default:
		  throw H(b), Error();
	  }
	  var p = "loading" == e, w = p || "disabled" == e, v = xf(b.style, {primary: Ff, secondary: Gf, destructive: If, ghost: Jf, ghostInversed: Kf, link: Lf, linkInversed: Mf, linkSecondary: Nf, complementary: Of, secondaryInversed: Hf});
	  d = Mb(D("xcc0a8__button", {size: d, spacing: "icon" == b.ya && "default" == k ? "icon" : k, "min-width": "icon" != b.ya && f, loading: p}), v.button.za({pressed: "pressed" == e}));
	  uf({ea: a, Za: c, show: !!h, text: "string" === typeof h ? h : "object" === typeof h ? h.text : "", size: "object" === typeof h ? h.size : void 0, color: "object" === typeof h ? h.color : void 0, I: "object" === typeof h ? h.I : void 0, align: "object" === typeof h ? h.align : void 0, offset: "object" === typeof h ? h.offset : void 0});
	  yf(c, b);
	  return a(Ef, d, w, function (C) {
		w || C.defaultPrevented || (C.preventDefault(), b.F && b.F());
	  }, c, Fe(g), a.K(Rf, function () {
		return !!l && {className: Mb("xcc0a8__icon", v.icon), Wa: h, icon: l};
	  }), a.K(Sf, function () {
		return !!m && {className: Mb("xcc0a8__text", v.text), text: m, oc: !!h};
	  }), a.K(Rf, function () {
		return !!q && {className: Mb("xcc0a8__icon", v.icon), icon: q};
	  }), a.K(Tf, function () {
		return p && {className: Mb("xcc0a8__preloader", v.wa), color: xf(b.style, {primary: "onColor", secondary: "subdued", destructive: "onColor", ghost: "subdued", ghostInversed: "onColor", link: "subdued", linkInversed: "onColor", linkSecondary: "subdued", complementary: "subdued", secondaryInversed: "onColor"})};
	  }));
	}
	function Qf(a) {
	  switch (a.ya) {
		case "icon":
		  return {Ub: a.icon, text: null, Vb: null};
		case "text":
		  return {Ub: null, text: a.text, Vb: null};
		case "iconAndText":
		  return {Ub: a.icon, text: a.text, Vb: null};
		case "textAndIcon":
		  return {Ub: null, text: a.text, Vb: a.icon};
		case "iconAndTextAndIcon":
		  return a;
		default:
		  throw H(a), Error();
	  }
	}
	;
	var Uf = ['\n<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m8 15 5-5-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>\n'];
	Uf.raw = Uf.slice();
	;
	function Wf(a, b) {
	  this.b = a;
	  this.f = void 0 === b ? null : b;
	}
	Wf.prototype.className = function () {
	  return this.f ? this.b + "__" + this.f : this.b;
	};
	function Zf(a, b) {
	  b = void 0 === b ? {} : b;
	  a = a.map(function (k) {
		return k instanceof Wf ? k : new Wf(k);
	  });
	  for (var c = a.map(function (k) {
		return k.className();
	  }), d = t(Object.keys(b)), e = d.next(); !e.done; e = d.next()) {
		e = e.value;
		for (var f = b[e], g = t(a), h = g.next(); !h.done; h = g.next()) h = h.value, null == f ? c.push(h.className() + "_" + e) : c.push(h.className() + "_" + e + "_" + f);
	  }
	  return c.join(" ");
	}
	;
	var $f = ["click"], ag = new Map, bg = new Map;
	function dg() {
	  if (ag.size) {
		for (var a = t(ag.keys()), b = a.next(); !b.done; b = a.next()) eg(b.value);
		ag.clear();
	  }
	  Fd(dg);
	}
	Fd(dg);
	function W(a) {
	  ag.set(a, true);
	}
	function X(a) {
	  var b = a.Ya, c = a.X;
	  c = void 0 === a.block ? c : a.block;
	  a = a.relatedData;
	  Nb.call(this);
	  this.Kb = [];
	  (b || c) && fg(this, F(b || c));
	  this.P = this.Lb = null;
	  this.Lc = a || this;
	  this.tb = {};
	  this.ac = this.ub = this.ma = this.m = null;
	  this.Fd = new Map;
	}
	z(X, Nb);
	r = X.prototype;
	r.D = function () {
	  ag.has(this) && eg(this);
	  if (this.ma) return this.ma;
	  eg(this);
	  return this.D();
	};
	function gg(a) {
	  a.ub || (a.ub = Ob(a));
	  return a.ub;
	}
	function Y(a, b, c) {
	  c ? "string" === typeof c ? a.tb[b] = c : c && (a.tb[b] = null) : delete a.tb[b];
	  W(a);
	}
	r.handleEvent = function (a) {
	  if (!a.defaultPrevented || !$f.includes(a.type)) {
		var b = this.m && this.m[a.type] || null;
		b && b.dispatch(a);
	  }
	};
	function Z(a, b) {
	  a = F(a.Kb[0]);
	  F(!a.f);
	  return new Wf(a.b, b);
	}
	function hg(a, b) {
	  fg(a, b, void 0);
	  W(a);
	}
	r.sd = function (a) {
	  this.ac = a;
	};
	function eg(a) {
	  ag.delete(a);
	  var b = a.W();
	  if (b != a.ma) {
		var c = a.ma;
		a.ma = b;
		c && (a.ac ? a.ac() : E("[" + a.constructor.name + "] component element was changed"));
	  }
	  a.ub && document.body.contains(a.ma) && a.ub.dispatch();
	}
	function ig(a, b) {
	  a.m || (a.m = {});
	  a.m[b] || (a.m[b] = Ob(a), W(a));
	  return a.m[b];
	}
	function jg(a, b) {
	  a = a.m && a.m[b] || null;
	  return !!a && 0 < (a.b ? vb(a.b).length : 0);
	}
	function fg(a, b, c) {
	  b instanceof Wf || (b = new Wf(b, c));
	  a.Kb.push(b);
	}
	function kg(a) {
	  return a.Kb ? Zf(a.Kb, a.tb) : "";
	}
	r.na = function (a, b) {
	  for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
	  return this.Rc.apply(this, ["", a].concat(y(c)));
	};
	function lg(a, b) {
	  a.P || (a.P = {});
	  a.P[b] || (a.P[b] = {});
	  return xe(a.Lc, b, a.Fd, a.P[b]);
	}
	function mg(a, b) {
	  bg.has(a) || bg.set(a, {});
	  var c = bg.get(a);
	  c[b] || (c[b] = function (d, e) {
		for (var f = [], g = 1; g < arguments.length; ++g) f[g - 1] = arguments[g];
		return "string" === typeof d ? mg(a, b + d) : a.Rc.apply(a, [b, d].concat(y(f)));
	  }, c[b].optional = function (d, e) {
		return e ? c[b](d) : cg;
	  });
	  return c[b];
	}
	function ng(a, b) {
	  if (a.P && a.P[b]) return F(a.P[b].current);
	  a.D();
	  return (a = a.Lb) && a[b] || null;
	}
	r.Rc = function (a, b, c) {
	  function d(h) {
		return h.map(function (k, l) {
		  if (k instanceof Wf) k = k.className(); else if (k instanceof wb) k = k.dispatch.bind(k); else if ("function" == typeof k) k = k.bind(g); else {
			if (k == g) return k.handleEvent.bind(g);
			if (k && k != g && "function" == typeof k.D) return "function" == typeof k.sd && k.sd(function () {
			  return eg(g);
			}), pb(g, k), k.D();
			if (Array.isArray(k)) return d(k);
		  }
		  if (b[l] && b[l].endsWith("passive-events=")) {
			l = t(Object.keys(k));
			for (var m = l.next(); !m.done; m = l.next()) m = m.value, "function" == typeof k[m] && (k[m] = k[m].bind(g));
		  }
		  return k;
		});
	  }
	  for (var e = [], f = 2; f < arguments.length; ++f) e[f - 2] = arguments[f];
	  var g = this;
	  e = d(e);
	  e = ue(this.Lc, a && ":" + a).apply(null, [b].concat(y(e)));
	  a && (this.Lb = this.Lb || {}, this.Lb[a] = e);
	  return e;
	};
	r.bc = function () {
	  ag.delete(this);
	  Nb.prototype.bc.call(this);
	};
	var og = String.fromCharCode(160), pg = String.fromCharCode(8203);
	String.fromCharCode(8805);
	String.fromCharCode(60);
	String.fromCharCode(37);
	function qg() {
	  this.b = {};
	}
	function rg(a, b) {
	  if (void 0 !== a.b[b]) return b + "_" + ++a.b[b];
	  a.b[b] = 0;
	  return b;
	}
	;
	function sg(a) {
	  var b = a.Ja, c = void 0 === a.wd ? "" : a.wd, d = a.Ya, e = a.Pb, f = void 0 === a.md ? "" : a.md, g = void 0 === a.placeholder ? "" : a.placeholder, h = void 0 === a.prompt ? "" : a.prompt;
	  a = a.Db;
	  this.b = b;
	  this.m = c;
	  this.Db = a;
	  this.s = !!h;
	  c = d || new Wf("paragraph-block");
	  d = c.className();
	  d += " " + (c.className() + "_" + "type" + "_" + this.type());
	  d += " " + (c.className() + "_" + "align" + "_" + this.textAlign());
	  e && (d += " " + (c.className() + "_" + "after" + "_" + e));
	  0 == this.b.B.length && (d += " " + (c.className() + "_" + (this.s ? "prompt" : "empty")));
	  this.f = d;
	  this.mb = ["subtitle"].includes(this.type());
	  this.G = ["header", "subheader"].includes(this.type());
	  this.O = ["blockquote", "pullquote"].includes(this.type());
	  this.g = f + b.key;
	  this.placeholder = h || g;
	}
	sg.prototype.Ja = function () {
	  return this.b;
	};
	sg.prototype.type = function () {
	  return this.b.key === this.m ? "subtitle" : this.b.N;
	};
	sg.prototype.textAlign = function () {
	  return this.b.textAlign;
	};
	sg.prototype.className = function () {
	  return this.f;
	};
	var tg = "\n		<p\n			class= \n			data-key= \n			data-placeholder= \n			data-at= \n			contenteditable= \n		> </p>".split(" ");
	tg.raw = tg.slice();
	var ug = "<li class=; data-key=; data-at=; contenteditable=;>;</li>".split(";");
	ug.raw = ug.slice();
	var vg = "<blockquote class=; data-key=; data-at=; contenteditable=;>;</blockquote>".split(";");
	vg.raw = vg.slice();
	var wg = ["<h4 class=", " data-key=", " contenteditable=", ">", "</h4>"];
	wg.raw = wg.slice();
	var xg = ["<h3 class=", " data-key=", " contenteditable=", ">", "</h3>"];
	xg.raw = xg.slice();
	var yg = ["<span>", "</span>"];
	yg.raw = yg.slice();
	var zg = ["\n		<a href=", " target=_blank onmouseover=", "><span style=", ">", "</span></a>"];
	zg.raw = zg.slice();
	var Ag = ["\n		<span style=", ">", "</span>"];
	Ag.raw = Ag.slice();
	var Bg = {};
	function Cg(a) {
	  Bg[a] || (Bg[a] = {});
	  return Bg[a];
	}
	function Dg(a, b, c) {
	  if (!a) return null;
	  var d = "", e = [], f = "", g = 1;
	  a.style.forEach(function (l) {
		switch (l.name) {
		  case "bold":
			d += "font-weight: " + (c ? "normal" : "bold") + ";";
			break;
		  case "italic":
			d += "font-style: " + (b ? "normal" : "italic") + ";";
			break;
		  case "underline":
			e.push("underline");
			break;
		  case "strikethrough":
			e.push("line-through");
			break;
		  case "fontSize":
			d += "font-size: " + l.size + "px;";
			l = l.size;
			var m = 739 >= window.innerWidth;
			d += "line-height: " + (15 >= l ? "1.5" : 18 >= l ? m ? "2" : "1.9" : 21 >= l && m ? "1.7" : 23 >= l && !m ? "1.75" : "normal") + ";";
			break;
		  case "fontColor":
			d += "color: " + l.color + ";";
			break;
		  case "textHighlightColor":
			f = l.color;
			break;
		  case "textHighlightOpacity":
			g = l.opacity;
			break;
		  default:
			H(l);
		}
	  });
	  e.length && (d += "text-decoration: " + e.join(" ") + ";");
	  if (f && "noColor" !== f) {
		var h = t(Sb(f));
		a = h.next().value;
		var k = h.next().value;
		h = h.next().value;
		d += "background-color: rgba(" + a + ", " + k + ", " + h + ", " + g + ");";
	  }
	  return d;
	}
	function Eg(a) {
	  var b = a.ga;
	  return a.mb ? nc({url: b.url}) : b;
	}
	function Fg(a) {
	  var b = a.B;
	  a = a.mb;
	  if (0 == b.length) return [];
	  for (var c = [{text: b[0].text, ga: Eg({ga: b[0].sa, mb: a})}], d = 1; d < b.length; ++d) {
		var e = b[d], f = Eg({ga: e.sa, mb: a}), g = c.length - 1;
		oc(f, c[g].ga) ? c[g].text += e.text : c.push({text: e.text, ga: f});
	  }
	  return c;
	}
	function Gg(a, b, c, d) {
	  c = void 0 === c ? false : c;
	  d = void 0 === d ? false : d;
	  var e = a.Ja(), f = Fg({B: e.B, mb: a.mb}), g = [], h = new qg, k = false, l = Cg(e.key);
	  f.forEach(function (A, u) {
		var n = Dg(A.ga, a.O, a.G), x = rg(h, e.key + "_" + A.text + "_" + n), G = A.text;
		u == f.length - 1 && G.endsWith("\n") && (G += pg);
		n = (A = A.ga.url) ? ue(l, ":" + x)(zg, A, b, n, G) : ue(l, ":" + x)(Ag, n, G);
		A && (k = true);
		g.push(n);
	  });
	  g.length ? k && delete Bg[e.key] : g.push(ue()(yg, pg));
	  var m = "enter-blockquote-field-" + a.Db, q = "enter-list-item-field-" + a.Db, p = "enter-paragraph-field-" + a.Db, w = ue(l, ":" + a.g), v = d ? " lock-block" : "", C = c ? " read-only-block" : "";
	  v = a.className() + v + C;
	  c = !d && !c;
	  switch (e.N) {
		case "header":
		  return w(xg, v, e.key, c, g);
		case "subheader":
		  return w(wg, v, e.key, c, g);
		case "blockquote":
		case "pullquote":
		  return w(vg, v, e.key, Fe(m), c, g);
		case "ol":
		case "ul":
		  return w(ug, v, e.key, Fe(q), c, g);
	  }
	  return w(tg, v, e.key, d ? null : a.placeholder, Fe(p), c, g);
	}
	;
	var Hg = ["\n			<div class=", "></div>"];
	Hg.raw = Hg.slice();
	var Ig = ["<ol class='list-block' style=", ">", "</ol>"];
	Ig.raw = Ig.slice();
	var Jg = ["<ul class='list-block' data-at=", ">", "</ul>"];
	Jg.raw = Jg.slice();
	function Kg(a, b) {
	  this.type = a;
	  this.b = [];
	  this.f = b;
	}
	function Lg() {
	  X.call(this, {X: "rich-text-editor"});
	  this.f = {};
	  this.l = false;
	  this.h = this.b = null;
	  this.S = Ob(this);
	}
	z(Lg, X);
	function Mg(a, b) {
	  a.f.E = b;
	}
	function Ng(a) {
	  return a.b.filter(function () {
		return true;
	  }).reduce(function (b, c) {
		return b + "-" + c.key;
	  }, "");
	}
	Lg.prototype.C = function () {
	  return false;
	};
	function Og(a, b, c) {
	  var d = uc(b);
	  if (d) return a.l ? (b = a.g.T, b = (b = uc(F(0 >= b.order.length ? null : b.A[b.order[0]]))) && "subheader" === b.N ? b.key : "") : b = "", c = new sg({wd: b, Ja: d, Pb: a.b, placeholder: "", prompt: "", Db: c}), a.b = c.type(), a.h && (Y(a.h, "before", c.type()), a.h = null), Gg(c, zb(a.S), false, a.C());
	  c = (0, a.f[b.type])(b, a.b, zb(a.S), false, a.C());
	  if (d = !b || "e" !== b.type && "i" !== b.type && "c" !== b.type ? null : b) "float-left" === d.w ? a.h = c : a.b = "c" === d.type ? "collage-" + d.w : "media-" + d.w;
	  b && "E" === b.type && b && (a.b = "exercise");
	  b && "a" === b.type && b && (a.b = "attachment");
	  b && "c" === b.type && b && (a.b = "collage");
	  return c.D();
	}
	function Pg(a) {
	  var b = [], c = null;
	  tc(a.g.T, function (d) {
		var e = uc(d);
		if (e && vc.includes(e.N)) {
		  e = F(uc(d));
		  c && c.type !== e.N && (b.push(c), c = null);
		  var f = "ol" === e.N && !!e.bb;
		  if (!c || f) c && b.push(c), c = new Kg(e.N, f);
		  c.b.push(d);
		} else c && (b.push(c), c = null), b.push(d);
	  });
	  c && b.push(c);
	  return b;
	}
	function Qg(a, b, c) {
	  var d = "enter-paragraph-field-" + c;
	  if (b instanceof Kg) {
		c = b.b.map(function (f, g) {
		  return Og(a, f, g);
		});
		var e = ue({}, Ng(b));
		return "ul" === b.type ? e(Jg, Fe(d), c) : e(Ig, b.f ? {"counter-reset": "li 0"} : null, c);
	  }
	  return Og(a, b, c);
	}
	function Rg(a) {
	  a.b = "none";
	  return Pg(a).map(function (b, c) {
		return Qg(a, b, c);
	  });
	}
	;
	var Sg = ["\n			<div class=", ">\n				", "\n			</div>"];
	Sg.raw = Sg.slice();
	function Tg(a) {
	  Lg.call(this);
	  this.g = a;
	}
	z(Tg, Lg);
	Tg.prototype.C = function () {
	  return true;
	};
	Tg.prototype.W = function () {
	  return this.na(Sg, kg(this), Rg(this));
	};
	function Ug(a) {
	  !a.length || a.startsWith("data:") || a.startsWith("blob:");
	  return a;
	}
	;
	function Vg(a) {
	  var b = Math.max(0, Math.round(a / 1073741824 * 10) / 10);
	  if (1 < b) return I("Common.FileSize.ToGb", {volume: b});
	  b = Math.max(0, Math.round(a / 1048576 * 10) / 10);
	  return 1 < b ? I("Common.FileSize.ToMb", {volume: b}) : I("Common.FileSize.ToKb", {volume: Math.max(0, Math.round(a / 1024))});
	}
	;
	function Wg(a, b) {
	  var c = b.pa, d = b.Oa, e = b.size, f = b.color, g = b.$b, h = b.show, k = b.I, l = b.align;
	  b = b.vc;
	  var m = U();
	  uf({ea: a, Za: m, text: d, size: e, color: f, $b: g, show: h, I: k, align: l, vc: b});
	  return ze(a, c, m);
	}
	;
	var Xg = ["\n<div class=", ">\n	", "\n</div>"];
	Xg.raw = Xg.slice();
	;
	var Zg = ['\n<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39 45.375H9A2.375 2.375 0 0 1 6.625 43V5A2.375 2.375 0 0 1 9 2.625h21.28c.647 0 1.267.264 1.715.731l8.72 9.093c.423.442.66 1.031.66 1.644V43A2.375 2.375 0 0 1 39 45.375z" fill="#fff" stroke="#D0D0D1" stroke-width="1.25"/><path d="M30.841 31.182V19.068h1.803c.61 0 1.106.495 1.106 1.106v9.902c0 .61-.495 1.106-1.106 1.106H30.84zM14.25 17.68v15.166L28.773 34.5V15.75L14.25 17.68z" fill="#4169B4"/><path d="m23.61 27.043 1.118-6.117h1.705l-1.842 8.597H22.87l-1.352-5.751-1.351 5.75h-1.723l-1.842-8.596h1.705l1.124 6.105 1.369-6.105h1.448l1.363 6.117z" fill="#fff"/></svg>\n'];
	Zg.raw = Zg.slice();
	;
	var ah = ['\n<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39 45.375H9A2.375 2.375 0 0 1 6.625 43V5A2.375 2.375 0 0 1 9 2.625h21.28c.647 0 1.267.264 1.715.731l8.72 9.093c.423.442.66 1.031.66 1.644V43A2.375 2.375 0 0 1 39 45.375z" fill="#fff" stroke="#D0D0D1" stroke-width="1.25"/><path d="M14.658 26.355v2.895h-2.056v-8.531h3.404c.652 0 1.228.12 1.728.363.504.238.893.58 1.166 1.025.278.442.416.944.416 1.506 0 .832-.299 1.498-.896 1.998-.594.496-1.41.744-2.45.744h-1.312zm0-1.587h1.348c.398 0 .701-.1.908-.3.21-.198.316-.48.316-.843 0-.398-.107-.717-.322-.955-.215-.238-.508-.36-.879-.363h-1.37v2.46zM21.018 29.25v-8.531h2.748c.754 0 1.432.172 2.033.515a3.56 3.56 0 0 1 1.406 1.448c.34.62.512 1.318.516 2.091v.393c0 .781-.166 1.482-.498 2.104a3.619 3.619 0 0 1-1.395 1.453 3.956 3.956 0 0 1-2.003.527h-2.807zm2.056-6.943v5.361h.715c.59 0 1.043-.209 1.36-.627.316-.422.474-1.047.474-1.875v-.37c0-.823-.158-1.444-.474-1.862-.317-.418-.778-.627-1.383-.627h-.691zM34.749 25.852h-3.317v3.398h-2.056v-8.531h5.707v1.588h-3.65v1.963h3.316v1.582z" fill="#E05D36"/></svg>\n'];
	ah.raw = ah.slice();
	;
	var ch = ['\n<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39 45.375H9A2.375 2.375 0 0 1 6.625 43V5A2.375 2.375 0 0 1 9 2.625h21.28c.647 0 1.267.264 1.715.731l8.72 9.093c.423.442.66 1.031.66 1.644V43A2.375 2.375 0 0 1 39 45.375z" fill="#fff" stroke="#D0D0D1" stroke-width="1.25"/><path d="M30.5 31.25V19h1.75a1.5 1.5 0 0 1 1.5 1.5v9.25a1.5 1.5 0 0 1-1.5 1.5H30.5zM14.25 17.68v15.166L28.875 34.5V15.75L14.25 17.68z" fill="#D1684D"/><path d="M20.49 26.523v3.102h-1.746V20.82h3.305c.636 0 1.194.12 1.675.363a2.6 2.6 0 0 1 1.118 1.034c.26.443.39.95.39 1.518 0 .862-.286 1.544-.856 2.044-.566.496-1.352.744-2.357.744h-1.53zm0-1.47h1.559c.461 0 .812-.113 1.053-.339.244-.226.366-.548.366-.967 0-.432-.122-.78-.366-1.046-.245-.267-.582-.404-1.013-.412h-1.6v2.764z" fill="#fff"/></svg>\n'];
	ch.raw = ch.slice();
	;
	var eh = ['\n<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39 45.375H9A2.375 2.375 0 0 1 6.625 43V5A2.375 2.375 0 0 1 9 2.625h21.28c.647 0 1.267.264 1.715.731l8.72 9.093c.423.442.66 1.031.66 1.644V43A2.375 2.375 0 0 1 39 45.375z" fill="#fff" stroke="#D0D0D1" stroke-width="1.25"/></svg>\n'];
	eh.raw = eh.slice();
	;
	var gh = ['\n<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39 45.375H9A2.375 2.375 0 0 1 6.625 43V5A2.375 2.375 0 0 1 9 2.625h21.28c.647 0 1.267.264 1.715.731l8.72 9.093c.423.442.66 1.031.66 1.644V43A2.375 2.375 0 0 1 39 45.375z" fill="#fff" stroke="#D0D0D1" stroke-width="1.25"/><path d="M30.5 31.25V19h1.75a1.5 1.5 0 0 1 1.5 1.5v9.25a1.5 1.5 0 0 1-1.5 1.5H30.5zM14.25 17.68v15.166L28.875 34.5V15.75L14.25 17.68z" fill="#468B5B"/><path d="m21.563 23.855 1.588-3.035h2.007l-2.467 4.366 2.531 4.439h-2.03l-1.63-3.084-1.629 3.084h-2.03l2.53-4.439-2.466-4.366h2.007l1.588 3.035z" fill="#fff"/></svg>\n'];
	gh.raw = gh.slice();
	;
	var ih = ['\n<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m6.293 10.707 3 3a1 1 0 0 0 1.414 0l3-3a1 1 0 0 0-1.414-1.414L11 10.586V3a1 1 0 1 0-2 0v7.586L7.707 9.293a1 1 0 0 0-1.414 1.414zM5 15a1 1 0 1 0-2 0v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 1 0-2 0v1H5v-1z" fill="currentColor"/></svg>\n'];
	ih.raw = ih.slice();
	;
	var kh = ['\n<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.654 5.02a6 6 0 0 1 8.6 2.08l-.432-.173a1 1 0 0 0-.744 1.857l2.625 1.052a1 1 0 0 0 1.3-.556l1.052-2.626A1 1 0 0 0 17.2 5.91l-.134.335a8 8 0 0 0-14.533.889 1 1 0 1 0 1.867.716 6 6 0 0 1 2.255-2.83zm6.693 10.07a6 6 0 0 1-8.583-2.05l.335.162a1 1 0 0 0 .873-1.8l-2.545-1.235a1 1 0 0 0-1.336.463L.856 13.175a1 1 0 1 0 1.8.873l.181-.375a8 8 0 0 0 14.632-.696 1 1 0 1 0-1.868-.717 6 6 0 0 1-2.255 2.83z" fill="currentColor"/></svg>\n'];
	kh.raw = kh.slice();
	;
	var mh = "\n<div\n	class=;\n	save-ref=;\n	draggable=true\n>\n	;\n	<div class=;>\n		<div class=;>\n			<div class=;>\n				;\n			</div>\n			<div class=;>;</div>\n		</div>\n		;\n		;\n	</div>\n</div>".split(";");
	mh.raw = mh.slice();
	var nh = ["\n<img class=", ' aria-hidden=true src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />'];
	nh.raw = nh.slice();
	var oh = ["\n<div class=", ">\n	", "\n</div>"];
	oh.raw = oh.slice();
	var ph = ["\n<div class=", ">\n	", "\n	", "\n</div>"];
	ph.raw = ph.slice();
	function qh(a, b) {
	  var c = b.disabled, d = b.nd;
	  b = b.xc;
	  return a(ph, "x99dbb__attachment-buttons", a.K(Wg, function () {
		return d && {pa: T(Pf, {state: c ? "disabled" : "default", style: "linkSecondary", ya: "icon", icon: T(lh), size: "small", F: d}), Oa: I("Roll.Editor.AttachmentBlock.UpdateButtonTooltip")};
	  }), a(Wg, {pa: T(Pf, {state: c ? "disabled" : "default", style: "linkSecondary", ya: "icon", icon: T(jh), size: "small", F: b}), Oa: I("Roll.Editor.AttachmentBlock.DownloadButtonTooltip")}));
	}
	function rh(a, b) {
	  var c = b.ve;
	  return a(oh, "x99dbb__attachment-icon", a.Na(function () {
		switch (c) {
		  case "doc":
		  case "docx":
			return T($g, {});
		  case "ppt":
		  case "pptx":
			return T(dh, {});
		  case "xls":
		  case "xlsx":
			return T(hh, {});
		  case "pdf":
			return T(bh, {});
		  default:
			return T(fh, {});
		}
	  }));
	}
	function th(a, b) {
	  var c = b.fileName, d = b.fileSize, e = b.lb, f = b.uc, g = b.Qe, h = b.disabled, k = b.nd, l = b.xc;
	  b = U();
	  Ye(b, "click", function () {
		g && l();
	  });
	  return a(mh, D("x99dbb__attachment-block", {clickable: g, lock: !!h}), b, a.Na(function () {
		return f ? T(Yg, {size: "medium"}, "x99dbb__attachment-icon") : T(rh, {ve: e});
	  }), D("x99dbb__attachment-subblock", {uploading: f}), "x99dbb__attachment-info", "x99dbb__attachment-name", c, "x99dbb__attachment-size", Vg(d), a(qh, {disabled: !!h, nd: k, xc: g ? function () {} : l}), a.K(sh, function () {
		return !g && !f;
	  }));
	}
	;
	var uh = ["\n<figure class=", ">\n	", "\n</figure>"];
	uh.raw = uh.slice();
	var vh = {}, wh = {};
	function xh(a) {
	  a = a.block;
	  X.call(this, {X: "attachment-block"});
	  this.b = a;
	}
	z(xh, X);
	xh.prototype.W = function () {
	  var a = this.b, b = a.src, c = a.fileName;
	  a = xe(wh, ":attachment-block-" + a.key);
	  return a(uh, Mb(kg(this), D("x99dbb__attachment-figure", {playerView: true})), a(th, Object.assign({}, this.b, {Qe: true, xc: function () {
		var d = document.createElement("a");
		d.setAttribute("href", Ug(F(b)));
		d.setAttribute("download", c);
		d.click();
	  }})));
	};
	function yh(a, b) {
	  var c;
	  if (vh[a.key]) {
		var d = c = vh[a.key];
		d.b !== a && (d.b = a, W(d));
	  } else c = new xh({block: a}), vh[a.key] = c;
	  Y(c, "after", b);
	  return c;
	}
	;
	var zh = {top: 0, right: 0, bottom: 0, left: 0};
	function Ah(a) {
	  var b = a.width, c = a.height, d = a.U;
	  return {src: a.src, U: d ? d : Object.assign({}, zh), width: d ? b - d.left - d.right : b, height: d ? c - d.top - d.bottom : c};
	}
	function Bh(a) {
	  var b = a.width, c = a.height;
	  a = Ah(a);
	  var d = b - a.width, e = c - a.height;
	  return {width: b / a.width * 100, height: c / a.height * 100, positionX: 0 === d ? 0 : a.U.left / b * (b / d) * 100, positionY: 0 === e ? 0 : a.U.top / c * (c / e) * 100};
	}
	;
	var Ch = ["\n<div\n	class=", "\n	style=", "\n	ondisconnected=", "\n>\n	", "\n</div>"];
	Ch.raw = Ch.slice();
	function Dh(a) {
	  X.call(this, {Ya: a.Ya, X: a.X, block: a.block, relatedData: a.relatedData});
	  this.b = false;
	  this.Aa = this.Pa = this.g = this.f = null;
	}
	z(Dh, X);
	r = Dh.prototype;
	r.show = function () {
	  this.b && (this.b = false, W(this));
	};
	r.Fa = function () {
	  this.b || (this.b = true, W(this));
	};
	r.visible = function () {
	  return !this.b;
	};
	r.x = function () {
	  return this.f;
	};
	r.y = function () {
	  return this.g;
	};
	r.move = function (a, b) {
	  if (a != this.f || b != this.g) this.f = a, this.g = b, W(this);
	};
	function Eh(a) {
	  var b = {display: a.b ? "none" : ""};
	  null != a.f && (b.left = a.f);
	  null != a.g && (b.top = a.g);
	  null != a.Pa && (b.width = a.Pa);
	  null != a.Aa && (b.height = a.Aa);
	  return b;
	}
	r.W = function () {
	  return this.na(Ch, kg(this), Eh(this), this, "");
	};
	var Fh = '\n			<input\n				class=;\n				style=;\n				type="file" accept=;\n				onchange=;\n				data-at=;\n			>'.split(";");
	Fh.raw = Fh.slice();
	var Gh = ['\n<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1zm1 3a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2H3z" fill="currentColor"/></svg>\n'];
	Gh.raw = Gh.slice();
	var Hh = ["\n<div class=", ' draggable="true">\n	', "\n</div>"];
	Hh.raw = Hh.slice();
	var Ih = ["\n<div class=", ">\n	", "\n</div>\n"];
	Ih.raw = Ih.slice();
	var Jh = ["\n<div class=", ">\n	", "\n</div>\n"];
	Jh.raw = Jh.slice();
	var Kh = ['\n<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m9 4-6 6m0 0 6 6m-6-6h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>\n'];
	Kh.raw = Kh.slice();
	var Lh = ['\n<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m11 4 6 6m0 0-6 6m6-6H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>\n'];
	Lh.raw = Lh.slice();
	var Mh = ['\n<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 2a1 1 0 0 0-2 0v2H2a1 1 0 0 0 0 2h2v8a2 2 0 0 0 2 2h8v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2H6V2zm3 2a1 1 0 0 0 0 2h5v5a1 1 0 1 0 2 0V6a2 2 0 0 0-2-2H9z" fill="currentColor"/></svg>\n'];
	Mh.raw = Mh.slice();
	var Nh = ['\n<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.697 1.875 13.212 1l-.875.485-2.474 1.372a1 1 0 1 0 .97 1.749l.315-.175a4.497 4.497 0 0 0 3.215 5.497 4.5 4.5 0 0 0 3.102-8.402 1 1 0 0 0-.873 1.8 2.5 2.5 0 1 1-3.501 1.581l.228.411a1 1 0 1 0 1.749-.97l-1.371-2.473zM0 6a2 2 0 0 1 2-2h5a1 1 0 0 1 0 2H2v11h13v-3a1 1 0 1 1 2 0v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6zm3.5 4.517a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0zm8.945.864a1 1 0 0 0-1.307-.093L8.5 13.268l-1.178-.588a1 1 0 0 0-.96.038L3.5 14.434v1.333h10v-3.331l-1.055-1.055z" fill="currentColor"/></svg>\n'];
	Nh.raw = Nh.slice();
	var Oh = ['\n<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1H8zM6 4H3a1 1 0 0 0 0 2v10a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6a1 1 0 1 0 0-2h-3a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3zm9 12V6H5v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1zm-7-1a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v5a1 1 0 0 1-1 1zm3-1a1 1 0 1 0 2 0V9a1 1 0 1 0-2 0v5z" fill="currentColor"/></svg>\n'];
	Oh.raw = Oh.slice();
	var Ph = "\n<div class=;>\n	<div class=;></div>\n	<div class=;></div>\n	;\n	;\n</div>".split(";");
	Ph.raw = Ph.slice();
	var Qh = ["\n<div class=", ">\n	", "\n	", "\n</div>"];
	Qh.raw = Qh.slice();
	function Rh(a) {
	  var b = a.block;
	  a = a.ib;
	  X.call(this, {X: "media-block"});
	  this.b = b;
	  this.Ba = a;
	  this.hb = new Wf("media-block", "wrapper").className();
	  this.Aa = new Wf("media-block", "content").className();
	  this.Pa = new Wf("media-block", "placeholder").className();
	  this.g = 0;
	  this.f(b);
	}
	z(Rh, X);
	Rh.prototype.f = function (a) {
	  this.b = a;
	  Y(this, "align", this.b.w);
	};
	Rh.prototype.Ca = function (a) {
	  this.g = a;
	  W(this);
	};
	Rh.prototype.C = function () {
	  return 740 >= document.body.clientWidth || "float-left" !== this.b.w || "e" === this.b.type ? null : {width: this.b.width + "px"};
	};
	Rh.prototype.S = function () {
	  return this.b.width ? {"padding-bottom": 100 * (this.g ? this.g : this.b.height / this.b.width) + "%"} : {width: "100%", height: this.b.height + "px"};
	};
	var Sh = '\n<figure\n	class=;\n	style=;\n	data-key=;\n	contenteditable="false"\n	tabindex="-1"\n	onkeydown=;\n	onmousedown=;\n	onblur=;\n>\n	;\n	<div class=; style=; draggable=true>\n		;\n		<div class=; style=;></div>\n	</div>\n	<figcaption\n		save-ref=;\n		class="caption-wrapper"\n		style=;\n		contenteditable=;\n	>\n		;\n	</figcaption>\n</figure>'.split(";");
	Sh.raw = Sh.slice();
	var Th = '\n<figure\n	class=;\n	style=;\n	data-collaged-key=;\n	data-parent-collage-key=;\n	contenteditable="false"\n	onkeydown=;\n	onmousedown=;\n	onblur=;\n>\n	<div class=; style=; draggable=true>\n		;\n		<div class=; style=;></div>\n		;\n	</div>\n	<figcaption\n		save-ref=;\n		class="caption-wrapper"\n		style=;\n		contenteditable=;\n	>\n		;\n	</figcaption>\n</figure>'.split(";");
	Th.raw = Th.slice();
	function Uh(a, b, c) {
	  var d = t(me(1)), e = d.next().value, f = d.next().value, g = qe(function () {
		return Ah(a);
	  }, [a]);
	  V(function () {
		if (b.current) {
		  var h = b.current, k = g.width / (c ? c.width : h.clientWidth);
		  h = g.height / (c ? c.height : h.clientHeight);
		  1 < k || 1 < h ? f(Math.max(k, h)) : f(1);
		}
	  }, [b, g, c]);
	  return e;
	}
	;
	var Vh = ["\n<div\n	class=", "\n	save-ref=", "\n>\n	", "\n</div>\n"];
	Vh.raw = Vh.slice();
	var Wh = ["\n<div\n	class=", "\n	style=", "\n	onclick=", "\n>\n	", "\n</div>\n"];
	Wh.raw = Wh.slice();
	var Xh = ["\n<img\n	class=", '\n	src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="\n	tabIndex="-1"\n	aria-hidden=true\n	draggable=false\n/>\n'];
	Xh.raw = Xh.slice();
	function Zh(a, b) {
	  var c = b.image, d = b.Gc, e = b.width, f = b.height, g = b.F;
	  b = b.Dd;
	  var h = Bh(c);
	  e = e && f ? "width: " + e + "px; height: " + f + "px;" : "";
	  return a(Wh, D("x9c461__image", {withZoom: !!b}), "\n	    " + e + "\n		background: url(" + Ug(c.src) + ") no-repeat;\n		background-size: " + h.width + "% " + h.height + "%;\n		background-position: " + h.positionX + "% " + h.positionY + "%;", g, a.K(Yh, function () {
		return d;
	  }));
	}
	function $h(a, b) {
	  var c = b.image, d = b.tf, e = b.Gc, f = b.Dd, g = b.ke, h = b.Pf, k = void 0 === b.className ? "" : b.className;
	  b = b.F;
	  var l = U(), m = qe(function () {
		return Ah(c);
	  }, [c]);
	  g = Uh(c, g ? g : l, h);
	  return a(Vh, k + " " + D("x9c461__image-container", {fill: !d, origin: !!d}), l, a(Zh, {image: c, Dd: f, Gc: e, width: d ? m.width / g : void 0, height: d ? m.height / g : void 0, F: b}));
	}
	function ai(a, b) {
	  var c = Object.assign({}, b), d = b.image;
	  b = (delete c.image, c);
	  c = qe(function () {
		return Object.assign({}, d, {U: d.U ? d.U : Object.assign({}, zh)});
	  }, [d]);
	  return ze(a, T($h, Object.assign({}, b, {image: c})));
	}
	;
	function bi(a, b) {
	  var c = lf(b);
	  oe(function () {
		var d = a instanceof Element ? a : a && a.current;
		if (d) {
		  var e = new ResizeObserver(function (f) {
			f = t(f).next().value;
			c.current && c.current(f.contentRect);
		  });
		  e.observe(d);
		  return function () {
			e.disconnect();
		  };
		}
	  }, [a, c]);
	}
	;
	function ci() {
	  var a = t(me(true));
	  a.next();
	  var b = a.next().value;
	  return re(function () {
		return b(function (c) {
		  return !c;
		});
	  }, []);
	}
	;
	function di() {
	  var a = [];
	  return {add: function (b) {
		a.push(b);
		return function () {
		  var c = a.indexOf(b);
		  0 <= c && a.splice(c, 1);
		};
	  }, dispatch: function (b) {
		for (var c = t(a), d = c.next(); !d.done; d = c.next()) d = d.value, d(b);
	  }};
	}
	;
	function ei(a) {
	  var b = a.Xa, c = a.Zc, d = a.element, e = a.Vc, f = a.eb;
	  b.dispatch();
	  c && c(d).play(d, b).then(function () {
		e.current = null;
		f();
	  });
	}
	function fi(a) {
	  var b = a.element, c = a.Wc, d = a.Nb;
	  a = a.Tb;
	  var e = pe(b), f = ci(), g = U(di()), h = U(null), k = U(null), l = lf(d), m = lf(a);
	  b !== e && (d && b && (h.current = b), c && b && c(b), a && !b && (k.current = e));
	  V(function () {
		if (b) {
		  var q = g.current, p = m.current;
		  ei({element: b, eb: f, Xa: q, Zc: l.current, Vc: h});
		  return function () {
			return ei({element: F(b), eb: f, Xa: q, Zc: p, Vc: k});
		  };
		}
	  }, [b, l, m, f]);
	  return k.current || h.current;
	}
	;
	function gi(a) {
	  var b = a.nb, c = a.element, d = a.We;
	  a = a.If;
	  var e = U(null), f = nf[b] || document.body, g = re(function () {
		var h = e.current;
		h && (F(h.parentElement == f, 'useExternalLayer(): layer "' + b + "\" doesn't contain element"), f.removeChild(h), e.current = null);
	  }, [e, b, f]);
	  oe(function () {
		return g;
	  }, [g]);
	  c != e.current && (g(), c && (a && a(c), c.style.position = "absolute", f.appendChild(c), d && d(c)), e.current = c);
	}
	;
	function hi(a) {
	  return 40 >= a ? 40 : 220 * Math.pow(a - 40 + 1, 0.146);
	}
	function ii(a, b) {
	  switch (a) {
		case "center":
		  return {duration: 220, Ab: [0, 40], vb: [0, 0], opacity: [0, 1]};
		case "right":
		  return {duration: hi(b.getBoundingClientRect().width), Ab: [b.getBoundingClientRect().width, 0], vb: [0, 0]};
		case "bottom":
		  return {duration: hi(b.getBoundingClientRect().height), Ab: [0, b.getBoundingClientRect().height], vb: [0, 0]};
		case "left":
		  return {duration: hi(b.getBoundingClientRect().width), Ab: [-b.getBoundingClientRect().width, 0], vb: [0, 0]};
		default:
		  throw H(a), Error();
	  }
	}
	function ji(a) {
	  var b = a.Ad, c = a.zd, d = a.opacity, e = a.after;
	  return hf({duration: a.duration, opacity: d ? jf(d[0], d[1], Ld) : void 0, translate: kf(b, c, Ld), after: function (f) {
		f.style.pointerEvents = "";
		f.style.transform = "";
		d && (f.style.opacity = d[1].toString());
		e && e();
	  }, before: function (f) {
		f.style.pointerEvents = "none";
		f.style.opacity = d ? d[0].toString() : "";
	  }});
	}
	;
	var ki = ["\n<div\n	class=", "\n	onclick=", "\n>\n</div>"];
	ki.raw = ki.slice();
	function li(a, b) {
	  var c = b.F;
	  return a(ki, D("xd16ae__layer", {type: b.type}), c);
	}
	;
	var mi = hf({opacity: jf(0, 1), duration: 200, after: function (a) {
	  a.style.opacity = "1";
	}}), ni = hf({opacity: jf(1, 0), duration: 200, after: function (a) {
	  a.style.opacity = "0";
	}});
	function oi(a) {
	  var b = a.nb, c = a.af, d = a.ea.K(li, function () {
		return c;
	  });
	  a = fi({element: d, Nb: function () {
		return mi;
	  }, Tb: function () {
		return ni;
	  }, Wc: function (e) {
		e.style.opacity = "0";
	  }});
	  gi({nb: b, element: d || a});
	  oe(function () {
		if (d) {
		  var e = nf[b] || document.body, f = e.style.pointerEvents;
		  e.style.pointerEvents = "auto";
		  return function () {
			e.style.pointerEvents = f;
		  };
		}
	  }, [d, b]);
	}
	;
	function pi(a, b) {
	  switch (a) {
		case "center":
		  return {left: Math.round(0.5 * (window.innerWidth - b.clientWidth)), top: Math.round(0.5 * (window.innerHeight - b.clientHeight))};
		case "right":
		  return {top: 0, bottom: 0, right: 0};
		case "bottom":
		  return {bottom: 0, left: 0, right: 0};
		case "left":
		  return {top: 0, bottom: 0, left: 0};
		default:
		  throw H(a), Error();
	  }
	}
	function qi(a, b) {
	  function c(g) {
		return void 0 !== g ? g + "px" : "";
	  }
	  a = pi(a, b);
	  var d = a.left, e = a.bottom, f = a.right;
	  b.style.top = c(a.top);
	  b.style.right = c(f);
	  b.style.bottom = c(e);
	  b.style.left = c(d);
	}
	;
	var ri = new Map;
	function si(a) {
	  var b = a.type, c = a.element, d = a.qb;
	  a = U(null);
	  var e = ci(), f = qe(function () {
		ri.has(b) || ri.set(b, []);
		return F(ri.get(b));
	  }, [b]);
	  c && null === a.current && (a.current = f.push({Rg: a, eb: e, qb: d}) - 1, a.current && 1 <= a.current && f[a.current - 1].eb());
	  c || a.current !== f.length - 1 || (a.current && 1 <= a.current && f[a.current - 1].eb(), f.pop(), a.current = null);
	  d = re(function () {
		if (f.length) {
		  var g = f[f.length - 1];
		  g.qb && g.qb();
		}
	  }, [f]);
	  return {Oe: 0 === a.current, activeElement: a.current === f.length - 1 ? c : null, qb: d};
	}
	;
	function ti(a) {
	  V(function () {
		if (a) {
		  var b = window.document.body, c = b.style.overflow;
		  b.style.overflow = "hidden";
		  return function () {
			b.style.overflow = c;
		  };
		}
	  }, [a]);
	}
	;
	function ui(a) {
	  var b = a.ea, c = a.I, d = a.oe, e = a.close, f = a.Jf;
	  a = void 0 === a.Ue ? "dark" : a.Ue;
	  var g = b(d()), h = si({type: "center" == c ? "popup" : "sidePanel", element: g, qb: e});
	  e = h.Oe;
	  d = h.activeElement;
	  h = h.qb;
	  ti(e);
	  oi({ea: b, nb: "popup", af: e ? {type: a, F: h} : null});
	  b = fi({element: d, Nb: function (k) {
		k = ii(c, k);
		return ji({duration: k.duration, Ad: k.Ab, zd: k.vb, opacity: k.opacity});
	  }, Tb: function (k) {
		k = ii(c, k);
		return ji({duration: k.duration, Ad: k.vb, zd: k.Ab, opacity: [1, 0], after: f});
	  }, Wc: function (k) {
		k.style.opacity = "0";
	  }});
	  gi({nb: "popup", element: d || b, We: function (k) {
		return qi(c, k);
	  }});
	  bi(document.body, function () {
		return g && qi(c, g);
	  });
	  bi(g, function () {
		return g && qi(c, g);
	  });
	}
	;
	function vi(a) {
	  var b = a.ea, c = a.I, d = a.pa;
	  a = a.ge;
	  var e = t(me(null)), f = e.next().value, g = e.next().value;
	  ui({ea: b, I: c, oe: function () {
		return f && T(d, f);
	  }, close: a ? function () {
		return g(null);
	  } : void 0});
	  return qe(function () {
		return {open: g, close: function () {
		  return g(null);
		}};
	  }, []);
	}
	;
	;
	function xi(a, b, c) {
	  var d = void 0 === d ? 300 : d;
	  var e = U(0), f = U(0);
	  Ye(a, "click", function (g) {
		g.preventDefault();
		e.current += 1;
		1 === e.current && (f.current = setTimeout(function () {
		  c && c();
		  e.current = 0;
		  clearTimeout(f.current);
		}, d));
		2 === e.current && (b(), e.current = 0, clearTimeout(f.current));
	  });
	}
	;
	var yi = ['\n<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.293 2.293a1 1 0 1 1 1.414 1.414L14.414 7H16a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1V4a1 1 0 1 1 2 0v1.586l3.293-3.293zm-14 14a1 1 0 1 0 1.414 1.414L7 14.414V16a1 1 0 1 0 2 0v-4a1 1 0 0 0-1-1H4a1 1 0 1 0 0 2h1.586l-3.293 3.293zM18 17v-4a1 1 0 1 0-2 0v3h-3a1 1 0 1 0 0 2h4a1 1 0 0 0 1-1zM3 2a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V4h3a1 1 0 0 0 0-2H3z" fill="currentColor"/></svg>\n'];
	yi.raw = yi.slice();
	;
	var Ai = ['\n<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.707 5.707a1 1 0 0 0-1.414-1.414L10 8.586 5.707 4.293a1 1 0 0 0-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 1 0 1.414 1.414L10 11.414l4.293 4.293a1 1 0 0 0 1.414-1.414L11.414 10l4.293-4.293z" fill="currentColor"/></svg>\n'];
	Ai.raw = Ai.slice();
	;
	var Ci = ['\n<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>\n'];
	Ci.raw = Ci.slice();
	;
	var Ei = ['\n<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 3a1 1 0 1 0-2 0v6H3a1 1 0 0 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V3z" fill="currentColor"/></svg>\n'];
	Ei.raw = Ei.slice();
	;
	function Gi(a, b, c, d) {
	  var e = Math.abs(c.width - window.innerWidth) / 2 / d;
	  c = Math.abs(c.height - window.innerHeight) / 2 / d;
	  d = -c;
	  a = Math.max(-e, Math.min(e, a));
	  b = Math.max(d, Math.min(c, b));
	  return {hd: a, jd: b};
	}
	function Hi(a, b, c, d, e) {
	  a = Gi(c.x + (a.x - b.x) / e, c.y + (a.y - b.y) / e, d, e);
	  return {x: a.hd, y: a.jd};
	}
	;
	function Ii(a, b) {
	  return {$a: a.current.offsetWidth * b > window.innerWidth, gb: a.current.offsetHeight * b > window.innerHeight};
	}
	function Ji(a, b) {
	  var c = U({$a: false, gb: false});
	  V(function () {
		c.current = Ii(a, b);
	  }, [a, c, b]);
	  return c;
	}
	;
	function Ki(a) {
	  Ta(a, function (b, c) {
		cb(b);
		delete a[c];
	  });
	}
	;
	function Li(a, b, c) {
	  return eb(a, b, function (d) {
		try {
		  true === c(d) && d.preventDefault(), ie || Id();
		} catch (e) {
		  E(e);
		}
	  });
	}
	;
	function Mi(a, b, c) {
	  var d = {};
	  Ye(a, "keydown", function (e) {
		e.defaultPrevented || e.keyCode !== b || void 0 !== d.pe && e.ctrlKey !== d.pe || void 0 !== d.shift && e.shiftKey !== d.shift || void 0 !== d.metaKey && e.metaKey !== d.metaKey || (e.preventDefault(), c(e));
	  });
	}
	;
	function Ni(a, b) {
	  V(function () {
		function c(d) {
		  0 < d.deltaY ? b() : a();
		}
		window.addEventListener("wheel", c);
		return function () {
		  window.removeEventListener("wheel", c);
		};
	  }, [b, a]);
	}
	;
	function Oi(a, b, c, d) {
	  var e = U({x: 0, y: 0}), f = U(c), g = lf(c), h = U({width: 0, height: 0}), k = lf(d), l = Ji(a, b);
	  V(function () {
		function m(A) {
		  var u = a.current.getBoundingClientRect();
		  h.current = {width: u.width, height: u.height};
		  f.current = g.current;
		  e.current = {x: A.clientX, y: A.clientY};
		  A.preventDefault();
		  C = Li(window, "mouseup", p);
		  v = Li(window, "mousemove", q);
		}
		function q(A) {
		  var u = k.current, n = g.current, x = {x: A.clientX, y: A.clientY};
		  1 === A.buttons ? (A.preventDefault(), n = Hi(x, e.current, f.current, h.current, b)) : p();
		  u({x: l.current.$a ? n.x : g.current.x, y: l.current.gb ? n.y : g.current.y});
		}
		function p() {
		  Ki([v, C]);
		}
		var w = null, v = null, C = null;
		if (l.current.$a || l.current.gb) w = Li(a.current, "mousedown", m);
		return function () {
		  Ki([w, v, C]);
		};
	  }, [b, g, a, k, l]);
	}
	function Pi(a, b, c, d, e, f, g) {
	  Ni(e, f);
	  var h = U(window), k = /Firefox/.test(navigator.userAgent), l = k ? 61 : 187;
	  Mi(h, k ? 173 : 189, f);
	  Mi(h, l, e);
	  Mi(h, 109, f);
	  Mi(h, 107, e);
	  Mi(h, 27, g);
	  Oi(a, b, c, d);
	}
	;
	function Qi(a) {
	  if (2 === a.length) {
		var b = t([{x: a[0].pageX, y: a[0].pageY}, {x: a[1].pageX, y: a[1].pageY}]);
		a = b.next().value;
		b = b.next().value;
		return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
	  }
	  return 0;
	}
	;
	function Ri(a, b, c, d, e) {
	  var f = U({vd: 0, jf: 1, ud: {x: 0, y: 0}, yb: "none"}), g = Ji(a, b), h = U(d), k = lf(d), l = U(), m = lf(e), q = re(function (n) {
		f.current.yb = "pinch";
		f.current.jf = b;
		f.current.vd = Qi(n.touches);
	  }, [b]), p = re(function (n) {
		n = Qi(n.touches) / f.current.vd;
		c(b * n);
	  }, [b, c]), w = re(function (n) {
		var x = a.current.getBoundingClientRect();
		n = n.touches[0];
		l.current = {width: x.width, height: x.height};
		f.current.ud = {x: n.clientX, y: n.clientY};
		h.current = k.current;
		f.current.yb = "drag";
	  }, [k, a]), v = re(function (n) {
		var x = m.current, G = k.current, P = n.touches[0];
		P = {x: P.clientX, y: P.clientY};
		n.touches && 1 === n.touches.length && (G = Hi(P, f.current.ud, h.current, l.current, b));
		x({x: g.current.$a ? G.x : k.current.x, y: g.current.gb ? G.y : k.current.y});
	  }, [k, b, m, g]), C = re(function (n) {
		n.cancelable && n.preventDefault();
		n.touches && (2 === n.touches.length && "pinch" === f.current.yb ? p(n) : 1 === n.touches.length && "drag" === f.current.yb && (g.current.$a || g.current.gb) && v(n));
	  }, [v, p, g]), A = re(function () {
		f.current.yb = "none";
		window.removeEventListener("touchmove", C);
		window.removeEventListener("touchend", A);
	  }, [C]), u = re(function (n) {
		n.touches && (2 === n.touches.length ? q(n) : 1 === n.touches.length && w(n), window.addEventListener("touchmove", C, {passive: false}), window.addEventListener("touchend", A));
	  }, [w, q, A, C]);
	  V(function () {
		window.addEventListener("touchstart", u);
		return function () {
		  window.removeEventListener("touchstart", u);
		};
	  }, [u]);
	}
	;
	var Si = "\n<div\n	class=;\n	save-ref=;\n>\n	<div class=;\n	>\n		;\n		;\n	</div>\n	;\n	;\n</div>".split(";");
	Si.raw = Si.slice();
	var Ti = ["\n		<img\n			class=", "\n			src=", "\n			alt=''\n		/>"];
	Ti.raw = Ti.slice();
	var Ui = "\n<div class=; save-ref=;>\n	;\n	;\n	;\n	</div>\n".split(";");
	Ui.raw = Ui.slice();
	var Vi = ["\n<div>\n	", "\n</div>\n"];
	Vi.raw = Vi.slice();
	function Wi() {
	  var a = t(me(1)), b = a.next().value, c = a.next().value;
	  return {Sa: b, td: function (d) {
		6 <= d ? c(6) : 1 >= d ? c(1) : c(d);
	  }, sc: function () {
		var d = b + 0.5;
		6 >= d ? c(d) : c(6);
	  }, nc: function () {
		var d = b - 0.5;
		1 <= d ? c(d) : c(1);
	  }, Bc: function () {
		c(1);
	  }};
	}
	function Xi(a, b) {
	  var c = t(me(true)), d = c.next().value;
	  c = c.next().value;
	  V(function () {
		d ? (a.current.style.bottom = F(getComputedStyle(document.documentElement)).getPropertyValue("--tool-bar-bottom"), b.current.style.top = F(getComputedStyle(document.documentElement)).getPropertyValue("--close-button-top")) : (a.current.style.bottom = "-" + a.current.offsetHeight + "px", b.current.style.top = "-" + b.current.offsetHeight + "px");
	  }, [d, c, a, b]);
	  return {Re: d, gf: c};
	}
	function Yi(a, b) {
	  var c = b.fe;
	  return Wg(a, {pa: T(Pf, {style: "secondary", size: "small", F: function () {
		return c();
	  }, ya: "icon", icon: T(Bi), state: "default"}, "x2385b__close-cross"), Oa: I("Common.Close"), I: "bottom", align: "start"});
	}
	function $i(a, b) {
	  var c = b.Oa;
	  return Wg(a, {pa: T(Zi, {icon: b.icon, Oa: c, F: b.F, disabled: b.disabled}), Oa: c, show: !("ontouchstart" in document.documentElement)});
	}
	function aj(a, b) {
	  var c = b.sc, d = b.nc, e = b.Bc, f = b.scale;
	  b = b.La;
	  Ye(b, "click", function (g) {
		return g.preventDefault();
	  });
	  return a(Ui, "x2385b__zoom-tool-bar", b, a($i, {icon: T(Di, {}, "x2385b__icon"), Oa: I("Common.ImageZoom.Tooltip.Decrease"), F: d, disabled: 1 == f}), a($i, {icon: T(zi, {}, "x2385b__icon"), Oa: I("Common.ImageZoom.Tooltip.ResetScale"), F: e, disabled: 1 == f}, "x2385b__center-button"), a($i, {icon: T(Fi, {}, "x2385b__icon"), Oa: I("Common.ImageZoom.Tooltip.Increase"), F: c, disabled: 6 == f}));
	}
	function bj(a, b) {
	  var c = b.src;
	  return a(Ti, D("x2385b__image", {transition: b.Be, touchscreen: b.Te}), c);
	}
	function cj(a, b) {
	  function c(J) {
		var ua = Ii(u, J), qa = Gi(m.x, m.y, {width: u.current.offsetWidth * J, height: u.current.offsetHeight * J}, J);
		J = qa.hd;
		qa = qa.jd;
		q({x: ua.$a ? J : 0, y: ua.gb ? qa : 0});
	  }
	  function d() {
		w(true);
		v.sc();
	  }
	  function e() {
		w(true);
		v.nc();
		c(v.Sa - 0.5);
	  }
	  function f() {
		w(true);
		v.Bc();
		q({x: 0, y: 0});
	  }
	  function g(J) {
		w(false);
		q(J);
	  }
	  var h = b.Je, k = b.Ie, l = b.he;
	  b = t(me(function () {
		return {x: 0, y: 0};
	  }));
	  var m = b.next().value, q = b.next().value;
	  b = t(me(false));
	  var p = b.next().value, w = b.next().value, v = Wi(), C = U();
	  b = U();
	  var A = U(), u = U(), n = "ontouchstart" in document.documentElement, x = Xi(A, b), G = x.Re, P = x.gf;
	  Ye(A, "click", function (J) {
		return J.preventDefault();
	  });
	  Ye(C, "click", function (J) {
		J.defaultPrevented || (J.preventDefault(), l());
	  });
	  xi(u, function () {
		n && (G && P(false), 3 <= v.Sa ? f() : (w(true), v.td(3)));
	  }, function () {
		n && P(!G);
	  });
	  Ri(u, v.Sa, function (J) {
		w(false);
		v.td(J);
		c(J);
	  }, m, g);
	  Pi(u, v.Sa, m, g, d, e, l);
	  V(function () {
		var J = Ii(u, v.Sa), ua = u.current.offsetWidth / 2, qa = u.current.offsetHeight / 2;
		u.current.style.cursor = J.$a || J.gb ? "move" : "default";
		u.current.style.transformOrigin = ua - m.x + "px " + (qa - m.y) + "px";
		u.current.style.transform = "translate(" + m.x + "px, " + m.y + "px) scale(" + v.Sa + ")";
	  }, [u, v.Sa, m, q]);
	  oe(function () {
		C.current.style.height = window.innerHeight + "px";
	  });
	  x = {La: u};
	  return a(Si, "x2385b__preview", C, D("x2385b__image-container", {touchscreen: n}), a.K(bj, function () {
		return !k && {src: h, Be: p, Te: n};
	  }, x), a.K(ai, function () {
		return k && {image: k, tf: true, ke: C};
	  }, x), a(aj, {sc: d, nc: e, Bc: f, scale: v.Sa, La: A}), a(Yi, {fe: l}, {La: b}));
	}
	;
	function dj(a) {
	  var b = vi({ea: a, I: "center", pa: cj, ge: true});
	  return re(function (c, d) {
		return b.open({Je: c, Ie: d && d.U ? Object.assign({}, d, {U: d.U}) : void 0, he: b.close});
	  }, [b]);
	}
	;
	var ej = '\n<figure\n	class=;\n	style=;\n>\n	<div class=; style=;>\n		;\n		<div class=; style=;></div>\n	</div>\n	<figcaption class="caption-wrapper">\n		;\n	</figcaption>\n</figure>'.split(";");
	ej.raw = ej.slice();
	var fj = {}, gj = {};
	function hj(a) {
	  var b = a.block;
	  Rh.call(this, {block: b, ib: a.ib});
	  Y(this, "hide-caption", !b.B.length);
	}
	z(hj, Rh);
	function ij(a, b) {
	  b = wc({key: b.key, B: b.B});
	  return Gg(new sg({Ja: b, Ya: Z(a, "caption"), Pb: null, md: "caption"}), function () {}, true);
	}
	hj.prototype.ha = function () {
	  var a = this.b;
	  return "i" === a.type && "inner" === a.w ? {"max-width": a.width + "px", "max-height": a.height + "px"} : null;
	};
	hj.prototype.W = function () {
	  var a = this.b;
	  return ue(gj, ":media-block-" + a.key)(ej, kg(this), this.C(), this.hb, this.ha(), this.Ba(a, this.Aa, this.Ca.bind(this)), this.Pa, this.S(), ij(this, a));
	};
	var jj = ["\n			", "\n		"];
	jj.raw = jj.slice();
	var kj = {}, lj = {};
	function mj(a, b) {
	  var c = b.He;
	  b = b.className;
	  var d = dj(a);
	  return ze(a, T(ai, {image: c, Gc: true, className: b, F: function () {
		return d(Ug(c.src), c);
	  }}));
	}
	function nj(a, b) {
	  a = F(a && "i" === a.type && a.Xb ? a : null);
	  return ue(lj, ":collaged-image-" + a.key)(jj, Ce(mj)({He: a, className: b + " image-block"}));
	}
	function oj(a) {
	  var b = a.block;
	  hj.call(this, {block: b, ib: a.ib});
	  Y(this, "hide-caption", !b.B.length);
	  this.l = null;
	  this.h = false;
	}
	z(oj, hj);
	oj.prototype.f = function (a) {
	  hj.prototype.f.call(this, a);
	  if (a = a && "i" === a.type && a.Xb ? a : null) Y(this, "align", false), Y(this, "blob", a.va), Y(this, "collaged", !!a.Xb), Y(this, "prevent-collaging", this.h);
	};
	oj.prototype.C = function () {
	  return this.l ? {flex: this.l + " 0 0"} : null;
	};
	oj.prototype.S = function () {
	  var a = this.b;
	  if (!a.width) return {width: "100%", height: a.height + "px"};
	  var b = Ah(a);
	  a = b.width;
	  b = b.height;
	  return {"padding-bottom": 100 * (this.g ? this.g : b / a) + "%"};
	};
	oj.prototype.ha = function () {
	  var a = this.b;
	  return this.h ? {"max-width": Ah(a).width + "px"} : null;
	};
	function pj(a, b) {
	  var c = a.map(function (e) {
		var f = Ah(e);
		return f.U ? f.width / f.height : e.width / e.height;
	  }), d = Math.min.apply(Math, y(c));
	  b.forEach(function (e, f) {
		e.l = c[f] / d;
	  });
	}
	;
	var qj = ["\n<figure\n	class=", "\n	style=", "\n>\n	", "\n</figure>"];
	qj.raw = qj.slice();
	var rj = {}, sj = {};
	function tj(a) {
	  a = a.block;
	  X.call(this, {X: "collage-block"});
	  this.b = a;
	  Y(this, "align", this.b.w);
	}
	z(tj, X);
	function uj(a, b) {
	  var c = b.map(function (d) {
		if (kj[d.key]) {
		  var e = kj[d.key];
		  e.f(d);
		} else e = new oj({block: d, ib: nj}), kj[d.key] = e;
		d = e;
		d.h = 1 === b.length && "float-left" !== a.b.w;
		Y(d, "prevent-collaging", d.h);
		return d;
	  });
	  pj(b, c);
	  return c.map(function (d) {
		return d.W();
	  });
	}
	tj.prototype.W = function () {
	  var a = this.b;
	  return ue(sj, ":collage-block-" + a.key)(qj, kg(this), 1 === this.b.images.length && (740 >= document.body.clientWidth || "float-left" === this.b.w) ? {display: "block", width: Ah(this.b.images[0]).width + "px"} : null, uj(this, a.images));
	};
	function vj(a, b) {
	  var c;
	  if (rj[a.key]) {
		var d = c = rj[a.key];
		d.b !== a && (d.b = a, Y(d, "align", d.b.w), W(d));
	  } else c = new tj({block: a}), rj[a.key] = c;
	  Y(c, "after", b);
	  return c;
	}
	;
	var wj = ["\n<iframe onload=", " class=", " src=", ' allowfullscreen loading="lazy">\n</iframe>'];
	wj.raw = wj.slice();
	var xj = {};
	function yj(a, b, c) {
	  b += " embed-block";
	  a = F("e" !== a.type ? null : a);
	  return ue(xj, ":embed-" + a.key)(wj, function (d) {
		d = d.target;
		try {
		  var e = F(d.contentWindow), f = new ResizeObserver(function () {
			f.unobserve(e.document.body);
			c(e.document.body.clientHeight / e.document.body.clientWidth);
		  });
		  f.observe(e.document.body);
		} catch (g) {}
	  }, b, a.src);
	}
	;
	function zj(a, b) {
	  if (fj[a.key]) {
		var c = fj[a.key];
		c.f(a);
	  } else c = new hj({block: a, ib: yj}), fj[a.key] = c;
	  Y(c, "after", b);
	  return c;
	}
	;
	function Aj(a) {
	  a.pb("gotoNextQuestion", function (b, c) {
		b = c.ca;
		b == c.la.length - 1 ? E("Goto next operation isn't  available for last question") : c.ca = b + 1;
	  });
	}
	;
	function Bj(a) {
	  a.pb("gotoPreviousQuestion", function (b, c) {
		b = c.ca;
		0 == b ? E("Goto previous operation isn't  available for first question") : c.ca = b - 1;
	  });
	}
	;
	function Cj(a) {
	  a.pb("restartExercise", function (b, c) {
		var d = c.Sb.R.Ma;
		c.la = c.la.map(function (e) {
		  return Qc(e.ba, d);
		});
		c.ca = 0;
	  });
	}
	;
	function Dj(a) {
	  a.pb("setTypeInAnswer", function (b, c) {
		c = F(Tc(c));
		var d = cd(c);
		d ? d.j.ua = b : E("For question with type: " + c.ba.type + " not available 'Set type in answer' action");
	  });
	}
	;
	function Ej(a) {
	  a.pb("submit", function (b, c) {
		F(Tc(c)).o = true;
	  });
	}
	;
	function Fj(a) {
	  a.pb("setChoiceCorrect", function (b, c) {
		c = F(Tc(c));
		var d = c.ba.type;
		(c = bd(c)) ? c.j.da.forEach(function (e) {
		  "mc" == d ? e.selected = e.ja.key == b : e.ja.key == b && (e.selected = !e.selected);
		}) : E("For question with type: " + d + " not available 'Set choice correct' action");
	  });
	}
	;
	function Gj(a) {
	  [Bj, Aj, Ej, Dj, Fj, Cj].forEach(function (b) {
		return b(a);
	  });
	}
	function Hj(a) {
	  var b = new Map;
	  Gj({pb: function (c, d) {
		b.set(c, d);
	  }});
	  return {dispatch: function (c, d) {
		d = void 0 === d ? "" : d;
		var e = b.get(c);
		e ? a(function (f) {
		  return e(d, f);
		}) : Ia("Unknown action: " + c);
	  }};
	}
	;
	var Ij = ["\n<div\n	class=", "\n	onclick=", "\n></div>"];
	Ij.raw = Ij.slice();
	var Jj = ["/src/roll/components/richtext/renderer/exercise/NavigationButton.css"];
	Jj.raw = Jj.slice();
	var Kj = Pe(Jj).v;
	;
	var Mj = ["<div>", "</div>"];
	Mj.raw = Mj.slice();
	;
	function Oj(a) {
	  var b = t(me(false)), c = b.next().value, d = b.next().value;
	  V(function () {
		var e = null, f = Li(a.current, "mousedown", function () {
		  e = Li(window, "mouseup", function () {
			d(false);
			cb(e);
		  });
		  d(true);
		});
		return function () {
		  return Ki([e, f]);
		};
	  }, [a]);
	  return c;
	}
	;
	function Pj(a) {
	  var b = t(me(false)), c = b.next().value, d = b.next().value;
	  V(function () {
		var e = a.current, f = [Li(e, "mouseover", function () {
		  return d(true);
		}), Li(e, "mouseout", function () {
		  return d(false);
		})];
		return function () {
		  return Ki(f);
		};
	  }, [a]);
	  return c;
	}
	;
	var Qj = "\n<button\n	save-ref= \n	disabled= \n	class= \n	onmouseover= \n	onmouseout= \n	tabindex= \n	onclick= \n	onkeydown= \n	onmousedown= \n	data-at= \n>\n	 \n</button>".split(" ");
	Qj.raw = Qj.slice();
	function Rj(a, b) {
	  var c = U(), d = Pj(c), e = Oj(c), f = b.v;
	  d = Object.assign({}, b.Ug, {over: d, down: e});
	  e = false === b.Dg ? -1 : void 0;
	  return a(Qj, c, b.disabled, "" + f("button", d, b.className), b.onmouseover, b.onmouseout, e, function (g) {
		b.onclick && (g.preventDefault(), b.onclick());
	  }, b.onkeydown, b.onmousedown, Fe(b.Ob), b.text || "");
	}
	;
	function Sj(a) {
	  a = ic(a);
	  if (!a) throw Error("OrderedMap is empty");
	  a = uc(a);
	  if (!a) throw Error("First block is not paragraph");
	  return a;
	}
	;
	function Tj(a) {
	  var b = cd(a);
	  if (b) {
		a: {
		  b = b.j;
		  var c = b.Bd;
		  a = c.Da;
		  b = b.ua;
		  b = (a ? b : b.toLowerCase()).trim();
		  c = t(c.ia);
		  for (var d = c.next(); !d.done; d = c.next()) if (d = d.value.text, d = (a ? d : d.toLowerCase()).trim(), b == d) {
			a = true;
			break a;
		  }
		  a = false;
		}
		return a;
	  }
	  if (b = bd(a)) {
		a: {
		  a = t(b.j.da);
		  for (b = a.next(); !b.done; b = a.next()) if (b = b.value, b.selected != b.ja.L) {
			a = false;
			break a;
		  }
		  a = true;
		}
		return a;
	  }
	  E("Unknown question type: " + a.ba.type);
	  return false;
	}
	;
	function Uj(a) {
	  var b = bd(a);
	  if (b) return !!b.j.da.find(function (c) {
		return c.selected;
	  });
	  if (b = cd(a)) return !!b.j.ua;
	  E("Unknown question type: " + a.ba.type);
	  return false;
	}
	;
	var Vj = ["\n<div\n	class=", "\n>\n	", "\n</div>"];
	Vj.raw = Vj.slice();
	var Wj = ["\n<iframe\n	class=", "\n	src=", "\n></iframe>"];
	Wj.raw = Wj.slice();
	var Xj = ["\n<div class=", " style=", ">\n	<div style=", ">\n		", "\n	</div>\n</div>\n"];
	Xj.raw = Xj.slice();
	var Yj = ["/src/roll/components/richtext/renderer/exercise/question/AttachmentRenderer.css"];
	Yj.raw = Yj.slice();
	var Zj = Pe(Yj).v;
	function ak(a, b) {
	  var c = qe(function () {
		return Ah(b);
	  }, [b]), d = c.height / c.width;
	  return a(Xj, Zj("image"), "max-width: " + c.width + "px", "padding-bottom: " + 100 * d + "%", a(ai, {image: b}));
	}
	function ck(a, b) {
	  var c = b.M;
	  return a(Vj, Zj("attachment"), a.Na(function () {
		a: switch (c.type) {
		  case "i":
			var d = T(ak, c);
			break a;
		  case "e":
			d = T(bk, c);
			break a;
		  default:
			throw H(c.type), Error("Unknown attachment type");
		}
		return d;
	  }));
	}
	;
	var dk = ["<h4\n	class=", "\n	data-key=", "\n	data-at=", "\n>", "</h4>"];
	dk.raw = dk.slice();
	var ek = ["<h3\n	class=", "\n	data-key=", "\n	data-at=", "\n>", "</h3>"];
	ek.raw = ek.slice();
	var fk = ["<li\n	class=", "\n	data-key=", "\n	data-at=", "\n>", "</li>"];
	fk.raw = fk.slice();
	var gk = "<p\n	class= \n	data-key= \n	data-placeholder= \n	data-at= \n> </p>".split(" ");
	gk.raw = gk.slice();
	var hk = ["<a href='", "' save-ref=", " target=_blank><span style=", ">", "</span></a>"];
	hk.raw = hk.slice();
	var ik = ["<span style=", ">", "</span>"];
	ik.raw = ik.slice();
	function kk(a, b) {
	  var c = b.style, d = b.text, e = b.url;
	  b = b.Fc;
	  var f = U();
	  uf({ea: a, Za: f, text: {html: "<a href=" + e + ' class=x1059a__tooltip-link target="_blank">' + e + "</a>"}, size: "small", color: "dark", show: b, I: "bottom", $b: true});
	  return a(hk, e, f, c, d);
	}
	function lk(a, b, c) {
	  b.length || b.push({text: pg, ga: nc(), Wb: true});
	  var d = new qg;
	  return a.Ac(b, function (e) {
		var f = e.ga, g = {}, h = [];
		mc(f.style, "bold") && (g["font-weight"] = "bold");
		mc(f.style, "italic") && (g["font-style"] = "italic");
		mc(f.style, "underline") && h.push("underline");
		mc(f.style, "strikethrough") && h.push("line-through");
		h.length && (g["text-decoration"] = h.join(" "));
		f = e.ga.url;
		h = e.text;
		e.Wb && h.endsWith("\n") && (h += pg);
		e = rg(d, "chunk_" + e.text + (f ? "_url" : "_text"));
		return f ? Rd(e, kk, {style: g, text: h, url: f, Fc: c}) : Rd(e, jk, {style: g, text: h});
	  });
	}
	function mk(a, b) {
	  var c = b.Ja, d = void 0 === b.placeholder ? "" : b.placeholder, e = b.className, f = b.Ob;
	  b = b.Fc;
	  var g = zc(c);
	  d = g.length ? "" : d;
	  e = e && d ? e.split(" ").map(function (h) {
		return h + " " + h + "_empty";
	  }).join(" ") : e;
	  return a(gk, e, c.key, d, Fe(f), lk(a, g, b));
	}
	;
	;
	function ok(a, b, c) {
	  var d = a.ja;
	  return b && c ? d.L ? "correct" : "incorrect" : a.selected ? "selected" : "none";
	}
	;
	var pk = ["\n<svg\n	class=", ' \n	viewBox="0 0 10 10" \n	xmlns="http://www.w3.org/2000/svg"\n>\n	<path d="M5 3.571L7.857.714a1.01 1.01 0 0 1 1.429 1.429L6.429 5l2.857 2.857a1.01 1.01 0 0 1-1.429 1.428L5 6.428 2.143 9.285A1.01 1.01 0 0 1 .714 7.857L3.571 5 .714 2.142A1.01 1.01 0 0 1 2.143.714L5 3.57z" fill="#42484E"/>\n</svg>\n'];
	pk.raw = pk.slice();
	var qk = ["\n<svg\n	class=", '  \n	viewBox="0 0 12 10" \n	xmlns="http://www.w3.org/2000/svg"\n>\n	<path d="M10.135.32a1.09 1.09 0 0 1 1.548 1.538L4.405 9.182.317 5.072a1.09 1.09 0 0 1 1.547-1.538l2.54 2.553L10.135.32z" fill="none"/>\n</svg>'];
	qk.raw = qk.slice();
	var rk = ["\n<svg\n	class=", ' \n	viewBox="0 0 12 10" \n	xmlns="http://www.w3.org/2000/svg"\n>\n	<path d="M10.135.32a1.09 1.09 0 0 1 1.548 1.538L4.405 9.182.317 5.072a1.09 1.09 0 0 1 1.547-1.538l2.54 2.553L10.135.32z" fill="none"/>\n</svg>'];
	rk.raw = rk.slice();
	var sk = ["\n<svg\n	class=", '\n	viewBox="0 0 6 6" \n	xmlns="http://www.w3.org/2000/svg"\n>\n	<circle cx="828" cy="556" r="3" transform="translate(-825 -553)" fill="none"/>\n</svg>'];
	sk.raw = sk.slice();
	;
	var xk = ["\n<div\n	class=", "\n>\n	", "\n</div>"];
	xk.raw = xk.slice();
	var yk = "\n<label\n	class= \n	onclick= \n	disabled= \n>\n	 \n	 \n</label>".split(" ");
	yk.raw = yk.slice();
	var zk = ['\n<input type="radio" name="radio"/>\n<span class=', ">\n	", "\n</span>"];
	zk.raw = zk.slice();
	var Ak = ["/src/roll/components/richtext/renderer/exercise/question/content/multiplechoice/MultipleChoicesRenderer.css"];
	Ak.raw = Ak.slice();
	var Bk = Pe(Ak).v;
	function Ck(a) {
	  switch (a) {
		case "selected":
		  return T(tk, {className: Bk("radio")});
		case "correct":
		  return T(vk, {className: Bk("correct")});
		case "incorrect":
		  return T(wk, {className: Bk("incorrect")});
		default:
		  return null;
	  }
	}
	function Dk(a, b) {
	  return a(zk, Bk("control", {}, b.v("control")), a.Na(function () {
		return Ck(b.status);
	  }));
	}
	function Ek(a, b) {
	  function c(k) {
		var l = k.target, m = F(l.parentElement);
		"A" != l.tagName && "A" != m.tagName && (k.preventDefault(), d("setChoiceCorrect", b.state.ja.key));
	  }
	  var d = Xd(Fk), e = b.o, f = b.state.selected, g = ok(b.state, e, b.H);
	  f = {selected: f, status: g};
	  var h = Sj(b.state.ja.content.T);
	  return a(yk, Bk("choice", f, b.v("choice")), !e && c, e ? true : null, a(Dk, {status: g, v: b.v}), a(nk, {className: Bk("text"), Ja: h}));
	}
	function Gk(a, b) {
	  return a(xk, Bk("choices", {answered: b.o}), a.Ac(b.state.da, function (c) {
		return Rd(c.ja.key, Ek, {v: b.v, state: c, o: b.o, H: b.H});
	  }));
	}
	;
	var Hk = ["\n<div\n	class=", "\n>\n	", "\n</div>"];
	Hk.raw = Hk.slice();
	var Ik = "\n<label\n	class= \n	onclick= \n	disabled= \n>\n	 \n	 \n</label>".split(" ");
	Ik.raw = Ik.slice();
	var Jk = ['\n<input type="checkbox" />\n<span class=', ">\n	", "\n</span>"];
	Jk.raw = Jk.slice();
	var Kk = ["/src/roll/components/richtext/renderer/exercise/question/content/multipleresponse/MultipleResponsesRenderer.css"];
	Kk.raw = Kk.slice();
	var Lk = Pe(Kk).v;
	function Mk(a) {
	  switch (a) {
		case "selected":
		  return T(uk, {className: Lk("checkbox")});
		case "correct":
		  return T(vk, {className: Lk("correct")});
		case "incorrect":
		  return T(wk, {className: Lk("incorrect")});
		default:
		  return null;
	  }
	}
	function Nk(a, b) {
	  return a(Jk, Lk("control", {}, b.v("control")), a.Na(function () {
		return Mk(b.status);
	  }));
	}
	function Ok(a, b) {
	  function c(k) {
		var l = k.target, m = F(l.parentElement);
		"A" != l.tagName && "A" != m.tagName && (k.preventDefault(), d("setChoiceCorrect", b.state.ja.key));
	  }
	  var d = Xd(Fk), e = b.o, f = b.state.selected, g = ok(b.state, e, b.H);
	  f = {selected: f, status: g};
	  var h = Sj(b.state.ja.content.T);
	  return a(Ik, Lk("choice", f, b.v("choice")), !e && c, e ? true : null, a(Nk, {v: b.v, status: g}), a(nk, {className: Lk("text"), Ja: h}));
	}
	function Pk(a, b) {
	  return a(Hk, Lk("choices", {answered: b.o}), a.Ac(b.state.da, function (c) {
		return Rd(c.ja.key, Ok, {v: b.v, state: c, o: b.o, H: b.H});
	  }));
	}
	;
	var Qk = "\n<div\n	class= \n>\n	 \n	 \n	<input\n		class= \n		value= \n		placeholder= \n		oninput= \n		readonly= \n	/>\n	 \n</div>".split(" ");
	Qk.raw = Qk.slice();
	var Rk = ["\n<p class=", ">\n	", ": ", "\n</p>"];
	Rk.raw = Rk.slice();
	var Sk = ["/src/roll/components/richtext/renderer/exercise/question/content/typein/TypeInRenderer.css"];
	Sk.raw = Sk.slice();
	var Tk = Pe(Sk).v;
	function Uk(a, b) {
	  b = b.ia.map(function (c) {
		return c.text;
	  });
	  return a(Rk, Tk("responses"), I("Roll.Exercise.Player.Content.TypeIn.AcceptableResponses"), b.join(", "));
	}
	function Vk(a, b) {
	  var c = Xd(Fk), d = b.o, e = b.state, f = e.Bd, g = f.Da, h = e.ua, k = !!f.ia.find(function (l) {
		return g ? l.text == h : l.text.toUpperCase() == h.toUpperCase();
	  });
	  return a(Qk, Tk("type-in", {correct: d && k, incorrect: d && !k}, b.v("type-in")), a.K(vk, function () {
		return d && k && {className: Tk("correct")};
	  }), a.K(wk, function () {
		return d && !k && {className: Tk("incorrect")};
	  }), Tk("answer"), e.ua, I("Roll.Exercise.Player.Content.TypeIn.Placeholder"), function (l) {
		c("setTypeInAnswer", l.target.value);
	  }, d ? "" : void 0, a.K(Uk, function () {
		return d && b.H && {ia: f.ia};
	  }));
	}
	;
	var Wk = "\n<div class=;>\n	<div class=;>\n		;\n	</div>\n	<div class=;>\n		;\n	</div>\n	;\n</div>\n".split(";");
	Wk.raw = Wk.slice();
	var Xk = ["/src/roll/components/richtext/renderer/exercise/question/FeedbackRenderer.css"];
	Xk.raw = Xk.slice();
	var Yk = Pe(Xk).v;
	function Zk(a, b) {
	  var c = b.me, d = Hc(b.V, c), e = !yc(d), f = {"with-text": e}, g = {correct: c, incorrect: !c}, h = c ? I("Roll.Exercise.Player.Status.Correct") : I("Roll.Exercise.Player.Status.Incorrect");
	  return a(Wk, Yk("feedback-container", f, b.v("feedback-container")), Yk("status-icon", g, b.v("status-icon")), a.Na(function () {
		return c ? T(vk, {className: ""}) : T(wk, {className: ""});
	  }), Yk("status-label", {}, b.v("status-label")), h, a.K(nk, function () {
		return e && {className: Mb(Yk("text"), b.v("feedback-text")), Ja: d};
	  }));
	}
	;
	var $k = "\n<div class=;>\n	;\n	;\n	;\n	;\n	;\n	;\n	;\n	;\n</div>".split(";");
	$k.raw = $k.slice();
	var al = ["/src/roll/components/richtext/renderer/exercise/question/QuestionRenderer.css"];
	al.raw = al.slice();
	var bl = Pe(al).v;
	function cl(a) {
	  var b = a.zc;
	  a = a.H;
	  var c = b.ba;
	  if (c = "mc" == c.type && c ? b : null) return T(Gk, {v: bl, state: c.j, o: b.o, H: a});
	  c = b.ba;
	  if (c = "mr" == c.type && c ? b : null) return T(Pk, {v: bl, state: c.j, o: b.o, H: a});
	  if (c = cd(b)) return T(Vk, {v: bl, state: c.j, o: b.o, H: a});
	  E("Unknown question type: " + b.ba.type);
	  return null;
	}
	function dl(a, b) {
	  var c = b.bf, d = b.H, e = b.Qd, f = F(b.zc), g = f.ba, h = g.V, k = Sj(g.description.T), l = Xd(Fk), m = Xd(el), q = Xd(fl), p = f.o, w = Tj(f), v = {zc: f, H: d}, C = void 0;
	  p && e && (C = {"with-animations": true}, d && (C["show-correct-answers"] = true), d = Hc(h, w), yc(d) || (C["with-feedback"] = true));
	  return a($k, bl("question", C), a.K(Nj, function () {
		return !!c && {text: c};
	  }, bl("question-number")), a(nk, {className: bl("description"), Ja: k}), a.K(ck, function () {
		return g.M && {M: g.M};
	  }), a.Na(function () {
		return cl(v);
	  }), a.K(Pf, function () {
		return !p && {style: "primary", ya: "text", text: I("Roll.Exercise.Player.Button.Submit"), state: Uj(f) ? "default" : "disabled", F: function () {
		  m(true);
		  q("bottom");
		  l("submit");
		}, size: "xLarge"};
	  }, bl("submit-button")), a.K(Zk, function () {
		return p && {v: bl, me: w, V: h};
	  }), a.K(Pf, function () {
		return p && b.Ve && {style: "primary", ya: "text", text: I("Roll.Exercise.Player.Button.Next"), F: function () {
		  m(false);
		  q("top");
		  l("gotoNextQuestion");
		}, size: "xLarge"};
	  }, bl("next-button")), a.K(Rj, function () {
		return b.df && {v: bl, className: bl("restart-button"), text: I("Roll.Exercise.Player.Button.RestartExercise"), onclick: function () {
		  m(false);
		  q("top");
		  l("restartExercise");
		}};
	  }));
	}
	;
	var gl = '\n<div\n	class= \n	contenteditable="false"\n	save-ref= \n>\n	 \n	 \n	 \n</div>'.split(" ");
	gl.raw = gl.slice();
	var hl = ["/src/roll/components/richtext/renderer/exercise/ExerciseBlockRenderer.css"];
	hl.raw = hl.slice();
	var il = Pe(hl).v, Fk = Object.freeze({Ke: function () {}}), el = Object.freeze({Ke: function () {}}), fl = Object.freeze({Ke: function () {}});
	function Ee(a, b) {
	  var c = b.state, d = b.dispatch, e = b.Fb, f = t(me(false)), g = f.next().value, h = f.next().value;
	  f = t(me("none"));
	  var k = f.next().value, l = f.next().value, m = c.ca;
	  f = c.la.length;
	  var q = m + 1 != f, p = !!c.la.find(function (A) {
		return !A.o;
	  });
	  if (1 < f) {
		m = String((void 0 == m ? -1 : m) + 1).padStart(2, "0");
		f = String(f).padStart(2, "0");
		var w = m + "/" + f;
	  }
	  var v = Tc(c);
	  f = {};
	  b = (f[b.mode] = true, f);
	  var C = U();
	  V(function () {
		"none" != k && (e(C.current, k), l("none"));
	  }, [k, e]);
	  return a.Dc(Fk, d).Dc(el, h).Dc(fl, l)(gl, il("exercise", b), C, a(Lj, {className: il("prev-button"), visible: 0 < c.ca, F: function () {
		h(false);
		l("top");
		d("gotoPreviousQuestion");
	  }}), a.K(dl, function () {
		return !!v && {bf: w, zc: v, H: c.Sb.R.H, Ve: q, df: !p && !q, Qd: g};
	  }), a(Lj, {className: il("next-button"), visible: c.ca < c.la.length - 1, F: function () {
		h(false);
		l("top");
		d("gotoNextQuestion");
	  }}));
	}
	;
	var jl = ["\n<figure class=", ">\n	<div class=", ">\n		", "\n	</div>\n</figure>"];
	jl.raw = jl.slice();
	var kl = {}, ll = {};
	function ml(a, b, c) {
	  X.call(this, {X: "exercise-block"});
	  this.h = {};
	  this.b = a;
	  this.g = Hj(b).dispatch;
	  this.l = c;
	  this.f = null;
	}
	z(ml, X);
	ml.prototype.W = function () {
	  var a = this;
	  this.f || De(function (c) {
		a.f = c;
	  }, this.h)({state: this.b, dispatch: this.g, mode: "player", Fb: this.l});
	  var b = Zf([Z(this, "wrapper")]);
	  return xe(ll, ":exercise-block-" + this.b.Sb.key)(jl, kg(this), b, this.f);
	};
	function nl(a) {
	  var b = a.state, c = a.Ib, d = a.Pb, e = a.Fb;
	  a = b.Sb.key;
	  kl[a] ? (a = c = kl[a], a.b != b && (a.f = null, a.b = b, W(a))) : (c = new ml(b, c, e), kl[a] = c);
	  Y(c, "after", d);
	  return c;
	}
	;
	function ol(a) {
	  var b = a.getState, c = a.Ib, d = a.Fb;
	  a = Yc(b()).j;
	  a = new Tg(a);
	  a.f.c = vj;
	  a.f.e = zj;
	  Mg(a, function (e, f) {
		return nl({state: F(pl(b(), e.key)), Ib: function (g) {
		  return c(function (h) {
			h = F(pl(h, e.key));
			g(h);
		  });
		}, Pb: f, Fb: d});
	  });
	  a.f.a = yh;
	  return a;
	}
	function pl(a, b) {
	  return (a = Yc(a).j.oa.find(function (c) {
		return b === c.key;
	  })) && "E" === a.type ? a : null;
	}
	;
	var ql = "\n<div class=; style=; onconnected=;>\n	;\n	;\n</div>".split(";");
	ql.raw = ql.slice();
	var rl = ["<div class=", "></div>"];
	rl.raw = rl.slice();
	var sl = ["\n<div></div>"];
	sl.raw = sl.slice();
	function tl(a, b) {
	  Dh.call(this, {block: "tooltip-with-tail"});
	  var c = this;
	  b && hg(this, b);
	  this.l = a;
	  nb(this, gg(this), function () {
		return ul(c);
	  });
	  this.xa();
	}
	z(tl, Dh);
	tl.prototype.xa = function () {
	  Y(this, "show", "below");
	};
	function ul(a) {
	  var b = F(ng(a, "tail")), c = a.D();
	  a = a.l.getBoundingClientRect();
	  c = c.getBoundingClientRect();
	  var d = {};
	  Kb(b, (d.left = Math.round(a.left - c.left + 0.5 * (a.width - b.clientWidth)) + "px", d));
	}
	tl.prototype.h = function () {
	  return mg(this, "content")(sl);
	};
	tl.prototype.W = function () {
	  var a = this, b = Zf([Z(this, "tail")]);
	  return this.na(ql, kg(this), Eh(this), function () {
		return ul(a);
	  }, mg(this, "tail")(rl, b), this.h());
	};
	var vl = ["\n<div class=", ">\n	", "\n</div>"];
	vl.raw = vl.slice();
	function wl() {
	  X.call(this, {X: "top-layer"});
	  var a = this;
	  this.f = this.b = this.g = null;
	  nb(this, gg(this), function () {
		a.b && a.b.tc();
	  });
	}
	z(wl, X);
	wl.prototype.Fa = function () {
	  this.b && this.b.Fa();
	};
	function xl(a, b) {
	  var c = b.ie;
	  a.g = b.pa;
	  a.b = c;
	  yl(a);
	  a.f = nb(a, a.b.cc, function () {
		yl(a);
		a.g = null;
		a.b = null;
		W(a);
	  });
	  a.b.Xc();
	  W(a);
	}
	function yl(a) {
	  a.f && kb(a, a.f);
	  a.f = null;
	}
	wl.prototype.W = function () {
	  return this.na(vl, kg(this), this.g);
	};
	function zl(a) {
	  Nb.call(this);
	  this.b = a;
	  this.cc = Ob(this);
	}
	z(zl, Nb);
	zl.prototype.Fa = function () {
	  var a = this, b = this.ma();
	  b ? xb(b, function () {
		return a.cc.dispatch();
	  }) : this.cc.dispatch();
	};
	function Al(a) {
	  var b = a.Ua, c = void 0 === a.offsetX ? 20 : a.offsetX, d = void 0 === a.offsetY ? 10 : a.offsetY;
	  zl.call(this, a.pa);
	  this.f = b;
	  this.g = c;
	  this.m = d;
	}
	z(Al, zl);
	Al.prototype.tc = function () {
	  var a = this.f.getBoundingClientRect();
	  a.width && a.height && this.f.parentNode || Ia("incorrect bounding box (" + (null == this.f.parentNode) + ")");
	  this.b.move(a.left - this.g, a.bottom + this.m);
	  var b = this.b.x() || 0;
	  0 > b && (b = this.g);
	  b + this.b.D().clientWidth > window.innerWidth && (b = window.innerWidth - this.g - this.b.D().clientWidth);
	  var c = this.b.y() || 0;
	  0 > c && (c = this.m);
	  c + this.b.D().clientHeight > window.innerHeight && (c = a.top - this.m - this.b.D().clientHeight);
	  this.b.move(b, c);
	};
	function Bl(a) {
	  var b = a.xa;
	  Al.call(this, {pa: a.Wa, Ua: a.Ua, offsetX: void 0 === a.offsetX ? 5 : a.offsetX, offsetY: void 0 === a.offsetY ? 10 : a.offsetY});
	  this.C = b;
	  this.h = this.l = this.P = null;
	}
	z(Bl, Al);
	Bl.prototype.Xc = function () {
	  var a = this;
	  this.P = lb(this, this.f, "mouseout", function (c) {
		return Cl(a, c);
	  });
	  this.l = lb(this, this.b.D(), "mouseout", function (c) {
		return Cl(a, c);
	  });
	  this.h = lb(this, document.body, "touchstart", function (c) {
		return Cl(a, c);
	  });
	  var b = this.b.D();
	  b = Pd(b);
	  Jd({fb: b, Hb: Nd(Kd), duration: 150});
	};
	Bl.prototype.ma = function () {
	  this.P && mb(this, this.P);
	  this.l && mb(this, this.l);
	  this.h && mb(this, this.h);
	  return Dl(this);
	};
	Bl.prototype.tc = function () {
	  var a = this.C, b = this.b, c = this.f.getBoundingClientRect();
	  c.width && c.height && this.f.parentNode || Ia("incorrect bounding box (" + (null == this.f.parentNode) + ")");
	  var d = b.D().getBoundingClientRect();
	  b.move(c.left + 0.5 * c.width - 0.5 * d.width, this.C ? c.bottom + this.m : c.top - this.m - d.height);
	  var e = b.x() || 0;
	  0 > e && (e = this.g);
	  e + d.width > window.innerWidth && (e = window.innerWidth - this.g - d.width);
	  d = b.y() || 0;
	  0 > d && (d = c.bottom + this.m, a = true);
	  this.b.move(e, d);
	  a ? b.xa() : Y(b, "show", "above");
	};
	function Cl(a, b) {
	  b = b.relatedTarget;
	  b instanceof Node && !a.f.contains(b) && !a.b.D().contains(b) && a.Fa();
	}
	function Dl(a) {
	  var b = a.b.D();
	  b = Pd(b);
	  return Jd({fb: b, Hb: Kd, duration: 150, Uc: function () {
		a.b.Fa();
	  }});
	}
	;
	function El(a) {
	  var b = a.xa;
	  Al.call(this, {pa: a.Wa, Ua: a.Ua, offsetX: void 0 === a.offsetX ? 5 : a.offsetX, offsetY: void 0 === a.offsetY ? 10 : a.offsetY});
	  this.l = b;
	  this.h = this.P = null;
	}
	z(El, Al);
	El.prototype.Xc = function () {
	  var a = this;
	  this.P = lb(this, this.f, "mouseout", function () {
		return a.Fa();
	  });
	  this.h = lb(this, document.body, "touchstart", function (b) {
		b = b.target;
		b instanceof Node && !a.f.contains(b) && !a.b.D().contains(b) && a.Fa();
	  });
	};
	El.prototype.ma = function () {
	  this.P && mb(this, this.P);
	  this.h && mb(this, this.h);
	  return null;
	};
	El.prototype.tc = function () {
	  var a = this.l, b = this.b, c = this.f.getBoundingClientRect();
	  c.width && c.height && this.f.parentNode || Ia("incorrect bounding box (" + (null == this.f.parentNode) + ")");
	  var d = b.D().getBoundingClientRect();
	  b.move(c.left + 0.5 * c.width - 0.5 * d.width, this.l ? c.bottom + this.m : c.top - this.m - d.height);
	  var e = b.x() || 0;
	  0 > e && (e = this.g);
	  e + d.width > window.innerWidth && (e = window.innerWidth - this.g - d.width);
	  d = b.y() || 0;
	  0 > d && (d = c.bottom + this.m, a = true);
	  this.b.move(e, d);
	  a ? b.xa() : Y(b, "show", "above");
	};
	function Fl() {
	  wl.apply(this, arguments);
	}
	z(Fl, wl);
	function Gl(a) {
	  return {animate: function (b) {
		a.style.transform = "undefined scaleX(" + b + ")";
	  }, complete: function () {
		a.style.transform = "";
	  }, wb: ["transform"]};
	}
	;
	var Hl = ["\n<div class=", ">\n	", "\n</div>"];
	Hl.raw = Hl.slice();
	function Il(a, b) {
	  tl.call(this, b);
	  this.C = a;
	}
	z(Il, tl);
	Il.prototype.h = function () {
	  var a = Zf([Z(this, "text")]);
	  return mg(this, "content")(Hl, a, this.C);
	};
	var Jl = ["\n<div class=", " save-ref=", ">", "</div>"];
	Jl.raw = Jl.slice();
	function Kl(a, b) {
	  var c = b.Td;
	  b = b.Ud;
	  var d = U();
	  var e = t(Se(d, void 0));
	  e.next();
	  e = e.next().value;
	  uf({ea: a, Za: d, text: c, show: e});
	  return a(Jl, b, d, c);
	}
	;
	function Ll(a) {
	  return a ? a.replace(/^\s|\s$/, og) : pg;
	}
	;
	var Ml = "\n<div\n	class=;\n	disabled=;\n	onclick=;\n	onmouseover=;\n	passive-events=;\n>\n	;\n	<div class=;>;</div>\n</div>".split(";");
	Ml.raw = Ml.slice();
	var Nl = '\n<div class=;>\n	<svg width="22" height="22" viewPort="0 0 11 11" version="1.1" xmlns="http://www.w3.org/2000/svg">\n		<circle r=";" cx="11" cy="11" fill="transparent" stroke-dasharray="56.5" stroke-dashoffset="0"></circle>\n		<circle class=; r=";" cx="11" cy="11" fill="transparent" stroke-dasharray="56.5" stroke-dashoffset=";"></circle>\n	</svg>\n</div>'.split(";");
	Nl.raw = Nl.slice();
	var Ol = ["\n<div class=", "></div>"];
	Ol.raw = Ol.slice();
	var Pl = ["/src/roll/player/renderer/navigation/NavigationItemRenderer.css"];
	Pl.raw = Pl.slice();
	var Ql = Pe(Pl).v;
	function Rl(a, b) {
	  b = 0 == b.progress ? Ql("not-started") : Ql("complete");
	  return a(Ol, b);
	}
	function Sl(a, b) {
	  b = (100 - 100 * b.progress) / 100 * 18 * Math.PI;
	  return a(Nl, Ql("progress-bar"), 9, Ql("bar"), 9, b);
	}
	function Tl(a, b) {
	  var c = {selected: b.selected, intro: b.Pe}, d = b.progress, e = "ontouchstart" in document.documentElement, f = b.disabled, g = f ? b.Xe : null, h = e ? null : g;
	  e = e ? g : null;
	  g = f ? null : b.F;
	  return a(Ml, Ql("navigation-item", c), f ? true : null, g, h, {ontouchstart: e}, a.Na(function () {
		return 0 == d || 1 == d ? T(Rl, {progress: d}) : T(Sl, {progress: d});
	  }), Ql("label"), Ll(b.label));
	}
	;
	var Ul = "\n<div class=;>\n	<div class=;>;</div>\n	<div class=;>\n		<div class=; style=;></div>\n	</div>\n</div>".split(";");
	Ul.raw = Ul.slice();
	function Vl() {
	  X.call(this, {X: "total-progress"});
	  this.b = 0;
	}
	z(Vl, X);
	Vl.prototype.W = function () {
	  var a = Math.floor(100 * this.b) + "%";
	  return this.na(Ul, kg(this), Z(this, "numeric").className(), a, Z(this, "indicator-container").className(), Z(this, "indicator-progress").className(), "width: " + a);
	};
	var Wl = ["\n<div\n	class=", "\n	ontransitionend=", "\n	onscroll=", "\n>\n	", "\n</div>"];
	Wl.raw = Wl.slice();
	var Xl = ["\n<div class='main-panel'>\n	", "\n	", "\n	", "\n</div>"];
	Xl.raw = Xl.slice();
	function Yl(a, b, c) {
	  X.call(this, {X: "navigation-panel"});
	  this.b = a;
	  this.S = b;
	  this.h = c;
	  this.g = new Vl;
	  hg(this.g, Z(this, "progress"));
	  this.C = Zl(this, a);
	  this.l = Ob(this);
	  this.f = false;
	  this.ha = this.b.intro.u.title || I("Roll.Common.IntroDefaultTitle");
	}
	z(Yl, X);
	function $l(a) {
	  Y(a, "showed", a.b.Ta);
	  Y(a, "in-overlay", 1180 >= window.innerWidth && 739 < window.innerWidth || 739 >= window.innerWidth);
	  var b = a.g;
	  var c = a.b;
	  c = Wc(c.intro, c.chapters);
	  b.b = c;
	  W(b);
	  a.C = Zl(a, a.b);
	  a.f ? (a.f = false, Y(a, "ignore-transition", true)) : Object.keys(a.tb).includes("ignore-transition") && Y(a, "ignore-transition", false);
	  W(a);
	}
	function Zl(a, b) {
	  var c = [], d = -1, e = "sequence" == a.S.cb, f = I("Roll.Common.ChapterDefaultTitle");
	  [b.intro].concat(y(b.chapters)).forEach(function (g, h) {
		var k = g == b.intro ? I("Roll.Common.NavigationPanel.IntroTitle") : g.u.title || f, l = g.progress, m = g == Yc(b);
		m && (d = 1 > l ? h : h + 1);
		h = e && -1 != d && h > d && 0 == l;
		var q = Ce(Tl)({label: k, progress: g.progress, selected: m, Pe: g == b.intro, disabled: h, F: function () {
		  return a.l.dispatch(g);
		}, Xe: function () {
		  var p = new Il(I("Roll.Player.LockedNavigationItemTooltipText"), q), w = a.h, v = {Wa: p, Ua: q, xa: false, ed: true};
		  p = v.Wa;
		  var C = v.Ua, A = v.offsetX, u = v.offsetY, n = void 0 === v.xa ? true : v.xa;
		  v = (void 0 === v.ed ? 0 : v.ed) ? new Bl({Wa: p, Ua: C, offsetX: A, offsetY: u, xa: n}) : new El({Wa: p, Ua: C, offsetX: A, offsetY: u, xa: n});
		  xl(w, {pa: p, ie: v});
		}}, lg(a, g.key));
		c.push(q);
	  });
	  return c;
	}
	function am(a) {
	  var b = Zf([Z(a, "article-title")]);
	  return Ce(Kl)({Td: a.ha, Ud: b}, lg(a, "article-title"));
	}
	Yl.prototype.W = function () {
	  var a = this;
	  return this.na(Wl, kg(this), this, function () {
		return a.h.Fa();
	  }, mg(this, "main-panel")(Xl, am(this), this.g, this.C));
	};
	var bm = new Map;
	function cm(a, b, c) {
	  bm.has(b) || (bm.set(b, {}), ib(b, function () {
		bm.delete(b);
	  }));
	  var d = F(bm.get(b));
	  F(!d[a]);
	  d[a] = c;
	}
	function dm(a, b) {
	  return function () {
		var c = "function" == typeof b ? b() : b;
		return I(a, c);
	  };
	}
	function em(a) {
	  var b = a.id, c = a.cf, d = a.Ph, e = (a = a.parameters) ? dm(b, a) : function () {
		return I(b);
	  };
	  a = null;
	  if (d) {
		var f = d.bind(c);
		a = function () {
		  return f(e());
		};
		a();
	  } else a = function () {
		W(c);
	  };
	  cm(b.toString(), c, a);
	  return {ye: e, Fg: a};
	}
	;
	var fm = ["\n<div\n	class=", "\n	style=", "\n>\n	", "\n	", "\n</div>"];
	fm.raw = fm.slice();
	var gm = ["\n		<p class=", ">", "</p>\n	"];
	gm.raw = gm.slice();
	var hm = ["<p class=", ">", "</p>"];
	hm.raw = hm.slice();
	function im(a) {
	  var b = a.u, c = a.de, d = a.ee, e = a.Ia, f = a.xg, g = a.marginTop;
	  a = a.paddingTop;
	  X.call(this, {X: "chapter-header", relatedData: b});
	  this.b = b;
	  this.f = f;
	  this.h = g;
	  this.C = a;
	  this.g = em({id: {value: "Roll.Common.CurrentChapterFromTotal"}, cf: this, parameters: {current: c + 1, total: d}}).ye;
	  this.l = e;
	}
	z(im, X);
	im.prototype.title = function () {
	  return F(ng(this, "chapter-title"));
	};
	im.prototype.W = function () {
	  var a = Zf(["text-chapter-number", Z(this, "chapter-number")]), b = Zf(["text-title", Z(this, "title")]), c = this.b.title || this.f || I("Roll.Common.ChapterDefaultTitle");
	  return this.na(fm, kg(this), {"margin-top": this.h, "padding-top": this.C}, this.l ? mg(this, "numbering")(hm, a, this.g()) : null, mg(this, "chapter-title")(gm, b, c));
	};
	var jm = "\n<div class=;>\n	;\n	<div class=;>\n		;\n		;\n		;\n	</div>\n</div>".split(";");
	jm.raw = jm.slice();
	var km = ["\n			<p class=", ">", "</p>\n		"];
	km.raw = km.slice();
	var lm = ["<p class=", ">", "</p>"];
	lm.raw = lm.slice();
	var mm = ["\n				<div class=", "></div>"];
	mm.raw = mm.slice();
	var nm = ["\n<div style=", " class=", ">\n	<div style=", ' class="', '">\n</div>'];
	nm.raw = nm.slice();
	function om(a) {
	  X.call(this, {X: "intro-header", relatedData: a});
	  this.b = a;
	  Y(this, "with-cover", !!this.b.jb);
	  Y(this, "without-kicker", "" == this.b.aa);
	}
	z(om, X);
	function pm(a) {
	  var b = a.b.jb;
	  if (!b) return null;
	  var c = {"background-image": "url(" + b.src + ")"}, d = Sb(b.color);
	  b = {"background-color": "rgba(" + d[0] + ", " + d[1] + ", " + d[2] + ", " + b.opacity + ")"};
	  d = Zf(["intro-cover", Z(a, "cover")]);
	  var e = Zf(["intro-cover-overlay", Z(a, "cover-overlay")]);
	  return mg(a, "cover")(nm, c, d, b, e);
	}
	om.prototype.W = function () {
	  var a = Zf(["intro-container"]), b = Zf(["text-kicker", Z(this, "kicker")]), c = Zf(["text-title", Z(this, "title")]), d = Zf([Z(this, "strip")]);
	  d = this.b.jb ? null : mg(this, "strip")(mm, d);
	  return this.na(jm, kg(this), pm(this), a, this.b.aa ? mg(this, "kicker")(lm, b, this.b.aa.trim() || pg) : null, mg(this, "intro-title")(km, c, this.b.title ? this.b.title.trim() || pg : I("Roll.Common.IntroDefaultTitle")), d);
	};
	var qm = "\n			<button class=;\n					disabled=;\n					style=;\n					onclick=;\n					data-at=;\n					onmousedown=;\n					onmouseover=;\n					onmouseout=;>\n				;\n			</button>".split(";");
	qm.raw = qm.slice();
	function rm(a) {
	  var b = a.Ob;
	  Dh.call(this, {Ya: a.Ya, X: a.X});
	  this.h = false;
	  this.l = b;
	}
	z(rm, Dh);
	rm.prototype.F = function () {
	  return ig(this, "click");
	};
	rm.prototype.W = function () {
	  return this.na(qm, kg(this), false, Eh(this), jg(this, "click") ? this : null, Fe(this.l), jg(this, "mousedown") ? this : null, jg(this, "mouseover") ? this : null, jg(this, "mouseout") ? this : null, "");
	};
	var sm = "\n<div class=; style=;>\n	;\n	;\n	;\n	;\n</div>".split(";");
	sm.raw = sm.slice();
	var tm = ["\n		<a href=", ' target="_blank" class=', '>\n			<div class="', '"></div>\n			<span>', "</span>\n		</a>"];
	tm.raw = tm.slice();
	var um = ["<div class=", " style=", "></div>"];
	um.raw = um.slice();
	function vm(a) {
	  var b = a.Eb;
	  a = a.Gb;
	  Dh.call(this, {X: "top-panel"});
	  var c = this;
	  this.hb = b;
	  this.ha = Ob(this);
	  this.S = new rm({Ya: Z(this, "show-navigation")});
	  this.l = 0;
	  this.C = false;
	  nb(this, gg(this), function () {
		c.C = false;
	  });
	  this.h = a;
	  this.Ba = Z(this, "watermark");
	  this.Ca = Z(this, "watermark-logo");
	}
	z(vm, Dh);
	function wm(a) {
	  if (a.hb) return null;
	  var b = Ce(Bi)({}), c = Z(a, "close").className();
	  if (window.navigator.userAgent.includes("MSIE") || window.navigator.userAgent.includes("Trident")) {
		var d = b.getAttribute("class") || "";
		d = d.split(" ").includes(c) ? d : b.className + " " + c;
		b.setAttribute("class", d);
	  } else b.classList.add(c);
	  eb(b, "click", function () {
		return a.ha.dispatch();
	  });
	  return b;
	}
	vm.prototype.W = function () {
	  var a = Zf(["top-panel-progress"]), b = {width: "calc(100% * " + this.l + ")", transition: this.C ? "none" : ""};
	  this.Ca.className();
	  this.h && this.Ca.className() + "_" + "product" + "_" + this.h;
	  this.Ba.className();
	  "isstudio" !== this.h && "isspace" !== this.h || this.Ba.className() + "_" + "removable";
	  return this.na(sm, kg(this), Eh(this), this.S, mg(this, "progress")(um, a, b), wm(this), null);
	};
	var xm = '\n<div data-root=";" class=; onconnected=;>\n	;\n	<div class=;>\n		;\n		<div class=; onscroll=;>\n			;\n			;\n			;\n			;\n		</div>\n	</div>\n	;\n	;\n</div>'.split(";");
	xm.raw = xm.slice();
	var ym = ["<div class=", " passive-events=", " onmousedown=", "></div>"];
	ym.raw = ym.slice();
	var zm = ["\n					<div class=", ">\n						<div class=", ">\n							", "\n						</div>\n						", "\n					</div>"];
	zm.raw = zm.slice();
	var Am = Nd(Md(0.14)), Bm = Md(0.64);
	function Cm(a) {
	  var b = a.state, c = a.R, d = a.Eb, e = a.Ib, f = a.Gb;
	  a = a.Zb;
	  X.call(this, {X: "roll-player"});
	  var g = this;
	  this.Pa = new Fl;
	  this.h = window;
	  try {
		window.top.location.href && (this.h = window.top);
	  } catch (h) {}
	  this.b = b;
	  this.S = c;
	  this.f = new vm({Eb: d, Gb: f, Zb: a});
	  this.g = new Yl(b, c, this.Pa);
	  hg(this.g, Z(this, "navigation"));
	  this.Kc = "";
	  this.C = this.Aa = null;
	  this.Ca = ol({getState: function () {
		return g.b;
	  }, Ib: e, Fb: function (h, k) {
		var l = {top: 71, bottom: g.h.innerHeight - 15};
		Od(h, F(g.D().querySelector("." + g.Jc)), k, l);
	  }});
	  Z(this, "watermark").className();
	  this.Jc = Z(this, "content").className();
	  this.Ed = Z(this, "next").className();
	  this.Md = Z(this, "main").className();
	  this.b = b;
	  Em(this);
	  this.Pc = Ob(this, this.f.S.F());
	  this.Hc = Ob(this);
	  nb(this, this.g.l, function (h) {
		var k = Yc(g.b);
		h == k ? g.Mb(false) : (g.g.f = true, g.Mb(true));
		g.Hc.dispatch(h);
	  });
	  this.Nc = Ob(this);
	  this.Oc = Ob(this);
	  this.hb = Ob(this, this.f.ha);
	  this.Mc = this.b.fa;
	  this.Ba = true;
	  this.l = 0;
	  this.Ic = new wb;
	  this.ha = new wb;
	  new wb;
	  !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform) && (lb(this, this.h, "resize", function () {
		Fm(g);
	  }), lb(this, this.h, "scroll", function () {
		Fm(g);
	  }), lb(this, this.h, "orientationchange", function () {
		setTimeout(function () {
		  return g.h.scrollTo(0, 0);
		}, 500);
	  }));
	  lb(this, this.h, "orientationchange", function () {
		g.Pa.Fa();
	  });
	  this.ce = new ResizeObserver(function () {
		Y(g.f, "without-transition", true);
		g.f.move(null, 0);
		g.l = 0;
		Em(g);
	  });
	}
	z(Cm, X);
	r = Cm.prototype;
	r.state = function () {
	  return this.b;
	};
	function Gm(a, b) {
	  a.b = b;
	  b = a.b.fa;
	  var c = a.Mc != b;
	  Em(a);
	  c && (a.Mc = b, F(a.D().querySelector("." + a.Jc)).scrollTop = 0);
	  Hm(a);
	  c && (Im(a), Jm(a));
	}
	function Im(a) {
	  var b = F(a.D().querySelector("." + a.Jc));
	  Y(a, "hide-content-scroll", b.scrollHeight == b.clientHeight);
	  b = [];
	  if (a.Aa) {
		var c = a.Aa.D();
		b.push(Pd(c));
	  }
	  a.C && (c = a.C.D(), b.push(Pd(c)));
	  c = a.Ca.D();
	  b.push(Pd(c));
	  b = Qd(b);
	  a.Ic.dispatch();
	  xb(Jd({fb: b, Hb: Am, duration: 600, Xa: a.Ic}), function () {
		Y(a, "hide-content-scroll", false);
	  });
	}
	function Jm(a) {
	  a.ha && a.ha.dispatch();
	  var b = F(ng(a.f, "progress")), c = Gl(b);
	  a.ha.dispatch();
	  xb(Jd({fb: c, Hb: Bm, duration: 850, Xa: a.ha, Yd: function () {
		b.style.transformOrigin = "0 50%";
	  }, Uc: function () {
		b.style.transformOrigin = "";
	  }}), function () {});
	}
	function Em(a) {
	  var b = a.f, c = a.b, d = b.S;
	  d.h = c.Ta;
	  Y(d, "pressed", d.h);
	  c = Yc(c);
	  b.l = c.progress;
	  b.C = c.progress < b.l;
	  Y(b, "floating", 1180 >= window.innerWidth && 739 < window.innerWidth || 739 >= window.innerWidth);
	  W(b);
	  b = a.g;
	  b.b = a.b;
	  $l(b);
	  Y(a, "with-floating-top-panel", 1180 >= window.innerWidth && 739 < window.innerWidth || 739 >= window.innerWidth);
	  b = a.b;
	  b = -1 == b.fa ? b.intro.u : null;
	  a.Aa = b ? new om(b) : null;
	  b = -1 == a.b.fa ? null : Yc(a.b).u;
	  a.Wd(a.C);
	  a.C = null;
	  b && (a.C = new im({u: b, de: a.b.fa, ee: a.b.chapters.length, Ia: a.S.Ia}));
	  b = Yc(a.b).j;
	  c = a.Ca;
	  d = -1 < a.b.fa;
	  d !== c.l && (c.l = d, W(c));
	  c = a.Ca;
	  c.g != b && (c.g = b, W(c));
	  b = a.S.Ha ? a.b.chapters[a.b.fa + 1] || null : null;
	  a.Kc = b ? I("Roll.Player.GotoNextChapterLink", {title: b.u.title || I("Roll.Common.ChapterDefaultTitle")}) : "";
	  W(a);
	}
	function Hm(a) {
	  var b = F(a.D().querySelector("." + a.Jc)), c = ng(a, "next");
	  b = Math.max(0, Math.min(1, Math.ceil(b.scrollTop + b.clientHeight) / (b.scrollHeight - (c ? c.clientHeight : 0))));
	  a.Oc.dispatch(b);
	}
	function Fm(a) {
	  var b = a.h.innerHeight;
	  a.D().style.height = b + "px";
	  a.g.D().style.height = b + "px";
	}
	r.Jd = function (a) {
	  Hm(this);
	  if (1180 >= window.innerWidth && 739 < window.innerWidth || 739 >= window.innerWidth) if (a.preventDefault(), Y(this.f, "without-transition", false), a = Math.max(a.target.scrollTop, 0), a >= this.l) 53 < a && (this.f.move(null, -Math.min(a, 53)), this.l = a); else if (a < this.l) {
		if (53 >= a) {
		  Y(this.f, "without-transition", true);
		  var b = Math.abs(parseFloat(F(this.f.D().style.top))) || 0;
		  this.f.move(null, -Math.min(a, b));
		  this.l = a;
		}
		56 < this.l - a && (this.f.move(null, 0), this.l = a);
	  }
	};
	r.Id = function () {
	  var a = this;
	  this.ce.observe(this.D());
	  !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform) && Fm(this);
	  Hm(this);
	  if (/Firefox/.test(navigator.userAgent)) {
		var b = function () {
		  Fd(function () {
			Hm(a);
			b();
		  });
		};
		b();
	  }
	};
	r.Mb = function (a) {
	  var b = this;
	  1180 < window.innerWidth || !this.Ba || (this.Ba = void 0 === a ? false : a, nb(this, ig(this.g, "transitionend"), function () {
		b.Ba = true;
		W(b);
	  }), this.Pc.dispatch());
	};
	function Km(a) {
	  var b = a.S.Ha && (a.b.chapters[a.b.fa + 1] || null) ? Ce(Pf)({style: "primary", ya: "textAndIcon", text: I("Roll.Player.Continue"), icon: T(Vf), F: function () {
		return a.Nc.dispatch();
	  }, size: "xLarge"}) : Ce(Pf)({style: "primary", ya: "text", text: I("Roll.Player.Complete"), F: function () {
		return a.hb.dispatch();
	  }, size: "xLarge"});
	  b.classList.add(a.Ed);
	  return b;
	}
	r.W = function () {
	  var a = Zf(["overlay"]), b = Zf(["next-section-content-container"]), c = Zf(["next-section-label"]), d = Zf(["copying-disabled"]);
	  d = this.S.Ra ? kg(this) : kg(this) + " " + d;
	  return this.na(xm, "data-root", d, this.Id, this.g, this.Md, this.f, this.Jc, this.Jd, this.Aa, this.C, this.Ca, this.S.Ha ? mg(this, "next")(zm, b, c, this.Kc, Km(this)) : null, (1180 >= window.innerWidth && 739 < window.innerWidth || 739 >= window.innerWidth) && this.b.Ta || !this.Ba ? mg(this, "overlay")(ym, a, {ontouchstart: this.Mb}, this.Mb) : null, this.Pa);
	};
	function Lm(a) {
	  var b = a.Ye, c = void 0 === a.Eb ? false : a.Eb, d = a.ef, e = a.Gb;
	  a = a.Zb;
	  Nb.call(this);
	  var f = this;
	  this.b = zd(b, d);
	  b = new Ed(b.R);
	  this.onSelectedSectionChange = Ob(this);
	  this.onSectionProgressChange = Ob(this);
	  this.f = pb(this, new Cm({state: this.b, Ib: function (g) {
		return Mm(f, g);
	  }, Eb: c, R: b, Gb: e, Zb: a}));
	  this.onClosePlayerRequest = Ob(this, this.f.hb);
	  nb(this, this.f.Pc, function () {
		return Nm(f);
	  });
	  nb(this, this.f.Hc, function (g) {
		return Om(f, g);
	  });
	  nb(this, this.f.Nc, function () {
		return Pm(f);
	  });
	  nb(this, this.f.Oc, function (g) {
		Qm(f, g);
		f.onSectionProgressChange.dispatch();
	  });
	  c = $b(function () {
		return Rm(f);
	  });
	  this.m = 0;
	  lb(this, window, "resize", c.call);
	  Rm(this);
	}
	z(Lm, Nb);
	r = Lm.prototype;
	r.getTitle = function () {
	  return this.b.intro.u.title || I("Roll.Common.IntroDefaultTitle");
	};
	r.getChaptersCount = function () {
	  return this.b.chapters.length;
	};
	r.getCurrentSectionIndex = function () {
	  return this.b.fa;
	};
	r.getCurrentSectionProgress = function () {
	  return Yc(this.b).progress;
	};
	r.getCurrentSectionsStateProgress = function () {
	  return this.b.chapters.map(function (a) {
		return 1 === a.progress;
	  });
	};
	r.getSuspendData = function () {
	  var a = Dd(this.f.state()), b = vd.Type, c = b.verify(a);
	  if (c) throw Error(c);
	  a = b.fromObject(a);
	  b = b.encode(a).finish();
	  a = new Uint8Array(new Uint32Array([1]).buffer);
	  b = new Uint8Array(y(a).concat(y(b)));
	  var d = void 0 === d ? 0 : d;
	  var e = void 0 === e ? b.length : e;
	  a = null;
	  c = [];
	  for (var f = 0, g = 0, h; d < e;) {
		var k = b[d++];
		switch (g) {
		  case 0:
			c[f++] = cc[k >> 2];
			h = (k & 3) << 4;
			g = 1;
			break;
		  case 1:
			c[f++] = cc[h | k >> 4];
			h = (k & 15) << 2;
			g = 2;
			break;
		  case 2:
			c[f++] = cc[h | k >> 6], c[f++] = cc[k & 63], g = 0;
		}
		8191 < f && ((a || (a = [])).push(String.fromCharCode.apply(String, y(c))), f = 0);
	  }
	  g && (c[f++] = cc[h], c[f++] = 61, 1 === g && (c[f++] = 61));
	  a ? (f && a.push(String.fromCharCode.apply(String, y(c.slice(0, f)))), d = a.join("")) : d = String.fromCharCode.apply(String, y(c.slice(0, f)));
	  return d;
	};
	r.getArticle = function () {
	  var a = this.b.chapters.map(function (b) {
		return {key: b.key, title: b.u.title};
	  });
	  return {intro: {key: this.b.intro.key, title: this.b.intro.u.title}, chapters: a};
	};
	function Rm(a) {
	  var b = void 0 === b ? true : b;
	  var c = window.innerWidth;
	  if (!(1180 < a.m && 1180 < window.innerWidth)) {
		a.m = c;
		var d = 1180 < c;
		Mm(a, function (e) {
		  d == e.Ta ? d && (e = a.f, W(e), $l(e.g)) : (b || (a.f.g.f = true), e.Ta != d && (e.Ta = d));
		});
	  }
	}
	function Mm(a, b) {
	  var c = bc(a.b, function (d) {
		b(d);
	  });
	  a.b != c && (a.b = c, Gm(a.f, c), a.onSelectedSectionChange.dispatch());
	}
	function Om(a, b) {
	  Mm(a, function (c) {
		c.fa = b.key == c.intro.key ? -1 : c.chapters.findIndex(function (d) {
		  return d.key == b.key;
		});
	  });
	}
	function Pm(a) {
	  Mm(a, function (b) {
		var c = b.chapters[b.fa + 1] || null;
		c && (b.fa = c.key == b.intro.key ? -1 : b.chapters.findIndex(function (d) {
		  return d.key == c.key;
		}));
	  });
	}
	function Qm(a, b) {
	  Mm(a, function (c) {
		c = Yc(c);
		isNaN(b) || c.progress >= b || (c.progress = b);
	  });
	}
	function Nm(a) {
	  Mm(a, function (b) {
		b.Ta = !b.Ta;
	  });
	}
	r.D = function () {
	  return this.f.D();
	};
	function Sm(a) {
	  var b = document.createElement("div");
	  b.setAttribute("data-root", "");
	  "popup" == a && b.classList.add("xced93__popup-layer");
	  return nf[a] = b;
	}
	;
	function Tm(a, b) {
	  return new Promise(function (c, d) {
		if ("undefined" === typeof a.arrayBuffer) {
		  var e = new FileReader;
		  eb(e, "loadend", function () {
			e.result || d();
			c(Um(e.result, b));
		  });
		  eb(e, "error", d);
		  e.readAsArrayBuffer(a);
		} else a.arrayBuffer().then(function (f) {
		  return c(Um(f, b));
		}).catch(d);
	  });
	}
	function Um(a, b) {
	  var c = new Uint32Array(a.slice(0, Uint32Array.BYTES_PER_ELEMENT))[0];
	  a = new Uint8Array(a.slice(Uint32Array.BYTES_PER_ELEMENT));
	  b = b(c).Type;
	  a = b.decode(a);
	  b = b.toObject(a);
	  return {version: c, data: b};
	}
	;
	function Vm(a) {
	  this.keys = a;
	}
	function Wm(a) {
	  return new Vm(a);
	}
	;
	function Xm(a, b, c) {
	  if (Array.isArray(a)) return a.map(function (f) {
		return Xm(f, b, c);
	  });
	  var d = b instanceof Vm ? b.keys : null;
	  if (d) return Ua(a, function (f) {
		return Xm(f, F(d), c);
	  });
	  if (La(a)) {
		var e = {};
		Ta(a, function (f, g) {
		  a: {
			for (var h = t(Object.keys(b)), k = h.next(); !k.done; k = h.next()) {
			  k = k.value;
			  var l = b;
			  var m = l[k];
			  m ? l = "string" == typeof m ? {wc: m, ob: l} : {wc: ((m instanceof Vm ? m.keys : null) || m)._, ob: m} : (E("key not found: " + k + ", path: " + c.join(".")), l = {wc: k, ob: l});
			  m = l.ob;
			  if (l.wc === g && "_" !== k) {
				g = {key: k, ob: m};
				break a;
			  }
			}
			E("cant find value: " + g + ", path: " + c.join("."));
			g = {key: g, ob: b};
		  }
		  h = g.key;
		  e[h] = Xm(f, g.ob, y(c).concat([h]));
		});
		return e;
	  }
	  return a;
	}
	;
	var Ym = {}, Zm = (Ym["#"] = "#", Ym);
	function $m(a) {
	  if ("object" === typeof a && a && a.hasOwnProperty("#")) {
		var b = a["#"];
		a = [];
		var c = !b.length || "#" === b[0] || "number" != typeof b[0] || isNaN(b[0]) ? void 0 : b[0], d = b.length && "#" !== b[0] && "string" == typeof b[0] ? b[0] : 1 < b.length && "#" !== b[1] && "string" == typeof b[1] ? b[1] : void 0, e = b[2], f = b[3], g = b[4];
		b = b[5];
		"#" === c || "number" !== typeof c || isNaN(c) || (c & 1 && a.push({name: "bold"}), c & 2 && a.push({name: "italic"}), c & 4 && a.push({name: "underline"}), c & 8 && a.push({name: "strikethrough"}));
		"#" === e || "number" !== typeof e || isNaN(e) || a.push({name: "fontSize", size: e});
		"#" !== f && "string" == typeof f && a.push({name: "fontColor", color: f});
		"#" !== g && "string" == typeof g && a.push({name: "textHighlightColor", color: g});
		"#" === b || "number" !== typeof b || isNaN(b) || a.push({name: "textHighlightOpacity", opacity: b});
		return nc({style: a, url: d});
	  }
	}
	;
	var an = {text: "t", sa: Object.assign({}, {_: "m"}, Zm), length: "l"}, bn = {key: "k", type: "t", N: "v", textAlign: "tA", B: Object.assign({}, {_: "c"}, an), bb: "iO"}, cn = {type: "t", src: "s", key: "k", width: "w", height: "h", w: "a", B: Object.assign({}, {_: "c"}, an), va: "iB"}, dn = Object.assign({}, cn, {Xb: "cK"}), en = {type: "t", key: "k", w: "a", images: Object.assign({}, {_: "is"}, dn, {length: "l"})}, fn = {type: "t", src: "s", key: "k", width: "w", height: "h", w: "a", B: Object.assign({}, {_: "c"}, an)}, gn = {type: "t", src: "s", key: "k", fileName: "fn", lb: "fe", fileSize: "fs", uc: "iL"};
	var hn = {T: {_: "b", order: {_: "o", length: "l"}, A: Wm(Object.assign({}, {_: "B"}, bn))}};
	var jn = {ka: {_: "ch", key: "k", content: Object.assign({}, {_: "c"}, hn), L: "cr", length: "l"}}, kn = {type: "t", L: Object.assign({}, {_: "c"}, hn), Ga: Object.assign({}, {_: "i"}, hn), o: Object.assign({}, {_: "a"}, hn)}, ln = {key: "k", type: "t", description: Object.assign({}, {_: "d"}, hn), M: Object.assign({}, {_: "a"}, {type: "t", width: "w", height: "h", src: "s"}), content: Object.assign({}, {_: "c"}, jn, {Da: "cs", ia: {_: "a", key: "k", text: "t", length: "l"}}), V: Object.assign({}, {_: "f"}, kn)}, mn = {type: "t", key: "k", R: {_: "ss", ab: "iip", Ma: "sa", H: "sca"}, Z: Object.assign({}, {_: "q"}, ln)};
	var nn = {T: {_: "b", order: {_: "o", length: "l"}, A: Wm(Object.assign({}, {_: "B"}, bn, cn, fn, gn, mn))}};
	var on = {u: {_: "h", aa: "k", title: "t", qa: {_: "c", src: "s", width: "w", height: "h", color: "c", opacity: "o", va: "i"}}, j: Object.assign({}, {_: "cs"}, nn)}, pn = {key: "k", u: {_: "h", title: "t"}, j: Object.assign({}, {_: "cs"}, nn)}, qn = {intro: Object.assign({}, {_: "i"}, on), chapters: {_: "c", order: {_: "o", length: "l"}, A: Wm(Object.assign({}, {_: "B"}, pn))}}, rn = {Cb: {_: "m", cb: "nT", Ia: "nE", Ha: "nbE", Ra: "cE"}, kb: {_: "d", Tc: "aC", qc: "hF", ec: "cF"}};
	var sn = {T: {_: "b", order: {_: "o", length: "l"}, A: Wm(Object.assign({}, {_: "B"}, bn, en, fn, gn, mn))}}, tn = {u: {_: "h", aa: "k", title: "t", qa: {_: "c", src: "s", width: "w", height: "h", color: "c", opacity: "o", va: "i"}}, j: Object.assign({}, {_: "cs"}, sn)}, un = {key: "k", u: {_: "h", title: "t"}, j: Object.assign({}, {_: "cs"}, sn)}, vn = {intro: Object.assign({}, {_: "i"}, tn), chapters: {_: "c", order: {_: "o", length: "l"}, A: Wm(Object.assign({}, {_: "B"}, un))}};
	var wn = {U: {_: "cp", top: "tp", left: "lf", right: "rt", bottom: "bm"}}, xn = Object.assign({}, en, {images: Object.assign({}, en.images, wn)}), yn = Object.assign({}, mn, {Z: Object.assign({}, mn.Z, {M: Object.assign({}, mn.Z.M, wn)})}), zn = {T: {_: "b", order: {_: "o", length: "l"}, A: Wm(Object.assign({}, {_: "B"}, bn, fn, gn, yn, xn))}}, An = {u: {_: "h", aa: "k", title: "t", qa: {_: "c", src: "s", width: "w", height: "h", color: "c", opacity: "o", va: "i"}}, j: Object.assign({}, {_: "cs"}, zn)}, Bn = {key: "k", u: {_: "h", title: "t"}, j: Object.assign({}, {_: "cs"}, zn)}, Cn = {intro: Object.assign({}, {_: "i"}, An), chapters: {_: "c", order: {_: "o", length: "l"}, A: Wm(Object.assign({}, {_: "B"}, Bn))}};
	var Dn = Object.assign({}, yn, {Z: Object.assign({}, yn.Z, {M: Object.assign({}, yn.Z.M, {title: "tl", Yb: "pws"})})}), En = {T: {_: "b", order: {_: "o", length: "l"}, A: Wm(Object.assign({}, {_: "B"}, bn, fn, gn, xn, Dn))}}, Fn = {u: {_: "h", aa: "k", title: "t", qa: {_: "c", src: "s", width: "w", height: "h", color: "c", opacity: "o", va: "i"}}, j: Object.assign({}, {_: "cs"}, En)}, Gn = {key: "k", u: {_: "h", title: "t"}, j: Object.assign({}, {_: "cs"}, En)}, Hn = {intro: Object.assign({}, {_: "i"}, Fn), chapters: {_: "c", order: {_: "o", length: "l"}, A: Wm(Object.assign({}, {_: "B"}, Gn))}};
	function In(a) {
	  switch (a) {
		case 4:
		  return rn;
		case 5:
		  return rn;
		case 6:
		  return rn;
		case 7:
		  return rn;
		default:
		  throw Error("cannot decode json document with version " + a);
	  }
	}
	;
	function Jn(a) {
	  switch (a) {
		case 4:
		  return qn;
		case 5:
		  return vn;
		case 6:
		  return Cn;
		case 7:
		  return Hn;
		default:
		  throw Error("cannot decode json document with version " + a);
	  }
	}
	;
	var Kn = Q({start: M(1, "int32"), end: M(2, "int32"), style: M(3, "string")}), Ln = Q({start: M(1, "int32"), end: M(2, "int32"), url: M(3, "string")}), Mn = Q({text: M(1, "string"), J: R(2, Kn), urls: R(3, Ln)}), Nn = Q({src: M(1, "string"), width: M(2, "int32"), height: M(3, "int32")}), On = Q({src: M(1, "string"), width: M(2, "int32"), height: M(3, "int32")}), Pn = id({i: On, e: Nn}), Qn = Q({key: M(1, "string"), text: M(2, Mn), L: M(3, "bool")}), Rn = Q({ka: R(1, Qn)}), Sn = Q({ka: R(1, Qn)}), Tn = Q({key: M(1, "string"), text: M(2, "string")}), Un = Q({Da: M(1, "bool"), ia: R(2, Tn)}), Vn = Q({type: M(1, "string"), L: M(2, Mn), Ga: M(3, Mn), o: M(4, Mn)}), Wn = Q({ab: M(1, "bool"), Ma: M(2, "bool"), H: M(3, "bool")}), Xn = Q({key: M(1, "string"), description: M(2, Mn), M: S(3, Pn), content: M(4, Rn), V: M(5, Vn)}), Yn = Q({key: M(1, "string"), description: M(2, Mn), M: S(3, Pn), content: M(4, Sn), V: M(5, Vn)}), Zn = Q({key: M(1, "string"), description: M(2, Mn), M: S(3, Pn), content: M(4, Un), V: M(5, Vn)}), $n = id({mc: Xn, mr: Yn, ti: Zn}), ao = Q({key: M(1, "string"), R: M(2, Wn), Z: R(3, $n)});
	var bo = Q({start: M(1, "int32"), end: M(2, "int32"), url: M(3, "string")}), co = Q({start: M(1, "int32"), end: M(2, "int32"), style: M(3, "string")}), eo = Q({key: M(1, "string"), text: M(2, "string"), N: M(3, "string"), J: R(4, co), urls: R(5, bo)}), fo = Q({key: M(1, "string"), src: M(2, "string"), width: M(3, "int32"), height: M(4, "int32"), w: M(5, "string"), text: M(6, "string"), J: R(7, co), urls: R(8, bo)}), go = Q({key: M(1, "string"), src: M(2, "string"), width: M(3, "int32"), height: M(4, "int32"), w: M(5, "string"), text: M(6, "string"), J: R(7, co), urls: R(8, bo)}), ho = {}, io = id((ho.p = eo, ho.i = fo, ho.e = go, ho.E = ao, ho)), jo = Q({intro: M(1, {aa: M(1, "string"), title: M(2, "string"), kc: S(3, L), lc: S(4, N), ic: S(5, N), A: R(6, io), hc: S(7, L), jc: S(8, gd)}), chapters: R(2, {key: M(1, "string"), title: M(2, "string"), A: R(3, io)})});
	var ko = {}, lo = {}, mo = Q({content: M(1, jo), yc: M(2, {cb: M(1, "string"), qd: M(2, "bool"), Ia: M(3, "bool"), Ha: M(4, "bool"), Ra: S(6, O), fonts: M(5, (ko.tooltip = M(1, "string"), ko.playerMain = M(2, "string"), ko.content = M(3, "string"), ko))}), $c: M(3, (lo.ACCENT_COLOR = M(1, "string"), lo.CONTENT_FONT = M(2, "string"), lo.PLAYER_MAIN_FONT = M(3, "string"), lo))}), no = new fc(mo);
	var oo = Q({start: M(1, "int32"), end: M(2, "int32"), style: M(3, {name: M(1, "string"), size: S(2, N), color: S(3, L), opacity: S(4, gd)})}), po = Q({start: M(1, "int32"), end: M(2, "int32"), url: M(3, "string")}), qo = Q({text: M(1, "string"), J: R(2, oo), urls: R(3, po)}), ro = Q({src: M(1, "string"), width: M(2, "int32"), height: M(3, "int32")}), so = Q({src: M(1, "string"), width: M(2, "int32"), height: M(3, "int32")}), to = id({i: so, e: ro}), uo = Q({key: M(1, "string"), text: M(2, qo), L: M(3, "bool")}), vo = Q({ka: R(1, uo)}), wo = Q({ka: R(1, uo)}), xo = Q({key: M(1, "string"), text: M(2, "string")}), yo = Q({Da: M(1, "bool"), ia: R(2, xo)}), zo = Q({type: M(1, "string"), L: M(2, qo), Ga: M(3, qo), o: M(4, qo)}), Ao = Q({ab: M(1, "bool"), Ma: M(2, "bool"), H: M(3, "bool")}), Bo = Q({key: M(1, "string"), description: M(2, qo), M: S(3, to), content: M(4, vo), V: M(5, zo)}), Co = Q({key: M(1, "string"), description: M(2, qo), M: S(3, to), content: M(4, wo), V: M(5, zo)}), Do = Q({key: M(1, "string"), description: M(2, qo), M: S(3, to), content: M(4, yo), V: M(5, zo)}), Eo = id({mc: Bo, mr: Co, ti: Do}), Fo = Q({key: M(1, "string"), R: M(2, Ao), Z: R(3, Eo)});
	var Go = Q({start: M(1, "int32"), end: M(2, "int32"), style: M(3, {name: M(1, "string"), size: S(2, N), color: S(3, L), opacity: S(4, gd)})}), Ho = Q({key: M(1, "string"), text: M(2, "string"), N: M(3, "string"), J: R(4, Go), urls: R(5, bo), textAlign: S(6, L), bb: S(7, O)}), Io = Q({key: M(1, "string"), src: M(2, "string"), width: M(3, "int32"), height: M(4, "int32"), w: M(5, "string"), text: M(6, "string"), J: R(7, Go), urls: R(8, bo)}), Jo = Q({key: M(1, "string"), src: M(2, "string"), width: M(3, "int32"), height: M(4, "int32"), w: M(5, "string"), text: M(6, "string"), J: R(7, Go), urls: R(8, bo)}), Ko = Q({key: M(1, "string"), fileName: M(2, "string"), lb: M(3, "string"), fileSize: M(4, "int32")}), Lo = {}, Mo = id((Lo.p = Ho, Lo.i = Io, Lo.e = Jo, Lo.E = Fo, Lo.a = Ko, Lo)), No = Q({intro: M(1, {aa: M(1, "string"), title: M(2, "string"), kc: S(3, L), lc: S(4, N), ic: S(5, N), A: R(6, Mo), hc: S(7, L), jc: S(8, gd)}), chapters: R(2, {key: M(1, "string"), title: M(2, "string"), A: R(3, Mo)})});
	var Oo = {}, Po = {}, Qo = Q({content: M(1, No), yc: M(2, {cb: M(1, "string"), qd: M(2, "bool"), Ia: M(3, "bool"), Ha: M(4, "bool"), Ra: S(6, O), fonts: M(5, (Oo.tooltip = M(1, "string"), Oo.playerMain = M(2, "string"), Oo.content = M(3, "string"), Oo))}), $c: M(3, (Po.ACCENT_COLOR = M(1, "string"), Po.CONTENT_FONT = M(2, "string"), Po.PLAYER_MAIN_FONT = M(3, "string"), Po))}), Ro = new fc(Qo);
	function So() {
	  var a = {Le: 1, sf: [{Va: 2, rb: To}, {Va: 3, rb: Uo}, {Va: 4, rb: Vo}, {Va: 5, rb: Wo}, {Va: 6, rb: Xo}, {Va: 7, rb: Yo}]}, b = this, c = a.Le, d = a.sf;
	  a = void 0 === a.we ? [] : a.we;
	  this.s = c;
	  this.b = new Map;
	  d.forEach(function (e, f) {
		if (c != e.Va - f - 1) throw Error();
		b.b.set(e.Va, e.rb);
	  });
	  this.f = new Map;
	  a.forEach(function (e) {
		return b.f.set(e.Va, e.Ag);
	  });
	}
	function Zo(a, b, c) {
	  a = a.f.get(c);
	  c = {document: b, fixed: false};
	  a && (c = a(b));
	  return {document: c.document, fixed: c.fixed};
	}
	;
	function To(a) {
	  a.yc.Ra = true;
	  return a;
	}
	;
	function $o(a) {
	  a.J && a.J.forEach(function (b) {
		b.style = {name: b.style};
	  });
	  a.urls && a.urls.forEach(function (b) {
		b = {start: b.start, end: b.end, style: {name: "underline"}};
		a.J ? a.J.push(b) : a.J = [b];
	  });
	}
	function ap(a) {
	  $o(a);
	  a.textAlign = "pullquote" === a.N ? "center" : "left";
	}
	function bp(a) {
	  var b = null;
	  a.forEach(function (c) {
		"p" === c.type ? (ap(c), "ol" !== c.N || b && "ol" === b || (c.bb = true), b = c.N) : ("i" === c.type ? $o(c) : "e" === c.type ? $o(c) : "E" === c.type && c.Z && c.Z.forEach(function (d) {
		  $o(d.description);
		  ("mc" === d.type || "mr" === d.type) && d.content.ka && d.content.ka.forEach(function (e) {
			return $o(e.text);
		  });
		  $o(d.V.o);
		  $o(d.V.L);
		  $o(d.V.Ga);
		}), b = null);
	  });
	}
	;
	function Uo(a) {
	  bp(a.content.intro.A);
	  a.content.chapters && a.content.chapters.forEach(function (b) {
		bp(b.A);
	  });
	  return a;
	}
	;
	function cp(a) {
	  var b = a.text, c = a.J;
	  a = a.urls;
	  var d = nc(), e = y(b).concat().map(function (f) {
		return {text: f, sa: d};
	  });
	  c && c.forEach(function (f) {
		for (var g = f.start; g < f.end; ++g) {
		  if (g >= e.length) {
			Ia("incorrect style ranges");
			break;
		  }
		  var h = e[g];
		  var k = e[g].sa;
		  k = nc(Object.assign({}, k, {style: kc(k.style, f.style)}));
		  h.sa = k;
		}
	  });
	  a && a.forEach(function (f) {
		for (var g = f.start; g < f.end; ++g) {
		  if (g >= e.length) {
			Ia("incorrect url ranges");
			break;
		  }
		  e[g].sa = nc(Object.assign({}, e[g].sa, {url: f.url}));
		}
	  });
	  return e;
	}
	;
	function dp(a, b) {
	  return a.map(function (c) {
		var d = c.type, e = c.M, f = b ? rc() : c.key, g = cp({text: c.description.text, J: c.description.J, urls: c.description.urls});
		if (e) {
		  var h = Object.assign({}, {type: e.type, width: e.width, height: e.height, src: e.src}, {U: e.U || void 0, title: e.title || void 0, Yb: e.Yb || void 0});
		  e = h.U;
		  var k = h.title, l = h.Yb;
		  h = {type: h.type, width: h.width, height: h.height, src: h.src};
		  e && (h = Object.assign({}, h, {U: e}));
		  k && (h = Object.assign({}, h, {title: k}));
		  l && (h = Object.assign({}, h, {Yb: l}));
		  e = h;
		} else e = void 0;
		a: switch (k = c.content, d) {
		  case "mc":
		  case "mr":
			k = fp(k, b);
			break a;
		  case "ti":
			k = gp(k, b);
			break a;
		  default:
			throw H(d), Error("Unknown question type: " + d);
		}
		c = c.V;
		c = Gc({type: c.type, L: cp({text: c.L.text, J: c.L.J, urls: c.L.urls}), Ga: cp({text: c.Ga.text, J: c.Ga.J, urls: c.Ga.urls}), o: cp({text: c.o.text, J: c.o.J, urls: c.o.urls})});
		return Ic({key: f, type: d, description: g, M: e, content: k, V: c});
	  });
	}
	function fp(a, b) {
	  a = (a = a.ka) ? a.map(function (c) {
		return Bc({key: b ? rc() : c.key, text: cp({text: c.text.text, J: c.text.J, urls: c.text.urls}), L: c.L});
	  }) : [];
	  return Dc({ka: a});
	}
	function gp(a, b) {
	  var c = a.ia;
	  c = c ? c.map(function (d) {
		return Ec({key: b ? rc() : d.key, text: d.text});
	  }) : [];
	  return Fc({Da: a.Da, ia: c});
	}
	;
	function hp(a) {
	  switch (a.type) {
		case "p":
		  return wc({key: a.key, N: a.N, textAlign: a.textAlign, B: cp({text: a.text, J: a.J, urls: a.urls}), bb: a.bb});
		case "i":
		  var b = {key: a.key, B: cp({text: a.text || "", J: a.J, urls: a.urls}), src: a.src, width: a.width, height: a.height, w: a.w};
		  b = void 0 === b ? {} : b;
		  return Object.assign({}, Lc(b), {type: "i", src: b.src || "", va: b.va || false, U: b.U || void 0});
		case "e":
		  return b = {key: a.key, B: cp({text: a.text || "", J: a.J || [], urls: a.urls}), src: a.src, width: a.width, height: a.height, w: a.w}, b = void 0 === b ? {} : b, Object.assign({}, Lc(b), {type: "e", width: b.width || 0, height: b.height || 0, src: b.src || "", w: b.w || "inner"});
		case "E":
		  var c = void 0 === c ? false : c;
		  b = (b = a.Z) ? dp(b, c) : [];
		  c = c ? rc() : a.key;
		  a = a.R;
		  a = Jc({ab: a.ab, H: a.H, Ma: a.Ma});
		  b = {key: c, R: a, Z: b};
		  c = b = void 0 === b ? {} : b;
		  b = void 0 === c.key ? rc() : c.key;
		  a = void 0 === c.R ? Jc() : c.R;
		  c = void 0 === c.Z ? [Ic({type: "mc"})] : c.Z;
		  return {key: b, type: "E", R: a, Z: c};
		case "a":
		  b = {key: a.key, fileName: a.fileName, fileSize: a.fileSize, lb: a.lb};
		  a = b.fileName;
		  c = b.lb;
		  var d = b.fileSize, e = b.src, f = b.uc;
		  return {key: b.key || rc(), type: "a", fileName: a || "", lb: c || "pdf", fileSize: d || 0, src: e, uc: f || false};
	  }
	  E("unknown block type " + a.type);
	  return null;
	}
	function ip(a) {
	  var b = [];
	  a.forEach(function (c) {
		(c = hp(c)) && b.push(c);
	  });
	  return b;
	}
	;
	function jp(a) {
	  var b = ip(a);
	  a = {order: [], A: {}};
	  b = t(b);
	  for (var c = b.next(); !c.done; c = b.next()) c = c.value, a.order.push(c.key), a.A[c.key] = c;
	  return {T: a};
	}
	function kp(a) {
	  var b = a.aa, c = a.title, d = null;
	  a.kc && a.hc && void 0 != a.lc && void 0 != a.ic && void 0 != a.jc && (d = {src: a.kc, width: a.lc, height: a.ic, color: a.hc, opacity: a.jc, va: false});
	  return {u: {aa: b, title: c, qa: d}, j: jp(a.A)};
	}
	function lp(a) {
	  var b = kp(a.intro);
	  a = (a.chapters || []).map(function (c) {
		return {key: c.key, u: {title: c.title}, j: jp(c.A)};
	  });
	  return {intro: b, chapters: hc(a, function (c) {
		return c.key;
	  })};
	}
	;
	function Vo(a) {
	  var b = lp(a.content), c = a.yc;
	  return {content: b, R: {Cb: {cb: c.cb, Ia: c.Ia, Ha: c.Ha, Ra: c.Ra}, kb: {Tc: a.$c.ACCENT_COLOR, qc: c.fonts.playerMain, ec: c.fonts.content}}};
	}
	;
	function mp(a) {
	  a = a.A;
	  for (var b = t(Object.keys(a)), c = b.next(); !c.done; c = b.next()) {
		c = c.value;
		var d = a[c];
		"i" === d.type ? (d = a[c], d = {w: d.w, key: d.key, type: "c", images: [{key: rc(), type: d.type, Xb: d.key, width: d.width, height: d.height, src: d.src, B: d.B, va: d.va, w: "inner"}]}, a[c] = d) : "e" === d.type ? (d = a[c], a[c] = {key: d.key, type: d.type, width: d.width, height: d.height, src: d.src, w: d.w, B: d.B}) : a[c] = d;
	  }
	}
	function np(a) {
	  return bc(a, function (b) {
		mp(b.intro.j.T);
		b = t(Object.values(b.chapters.A));
		for (var c = b.next(); !c.done; c = b.next()) (c = c.value) && mp(c.j.T);
	  });
	}
	;
	function Wo(a) {
	  var b = a.R;
	  return {content: np(a.content), R: b};
	}
	;
	;
	;
	function op(a, b) {
	  var c = new So;
	  if (7 == b) c = Zo(c, a, 7), c = {Ec: c.document, Me: c.fixed}; else {
		if (b < c.s || 7 > c.s + c.b.size) throw Error();
		var d = Zo(c, a, b);
		a = d.document;
		var e = d.fixed;
		for (b += 1; 7 >= b; ++b) a = F(c.b.get(b))(a), d = Zo(c, a, b), a = d.document, e = e || d.fixed;
		c = {Ec: a, Me: e};
	  }
	  return c;
	}
	;
	function pp(a) {
	  var b, c, d, e;
	  return Ba(new Aa(new wa(function (f) {
		if (1 == f.b) return va(f, Tm(a, function (g) {
		  switch (g) {
			case 1:
			  return no;
			case 2:
			  return no;
			case 3:
			  return Ro;
			default:
			  throw Error("invalid blob document format");
		  }
		}), 2);
		c = b = f.s;
		d = c.version;
		e = c.data;
		return f.return(op(e, d).Ec);
	  })));
	}
	function qp(a) {
	  var b;
	  return Ba(new Aa(new wa(function (c) {
		if (a instanceof Blob) b = pp(a); else {
		  if ("content" in a && "settings" in a && "version" in a) {
			var d = a.version;
			var e = a.settings;
			var f = a.content;
			var g = Jn(d);
			f = Xm(f, g, []);
			f = Va(f, $m);
			g = In(d);
			e = Xm(e, g, []);
			d = op({content: f, R: e}, d).Ec;
		  } else d = null;
		  b = d;
		}
		return c.return(b);
	  })));
	}
	;
	function rp() {
	  var a;
	  return Ba(new Aa(new wa(function (b) {
		return 1 == b.b ? va(b, Cb("data-1.json"), 2) : 3 != b.b ? (a = b.s) ? b.return(a) : va(b, Db(), 3) : (a = b.s) ? b.return(a) : b.return(null);
	  })));
	}
	function sp(a, b, c, d, e) {
	  Promise.all([Cb(a), rp()]).then(function (f) {
		f = t(f);
		var g = f.next().value;
		f = f.next().value;
		if (!f) throw Error();
		qp(f).then(function (h) {
		  if (!h) throw Error();
		  var k = h.R, l = {ta: k.kb.Tc};
		  Kb(document.documentElement, {"--roll-player-accent-color": l.ta, "--player-main-font": Eb(k.kb.qc), "--content-font": Eb(k.kb.ec)});
		  l = (k = {Xd: l}, k.b);
		  l = void 0 === l ? Xb : l;
		  l = void 0 === l ? Xb : l;
		  Kb(document.documentElement, {"--header-font-family": l.Ce, "--content-font-family": l.le});
		  l = k = Object.assign({}, Ub, k && k.Xd);
		  l = void 0 === l ? Ub : l;
		  l = {"--color-accent-default": l.ta, "--color-accent-8": Vb(l.ta, 0.08), "--color-accent-16": Vb(l.ta, 0.16), "--color-accent-30": Vb(l.ta, 0.3), "--color-accent-60": Vb(l.ta, 0.6), "--color-accent-80": Vb(l.ta, 0.8), "--color-accent-dark": Wb(l.ta), "--color-link-default": l.link, "--color-link-dark": Wb(l.link), "--color-top-panel-background-default": l.xd, "--color-top-panel-text-default": l.yd};
		  Kb(document.documentElement, l);
		  k = {Y: k.ta, qe: k.xd, Rb: k.yd};
		  K = Object.assign({}, k, {vf: "#EB5B47", wf: "#C4C7CA", xf: "#E2422C", yf: "#CB3420", Nd: k.Y, zf: "#C4C7CA", Od: Zb(k.Y, -4), Pd: Zb(k.Y, -8), Af: "#32353729", Bf: "#C4C7CA", Cf: "#D6D7D7", Df: "#EFEFEF", Ef: "#BDBEBF", Ff: "#3235370F", Gf: "#F6F6F7", Hf: "#3235370A", $d: k.Y, Kf: "#C4C7CA", ae: Zb(k.Y, -4), be: Zb(k.Y, -8), Lf: "#EB5B47", Mf: "#D6D7D7", Nf: "#E6E6E7", Of: "#BDBEBF", re: Yb(k.Rb, 0.12), se: Yb(k.Rb, 0.08), te: Yb(k.Rb, 0.72), Qf: "#323537", Rf: "#517CE9", Sf: "#CB3420", Tf: "#983484", Uf: "#BDBEBF", Vf: "#5DC9B5", Wf: "#2984E0", Xf: "#EE5091", Yf: "#745CDE", Zf: "#EFEFEF", $f: "#DEDEDFB8", ag: "#E2422C", bg: "#E2422C3D", cg: "#2985E0", dg: "#2985E03D", eg: "#3CB46E", fg: "#3CB46E3D", gg: "#FFC252", hg: "#FFC2527A", ig: "#EEA811", jg: "#33AFBD", kg: "#80B43C", lg: "#3CB46E", mg: "#FB8B28", ng: "#503AB0", og: "#80B43C", pg: "#983484", qg: "#EEA811", rg: "#1F4198", sg: "#FB8B28", tg: "#B8195B", ug: "#5C247A", vg: "#EE5091", wg: "#745CDE", yg: "#3235371F", zg: "#E6E6E7", Bg: "#FFD6D1", xe: Yb(k.Y, 0.4), Cg: "#FFFFFF", Ee: k.Y, Fe: Zb(k.Y, -4), Ge: Zb(k.Y, -8), Gg: "#E2422C", Hg: "#323537", Ig: "#BDBEBF", Jg: "#2078CF", Kg: "#654BD8", Lg: "#FFFFFF", Mg: "#FFFFFF66", Ng: "#848687", Og: "#6C737B", Pg: "#389F62", Qg: "#FB8B28", Wg: "#32353766", Xg: "#CB3420", Yg: "#323537", Zg: "#FFFFFF66", $g: "#654BD8", ah: "#FFFFFF", bh: "#FFFFFF33", lf: Yb(k.Y, 0.12), mf: Yb(k.Y, 0.2), gh: "#FEE4DF", hh: "#FFD6D1", ih: "#FFF5F5", jh: "#FFFFFF", kh: "#3235370A", lh: "#3235371F", mh: "#D8ECFF", nh: "#C7E3FF", oh: "#ECF5FF", ph: "#EFEFEF", qh: "#E6E6E7", rh: "#F7F7F7", sh: "#E7E2FE", th: "#DED6FC", uh: "#F3F0FF", vh: "#32353729", wh: "#32353714", xh: "#DFF4E8", yh: "#C5ECD5", zh: "#EFF9F3", Ah: "#FFEED4", Bh: "#FFE6C1", Ch: "#FFF6E9", nf: k.Y, pf: Zb(k.Y, -4), qf: Zb(k.Y, -8), Dh: "#E2422C", Eh: "#323537", Fh: "#BDBEBF", Gh: "#295DE0", Hh: "#214FC4", Ih: "#FFFFFF", Jh: "#FFFFFF66", Kh: "#FFFFFFA3", Lh: "#ADAEAF", Mh: "#6C737B", Nh: "#389F63", Oh: "#FB8B28"});
		  Kb(document.documentElement, {"--color-action-primary-default": K.Nd, "--color-action-primary-hovered": K.Od, "--color-action-primary-pressed": K.Pd, "--color-border-accent-default": K.$d, "--color-border-accent-hovered": K.ae, "--color-border-accent-pressed": K.be, "--color-custom-accent": K.Y, "--color-custom-panel-default": K.qe, "--color-custom-panel-hovered": K.re, "--color-custom-panel-subdued": K.se, "--color-custom-text-default": K.Rb, "--color-custom-text-subdued": K.te, "--color-focus-default": K.xe, "--color-icon-accent-default": K.Ee, "--color-icon-accent-hovered": K.Fe, "--color-icon-accent-pressed": K.Ge, "--color-surface-accent-default": K.lf, "--color-surface-accent-hovered": K.mf, "--color-text-accent-default": K.nf, "--color-text-accent-hovered": K.pf, "--color-text-accent-pressed": K.qf});
		  Rb ? (k = Rb, k.b = Object.assign({}, k.b, g)) : (k = new Qb(g), Rb ? Ia("i18n has already been declared") : Rb = k);
		  h = new Lm({Ye: h, ef: c, Gb: d, Zb: e});
		  b(h);
		  document.body.appendChild(h.D());
		  h = Sm("popup");
		  document.body.appendChild(h);
		  h = Sm("tooltip");
		  document.body.appendChild(h);
		});
	  });
	}
	function tp(a, b, c, d, e) {
	  return new Promise(function (f) {
		sp(a, f, c, d, e);
	  });
	}
	var up = ["start"], vp = ab;
	"start" in vp || "undefined" == typeof vp.execScript || vp.execScript("var start");
	for (var wp = void 0; up.length && (wp = up.shift());) !up.length && void 0 !== tp ? vp[wp] = tp : vp[wp] && vp[wp] !== Object.prototype[wp] ? vp = vp[wp] : vp = vp[wp] = {};
  }.call(this));
  