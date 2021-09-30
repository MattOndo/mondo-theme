/*! js-cookie v3.0.1 | MIT */
!(function (e, t) {
	"object" == typeof exports && "undefined" != typeof module
		? (module.exports = t())
		: "function" == typeof define && define.amd
		? define(t)
		: ((e = e || self),
		  (function () {
				var n = e.Cookies,
					o = (e.Cookies = t());
				o.noConflict = function () {
					return (e.Cookies = n), o;
				};
		  })());
})(this, function () {
	"use strict";
	function e(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var o in n) e[o] = n[o];
		}
		return e;
	}
	return (function t(n, o) {
		function r(t, r, i) {
			if ("undefined" != typeof document) {
				"number" == typeof (i = e({}, o, i)).expires &&
					(i.expires = new Date(Date.now() + 864e5 * i.expires)),
					i.expires && (i.expires = i.expires.toUTCString()),
					(t = encodeURIComponent(t)
						.replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
						.replace(/[()]/g, escape));
				var c = "";
				for (var u in i)
					i[u] &&
						((c += "; " + u), !0 !== i[u] && (c += "=" + i[u].split(";")[0]));
				return (document.cookie = t + "=" + n.write(r, t) + c);
			}
		}
		return Object.create(
			{
				set: r,
				get: function (e) {
					if ("undefined" != typeof document && (!arguments.length || e)) {
						for (
							var t = document.cookie ? document.cookie.split("; ") : [],
								o = {},
								r = 0;
							r < t.length;
							r++
						) {
							var i = t[r].split("="),
								c = i.slice(1).join("=");
							try {
								var u = decodeURIComponent(i[0]);
								if (((o[u] = n.read(c, u)), e === u)) break;
							} catch (e) {}
						}
						return e ? o[e] : o;
					}
				},
				remove: function (t, n) {
					r(t, "", e({}, n, { expires: -1 }));
				},
				withAttributes: function (n) {
					return t(this.converter, e({}, this.attributes, n));
				},
				withConverter: function (n) {
					return t(e({}, this.converter, n), this.attributes);
				},
			},
			{
				attributes: { value: Object.freeze(o) },
				converter: { value: Object.freeze(n) },
			}
		);
	})(
		{
			read: function (e) {
				return (
					'"' === e[0] && (e = e.slice(1, -1)),
					e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
				);
			},
			write: function (e) {
				return encodeURIComponent(e).replace(
					/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
					decodeURIComponent
				);
			},
		},
		{ path: "/" }
	);
});
