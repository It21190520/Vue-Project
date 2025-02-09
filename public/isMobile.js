! function(a) {
    var b = /iPhone/i,
        c = /iPod/i,
        d = /iPad/i,
        e = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
        f = /Android/i,
        g = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
        h = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
        i = /Windows Phone/i,
        j = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
        k = /BlackBerry/i,
        l = /BB10/i,
        m = /Opera Mini/i,
        n = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
        o = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
        p = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"),
        q = function(a, b) {
            return a.test(b)
        },
        r = function(a) {
            var r = a || navigator.userAgent,
                s = r.split("[FBAN");
            if ("undefined" != typeof s[1] && (r = s[0]), s = r.split("Twitter"), "undefined" != typeof s[1] && (r = s[0]), this.apple = {
                    phone: q(b, r),
                    ipod: q(c, r),
                    tablet: !q(b, r) && q(d, r),
                    device: q(b, r) || q(c, r) || q(d, r)
                }, this.amazon = {
                    phone: q(g, r),
                    tablet: !q(g, r) && q(h, r),
                    device: q(g, r) || q(h, r)
                }, this.android = {
                    phone: q(g, r) || q(e, r),
                    tablet: !q(g, r) && !q(e, r) && (q(h, r) || q(f, r)),
                    device: q(g, r) || q(h, r) || q(e, r) || q(f, r)
                }, this.windows = {
                    phone: q(i, r),
                    tablet: q(j, r),
                    device: q(i, r) || q(j, r)
                }, this.other = {
                    blackberry: q(k, r),
                    blackberry10: q(l, r),
                    opera: q(m, r),
                    firefox: q(o, r),
                    chrome: q(n, r),
                    device: q(k, r) || q(l, r) || q(m, r) || q(o, r) || q(n, r)
                }, this.seven_inch = q(p, r), this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch, this.phone = this.apple.phone || this.android.phone || this.windows.phone, this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet, "undefined" == typeof window) return this
        },
        s = function() {
            var a = new r;
            return a.Class = r, a
        };
    "undefined" != typeof module && module.exports && "undefined" == typeof window ? module.exports = r : "undefined" != typeof module && module.exports && "undefined" != typeof window ? module.exports = s() : "function" == typeof define && define.amd ? define("ismobile", [], a.ismobile = s()) : a.ismobile = s()
}(this);