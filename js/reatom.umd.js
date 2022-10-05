!function (n, t) {
	"object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((n = n || self).reatom = {});
  }(this, function (n) {
	function t(n, t) {
	  return {state: n, stateNew: {}, type: t.type, payload: t.payload, changedIds: []};
	}
	var e = function () {
	  function n() {
		this._counter = new Map;
	  }
	  var t = n.prototype;
	  return t.add = function (n) {
		this._counter.set(n, (this._counter.get(n) || 0) + 1);
	  }, t.delete = function (n) {
		var t = this._counter.get(n);
		return 1 === t ? this._counter.delete(n) : (t > 1 && this._counter.set(n, t - 1), false);
	  }, t.forEach = function (n) {
		this._counter.forEach(function (t, e) {
		  return n(e);
		});
	  }, n;
	}(), r = function () {
	  function n(n, t) {
		void 0 === t && (t = false), this.id = n, this.isLeaf = t, this.fnsMap = new Map;
	  }
	  var t = n.prototype;
	  return t._getFns = function (n) {
		return this.fnsMap.get(n) || this.fnsMap.set(n, new e).get(n);
	  }, t.addFn = function (n, t) {
		this._getFns(t).add(n);
	  }, t.union = function (n) {
		var t = this;
		n.fnsMap.forEach(function (n, e) {
		  var r = t._getFns(e);
		  n.forEach(function (n) {
			return r.add(n);
		  });
		});
	  }, t.disunion = function (n, t) {
		var e = this;
		n.fnsMap.forEach(function (n, r) {
		  var i = e._getFns(r);
		  n.forEach(function (n) {
			return i.delete(n) && t(n._ownerAtomId);
		  });
		});
	  }, t.forEach = function (n, t) {
		var e = this.fnsMap.get(n);
		e && e.forEach(function (n) {
		  return n(t);
		});
	  }, n;
	}(), i = Symbol("@@Reatom/TREE"), o = Object.assign, a = Object.is;
	function c(n) {
	  return "symbol" == typeof n ? n.description || n.toString().replace(/Symbol\((.*)\)/, "$1") : n;
	}
	function f(n) {
	  var t = n && n[i];
	  return Boolean(t && !t.isLeaf);
	}
	function s(n) {
	  var t = n && n[i];
	  return Boolean(t && t.isLeaf);
	}
	var d, l = 0;
	function p(n) {
	  return Array.isArray(n) ? ("string" == typeof n[0] && 0 !== n[0].length || h("Invalid name"), n[0]) : "string" == typeof n ? ("string" == typeof n && 0 !== n.length || h("Invalid name"), n) + " [" + ++l + "]" : n;
	}
	function v(n) {
	  return d ? d(n) : p(n);
	}
	function h(n) {
	  throw new Error("[reatom] " + n);
	}
	function m(n) {
	  var t = Object.keys(n);
	  return t.push.apply(t, Object.getOwnPropertySymbols(n)), t;
	}
	function w(n) {
	  void 0 === n && (n = "action");
	  var t = [].slice.call(arguments, 1);
	  "function" == typeof n && (t.unshift(n), n = "action");
	  var e = v(n), a = new r(e, true);
	  a.addFn(o(function () {}, {_ownerAtomId: e}), e);
	  var u = function (n) {
		return {type: e, payload: n, reactions: t};
	  };
	  return u[i] = a, u.getType = function () {
		return e;
	  }, u;
	}
	var b = Symbol("@@Reatom/DEPS"), E = Symbol("@@Reatom/DEPS_SHAPE"), I = w(["@@Reatom/init"]), S = I();
	function _(n, e, f) {
	  f || (f = e, e = n, n = "atom");
	  var d = v(n), l = c(d);
	  void 0 === e && h('Atom "' + l + "\". Initial state can't be undefined");
	  var p = new r(d), y = new Set, m = 0;
	  function w(n, t) {
		"function" != typeof t && h("Invalid reducer"), t;
		var e = m++, r = n && n[i];
		r || h("Invalid dependency");
		var i = r.id, o = s(n);
		p.union(r);
		var c = function (n) {
		  var r = n.state, u = n.stateNew, c = n.payload, f = n.changedIds, s = r[d], p = void 0 === s;
		  if (p || n.type !== S.type || c) {
			var v = u[d], y = void 0 !== v, g = y ? v : s, m = u[i], w = void 0 !== m;
			if (o || w || p) {
			  var b = t(g, o ? c : w ? m : r[i]);
			  if (void 0 === b && h("Invalid state. Reducer number " + e + ' in "' + l + '" atom returns undefined'), y && a(s, b)) return f.splice(f.indexOf(d), 1), void delete u[d];
			  a(g, b) || (y || f.push(d), u[d] = b);
			}
		  }
		};
		if (c._ownerAtomId = d, o) return p.addFn(c, i);
		y.has(i) && h("One of dependencies has the equal id"), y.add(i), r.fnsMap.forEach(function (n, t) {
		  return p.addFn(c, t);
		});
	  }
	  w(I, function (n, t) {
		var r = (void 0 === t ? {} : t)[d];
		return void 0 === r ? e : r;
	  }), f(w);
	  var E = function (n, e) {
		void 0 === n && (n = {}), void 0 === e && (e = S);
		var r = t(n, e);
		return p.forEach(e.type, r), r.changedIds.length > 0 ? o({}, n, r.stateNew) : n;
	  };
	  return E[i] = p, E[b] = y, E;
	}
	function M(n) {
	  for (var t = -1; ++t < n.length;) n[t].apply(n, [].slice.call(arguments, 1));
	}
	n.combine = function (n, t) {
	  1 === arguments.length && (t = n);
	  var e = Array.isArray(t), r = m(t);
	  1 === arguments.length && (n = e ? Symbol("[" + r.map(function (n) {
		return c((t[n] && t[n][i]).id);
	  }).join() + "]") : Symbol("{" + r.map(c).join() + "}"));
	  var i = _(n, e ? [] : {}, function (n) {
		return r.forEach(function (r) {
		  return n(t[r], function (n, t) {
			var i = e ? n.slice(0) : o({}, n);
			return i[r] = t, i;
		  });
		});
	  });
	  return i[E] = t, i;
	}, n.createStore = function (n, e) {
	  var i = new Map, a = i, c = [], d = c, l = new Set, p = {}, v = new r("store");
	  if (void 0 !== n) if ("object" == typeof n && void 0 === e) o(p, n); else {
		f(n) || h("Invalid atom"), "object" == typeof e && null !== e ? o(p, e) : void 0 !== e && h("Invalid initial state"), v.union(n && n[i]);
		var y = t(p, S);
		v.forEach(S.type, y), o(p, y.stateNew), l = new Set(m(y.stateNew));
	  }
	  function w() {
		d === c && (d = c.slice());
	  }
	  function b(n) {
		a === i && (a = new Map, i.forEach(function (t, e) {
		  return a.set(e, n === e ? t.slice() : t);
		}));
	  }
	  var E = {getState: function (n) {
		if (void 0 === n) return o({}, p);
		f(n) || h("Invalid target");
		var e = p[n[i].id];
		if (void 0 !== e) return e;
		var r = t(p, S);
		return (n && n[i]).forEach(S.type, r), r.stateNew[n[i].id];
	  }, subscribe: function (n, e) {
		var r = ("function" != typeof (e || n) && h("Invalid listener"), e || n), i = true;
		if (void 0 === e) return (f(r) || s(r)) && h("Invalid listener"), w(), d.push(r), function () {
		  i && (i = false, w(), d.splice(d.indexOf(r), 1));
		};
		var c = s(n);
		f(n) || c || h("Invalid subscription target");
		var y = n && n[i], m = y.id, E = !c && !l.has(m);
		if (b(m), !a.has(m) && (a.set(m, []), E)) {
		  v.union(y);
		  var I = t(p, S);
		  y.forEach(S.type, I), o(p, I.stateNew);
		}
		return a.get(m).push(r), function () {
		  if (i) {
			i = false, b(m);
			var n = a.get(m);
			n.splice(n.indexOf(r), 1), E && 0 === n.length && (a.delete(m), v.disunion(y, function (n) {
			  a.delete(n), delete p[n];
			}));
		  }
		};
	  }, dispatch: function (n) {
		var e = n.type, r = n.payload, u = n.reactions;
		"object" == typeof n && null !== n && "string" == typeof e || h("Invalid action");
		var f = t(p, n);
		v.forEach(e, f);
		var s = f.changedIds, l = f.stateNew;
		if (i = a, e === S.type && (p = r || {}), s.length > 0) {
		  o(p, l);
		  for (var y = 0; y < s.length; y++) {
			var g = s[y];
			M(i.get(g) || [], l[g]);
		  }
		}
		M(u || [], r, E), M(i.get(e) || [], r), M(c = d, n, l);
	  }, bind: function (n) {
		return function () {
		  return E.dispatch(n.apply(void 0, [].slice.call(arguments)));
		};
	  }};
	  return E;
	}, n.declareAction = w, n.declareAtom = _, n.getDepsShape = function (n) {
	  return n[E];
	}, n.getIsAction = s, n.getIsAtom = f, n.getState = A, n.getTree = u, n.initAction = S, n.map = function (n, t, e) {
	  return e || (e = t, t = n, n = Symbol(c((t && t[i]).id) + " [map]")), ("function" != typeof e && h("Invalid mapper"), e), _(n, null, function (n) {
		return n(t, function (n, t) {
		  return e(t);
		});
	  });
	}, n.nameToIdDefault = p, n.noop = function () {}, n.setNameToId = function (n) {
	  d = ("function" != typeof n && h("Invalid gen"), n);
	};
  });
  