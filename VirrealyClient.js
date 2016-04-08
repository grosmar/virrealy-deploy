(function (console, $hx_exports) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Imports = function() { };
$hxClasses["Imports"] = Imports;
Imports.__name__ = ["Imports"];
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
};
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,addSub: function(s,pos,len) {
		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	if(quotes) return s.split("\"").join("&quot;").split("'").join("&#039;"); else return s;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
var _$UInt_UInt_$Impl_$ = {};
$hxClasses["_UInt.UInt_Impl_"] = _$UInt_UInt_$Impl_$;
_$UInt_UInt_$Impl_$.__name__ = ["_UInt","UInt_Impl_"];
_$UInt_UInt_$Impl_$.gt = function(a,b) {
	var aNeg = a < 0;
	var bNeg = b < 0;
	if(aNeg != bNeg) return aNeg; else return a > b;
};
_$UInt_UInt_$Impl_$.toFloat = function(this1) {
	var $int = this1;
	if($int < 0) return 4294967296.0 + $int; else return $int + 0.0;
};
var Xml = function(nodeType) {
	this.nodeType = nodeType;
	this.children = [];
	this.attributeMap = new haxe_ds_StringMap();
};
$hxClasses["Xml"] = Xml;
Xml.__name__ = ["Xml"];
Xml.parse = function(str) {
	return haxe_xml_Parser.parse(str);
};
Xml.createElement = function(name) {
	var xml = new Xml(Xml.Element);
	if(xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + xml.nodeType);
	xml.nodeName = name;
	return xml;
};
Xml.createPCData = function(data) {
	var xml = new Xml(Xml.PCData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createCData = function(data) {
	var xml = new Xml(Xml.CData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createComment = function(data) {
	var xml = new Xml(Xml.Comment);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createDocType = function(data) {
	var xml = new Xml(Xml.DocType);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createProcessingInstruction = function(data) {
	var xml = new Xml(Xml.ProcessingInstruction);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createDocument = function() {
	return new Xml(Xml.Document);
};
Xml.prototype = {
	get: function(att) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.get(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		this.attributeMap.set(att,value);
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.exists(att);
	}
	,attributes: function() {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.keys();
	}
	,elements: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		var ret;
		var _g = [];
		var _g1 = 0;
		var _g2 = this.children;
		while(_g1 < _g2.length) {
			var child = _g2[_g1];
			++_g1;
			if(child.nodeType == Xml.Element) _g.push(child);
		}
		ret = _g;
		return HxOverrides.iter(ret);
	}
	,elementsNamed: function(name) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		var ret;
		var _g = [];
		var _g1 = 0;
		var _g2 = this.children;
		while(_g1 < _g2.length) {
			var child = _g2[_g1];
			++_g1;
			if(child.nodeType == Xml.Element && (function($this) {
				var $r;
				if(child.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + child.nodeType);
				$r = child.nodeName;
				return $r;
			}(this)) == name) _g.push(child);
		}
		ret = _g;
		return HxOverrides.iter(ret);
	}
	,firstElement: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.nodeType == Xml.Element) return child;
		}
		return null;
	}
	,addChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		if(x.parent != null) x.parent.removeChild(x);
		this.children.push(x);
		x.parent = this;
	}
	,removeChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		if(HxOverrides.remove(this.children,x)) {
			x.parent = null;
			return true;
		}
		return false;
	}
	,toString: function() {
		return haxe_xml_Printer.print(this);
	}
	,__class__: Xml
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = ["haxe","_Int64","___Int64"];
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Resource = function() { };
$hxClasses["haxe.Resource"] = haxe_Resource;
haxe_Resource.__name__ = ["haxe","Resource"];
haxe_Resource.getString = function(name) {
	var _g = 0;
	var _g1 = haxe_Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) return x.str;
			var b = haxe_crypto_Base64.decode(x.data);
			return b.toString();
		}
	}
	return null;
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = ["haxe","io","Bytes"];
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.ofString = function(s) {
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = StringTools.fastCodeAt(s,i++);
		if(55296 <= c && c <= 56319) c = c - 55232 << 10 | StringTools.fastCodeAt(s,i++) & 1023;
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe_io_Bytes
};
var haxe_crypto_Base64 = function() { };
$hxClasses["haxe.crypto.Base64"] = haxe_crypto_Base64;
haxe_crypto_Base64.__name__ = ["haxe","crypto","Base64"];
haxe_crypto_Base64.decode = function(str,complement) {
	if(complement == null) complement = true;
	if(complement) while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	return new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).decodeBytes(haxe_io_Bytes.ofString(str));
};
var haxe_crypto_BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw new js__$Boot_HaxeError("BaseCode : base length must be a power of two.");
	this.base = base;
	this.nbits = nbits;
};
$hxClasses["haxe.crypto.BaseCode"] = haxe_crypto_BaseCode;
haxe_crypto_BaseCode.__name__ = ["haxe","crypto","BaseCode"];
haxe_crypto_BaseCode.prototype = {
	initTable: function() {
		var tbl = [];
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			tbl[i] = -1;
		}
		var _g1 = 0;
		var _g2 = this.base.length;
		while(_g1 < _g2) {
			var i1 = _g1++;
			tbl[this.base.b[i1]] = i1;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		if(this.tbl == null) this.initTable();
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = haxe_io_Bytes.alloc(size);
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.get(pin++)];
				if(i == -1) throw new js__$Boot_HaxeError("BaseCode : invalid encoded char");
				buf |= i;
			}
			curbits -= 8;
			out.set(pout++,buf >> curbits & 255);
		}
		return out;
	}
	,__class__: haxe_crypto_BaseCode
};
var haxe_ds_ArraySort = function() { };
$hxClasses["haxe.ds.ArraySort"] = haxe_ds_ArraySort;
haxe_ds_ArraySort.__name__ = ["haxe","ds","ArraySort"];
haxe_ds_ArraySort.sort = function(a,cmp) {
	haxe_ds_ArraySort.rec(a,cmp,0,a.length);
};
haxe_ds_ArraySort.rec = function(a,cmp,from,to) {
	var middle = from + to >> 1;
	if(to - from < 12) {
		if(to <= from) return;
		var _g = from + 1;
		while(_g < to) {
			var i = _g++;
			var j = i;
			while(j > from) {
				if(cmp(a[j],a[j - 1]) < 0) haxe_ds_ArraySort.swap(a,j - 1,j); else break;
				j--;
			}
		}
		return;
	}
	haxe_ds_ArraySort.rec(a,cmp,from,middle);
	haxe_ds_ArraySort.rec(a,cmp,middle,to);
	haxe_ds_ArraySort.doMerge(a,cmp,from,middle,to,middle - from,to - middle);
};
haxe_ds_ArraySort.doMerge = function(a,cmp,from,pivot,to,len1,len2) {
	var first_cut;
	var second_cut;
	var len11;
	var len22;
	var new_mid;
	if(len1 == 0 || len2 == 0) return;
	if(len1 + len2 == 2) {
		if(cmp(a[pivot],a[from]) < 0) haxe_ds_ArraySort.swap(a,pivot,from);
		return;
	}
	if(len1 > len2) {
		len11 = len1 >> 1;
		first_cut = from + len11;
		second_cut = haxe_ds_ArraySort.lower(a,cmp,pivot,to,first_cut);
		len22 = second_cut - pivot;
	} else {
		len22 = len2 >> 1;
		second_cut = pivot + len22;
		first_cut = haxe_ds_ArraySort.upper(a,cmp,from,pivot,second_cut);
		len11 = first_cut - from;
	}
	haxe_ds_ArraySort.rotate(a,cmp,first_cut,pivot,second_cut);
	new_mid = first_cut + len22;
	haxe_ds_ArraySort.doMerge(a,cmp,from,first_cut,new_mid,len11,len22);
	haxe_ds_ArraySort.doMerge(a,cmp,new_mid,second_cut,to,len1 - len11,len2 - len22);
};
haxe_ds_ArraySort.rotate = function(a,cmp,from,mid,to) {
	var n;
	if(from == mid || mid == to) return;
	n = haxe_ds_ArraySort.gcd(to - from,mid - from);
	while(n-- != 0) {
		var val = a[from + n];
		var shift = mid - from;
		var p1 = from + n;
		var p2 = from + n + shift;
		while(p2 != from + n) {
			a[p1] = a[p2];
			p1 = p2;
			if(to - p2 > shift) p2 += shift; else p2 = from + (shift - (to - p2));
		}
		a[p1] = val;
	}
};
haxe_ds_ArraySort.gcd = function(m,n) {
	while(n != 0) {
		var t = m % n;
		m = n;
		n = t;
	}
	return m;
};
haxe_ds_ArraySort.upper = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[val],a[mid]) < 0) len = half; else {
			from = mid + 1;
			len = len - half - 1;
		}
	}
	return from;
};
haxe_ds_ArraySort.lower = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[mid],a[val]) < 0) {
			from = mid + 1;
			len = len - half - 1;
		} else len = half;
	}
	return from;
};
haxe_ds_ArraySort.swap = function(a,i,j) {
	var tmp = a[i];
	a[i] = a[j];
	a[j] = tmp;
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
$hxClasses["haxe.ds._StringMap.StringMapIterator"] = haxe_ds__$StringMap_StringMapIterator;
haxe_ds__$StringMap_StringMapIterator.__name__ = ["haxe","ds","_StringMap","StringMapIterator"];
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Error = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = ["haxe","io","FPHelper"];
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var haxe_rtti_Meta = function() { };
$hxClasses["haxe.rtti.Meta"] = haxe_rtti_Meta;
haxe_rtti_Meta.__name__ = ["haxe","rtti","Meta"];
haxe_rtti_Meta.getType = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.obj == null) return { }; else return meta.obj;
};
haxe_rtti_Meta.getMeta = function(t) {
	return t.__meta__;
};
haxe_rtti_Meta.getFields = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.fields == null) return { }; else return meta.fields;
};
var haxe_xml_Parser = function() { };
$hxClasses["haxe.xml.Parser"] = haxe_xml_Parser;
haxe_xml_Parser.__name__ = ["haxe","xml","Parser"];
haxe_xml_Parser.parse = function(str,strict) {
	if(strict == null) strict = false;
	var doc = Xml.createDocument();
	haxe_xml_Parser.doParse(str,strict,0,doc);
	return doc;
};
haxe_xml_Parser.doParse = function(str,strict,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.charCodeAt(p);
	var buf = new StringBuf();
	var escapeNext = 1;
	var attrValQuote = -1;
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				buf.addSub(str,start,p - start);
				var child = Xml.createPCData(buf.b);
				buf = new StringBuf();
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			} else if(c == 38) {
				buf.addSub(str,start,p - start);
				state = 18;
				escapeNext = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child1 = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw new js__$Boot_HaxeError("Expected <![CDATA[");
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw new js__$Boot_HaxeError("Expected <!DOCTYPE");
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) throw new js__$Boot_HaxeError("Expected <!--"); else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw new js__$Boot_HaxeError("Expected node name");
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw new js__$Boot_HaxeError("Expected node name");
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				nsubs++;
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				break;
			case 62:
				state = 9;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw new js__$Boot_HaxeError("Expected attribute name");
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw new js__$Boot_HaxeError("Duplicate attribute");
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected =");
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				buf = new StringBuf();
				state = 8;
				start = p + 1;
				attrValQuote = c;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected \"");
			}
			break;
		case 8:
			switch(c) {
			case 38:
				buf.addSub(str,start,p - start);
				state = 18;
				escapeNext = 8;
				start = p + 1;
				break;
			case 62:
				if(strict) throw new js__$Boot_HaxeError("Invalid unescaped " + String.fromCharCode(c) + " in attribute value"); else if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val = buf.b;
					buf = new StringBuf();
					xml.set(aname,val);
					state = 0;
					next = 4;
				}
				break;
			case 60:
				if(strict) throw new js__$Boot_HaxeError("Invalid unescaped " + String.fromCharCode(c) + " in attribute value"); else if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val1 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val1);
					state = 0;
					next = 4;
				}
				break;
			default:
				if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val2 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val2);
					state = 0;
					next = 4;
				}
			}
			break;
		case 9:
			p = haxe_xml_Parser.doParse(str,strict,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected >");
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw new js__$Boot_HaxeError("Expected >");
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw new js__$Boot_HaxeError("Expected node name");
				var v = HxOverrides.substr(str,start,p - start);
				if(v != (function($this) {
					var $r;
					if(parent.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + parent.nodeType);
					$r = parent.nodeName;
					return $r;
				}(this))) throw new js__$Boot_HaxeError("Expected </" + (function($this) {
					var $r;
					if(parent.nodeType != Xml.Element) throw "Bad node type, expected Element but found " + parent.nodeType;
					$r = parent.nodeName;
					return $r;
				}(this)) + ">");
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				var xml1 = Xml.createComment(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				var xml2 = Xml.createDocType(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml2);
				nsubs++;
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				var xml3 = Xml.createProcessingInstruction(str1);
				parent.addChild(xml3);
				nsubs++;
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var c1;
					if(s.charCodeAt(1) == 120) c1 = Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)); else c1 = Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.b += String.fromCharCode(c1);
				} else if(!haxe_xml_Parser.escapes.exists(s)) {
					if(strict) throw new js__$Boot_HaxeError("Undefined entity: " + s);
					buf.b += Std.string("&" + s + ";");
				} else buf.add(haxe_xml_Parser.escapes.get(s));
				start = p + 1;
				state = escapeNext;
			} else if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45) && c != 35) {
				if(strict) throw new js__$Boot_HaxeError("Invalid character in entity: " + String.fromCharCode(c));
				buf.b += "&";
				buf.addSub(str,start,p - start);
				p--;
				start = p + 1;
				state = escapeNext;
			}
			break;
		}
		c = StringTools.fastCodeAt(str,++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) {
			buf.addSub(str,start,p - start);
			var xml4 = Xml.createPCData(buf.b);
			parent.addChild(xml4);
			nsubs++;
		}
		return p;
	}
	if(!strict && state == 18 && escapeNext == 13) {
		buf.b += "&";
		buf.addSub(str,start,p - start);
		var xml5 = Xml.createPCData(buf.b);
		parent.addChild(xml5);
		nsubs++;
		return p;
	}
	throw new js__$Boot_HaxeError("Unexpected end");
};
var haxe_xml_Printer = function(pretty) {
	this.output = new StringBuf();
	this.pretty = pretty;
};
$hxClasses["haxe.xml.Printer"] = haxe_xml_Printer;
haxe_xml_Printer.__name__ = ["haxe","xml","Printer"];
haxe_xml_Printer.print = function(xml,pretty) {
	if(pretty == null) pretty = false;
	var printer = new haxe_xml_Printer(pretty);
	printer.writeNode(xml,"");
	return printer.output.b;
};
haxe_xml_Printer.prototype = {
	writeNode: function(value,tabs) {
		var _g = value.nodeType;
		switch(_g) {
		case 2:
			this.output.b += Std.string(tabs + "<![CDATA[");
			this.write(StringTools.trim((function($this) {
				var $r;
				if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + value.nodeType);
				$r = value.nodeValue;
				return $r;
			}(this))));
			this.output.b += "]]>";
			if(this.pretty) this.output.b += "";
			break;
		case 3:
			var commentContent;
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + value.nodeType);
			commentContent = value.nodeValue;
			commentContent = new EReg("[\n\r\t]+","g").replace(commentContent,"");
			commentContent = "<!--" + commentContent + "-->";
			if(tabs == null) this.output.b += "null"; else this.output.b += "" + tabs;
			this.write(StringTools.trim(commentContent));
			if(this.pretty) this.output.b += "";
			break;
		case 6:
			var $it0 = (function($this) {
				var $r;
				if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + value.nodeType);
				$r = HxOverrides.iter(value.children);
				return $r;
			}(this));
			while( $it0.hasNext() ) {
				var child = $it0.next();
				this.writeNode(child,tabs);
			}
			break;
		case 0:
			this.output.b += Std.string(tabs + "<");
			this.write((function($this) {
				var $r;
				if(value.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + value.nodeType);
				$r = value.nodeName;
				return $r;
			}(this)));
			var $it1 = value.attributes();
			while( $it1.hasNext() ) {
				var attribute = $it1.next();
				this.output.b += Std.string(" " + attribute + "=\"");
				this.write(StringTools.htmlEscape(value.get(attribute),true));
				this.output.b += "\"";
			}
			if(this.hasChildren(value)) {
				this.output.b += ">";
				if(this.pretty) this.output.b += "";
				var $it2 = (function($this) {
					var $r;
					if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + value.nodeType);
					$r = HxOverrides.iter(value.children);
					return $r;
				}(this));
				while( $it2.hasNext() ) {
					var child1 = $it2.next();
					this.writeNode(child1,this.pretty?tabs + "\t":tabs);
				}
				this.output.b += Std.string(tabs + "</");
				this.write((function($this) {
					var $r;
					if(value.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + value.nodeType);
					$r = value.nodeName;
					return $r;
				}(this)));
				this.output.b += ">";
				if(this.pretty) this.output.b += "";
			} else {
				this.output.b += "/>";
				if(this.pretty) this.output.b += "";
			}
			break;
		case 1:
			var nodeValue;
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + value.nodeType);
			nodeValue = value.nodeValue;
			if(nodeValue.length != 0) {
				this.write(tabs + StringTools.htmlEscape(nodeValue));
				if(this.pretty) this.output.b += "";
			}
			break;
		case 5:
			this.write("<?" + (function($this) {
				var $r;
				if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + value.nodeType);
				$r = value.nodeValue;
				return $r;
			}(this)) + "?>");
			break;
		case 4:
			this.write("<!DOCTYPE " + (function($this) {
				var $r;
				if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + value.nodeType);
				$r = value.nodeValue;
				return $r;
			}(this)) + ">");
			break;
		}
	}
	,write: function(input) {
		if(input == null) this.output.b += "null"; else this.output.b += "" + input;
	}
	,hasChildren: function(value) {
		var $it0 = (function($this) {
			var $r;
			if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + value.nodeType);
			$r = HxOverrides.iter(value.children);
			return $r;
		}(this));
		while( $it0.hasNext() ) {
			var child = $it0.next();
			var _g = child.nodeType;
			switch(_g) {
			case 0:case 1:
				return true;
			case 2:case 3:
				if(StringTools.ltrim((function($this) {
					var $r;
					if(child.nodeType == Xml.Document || child.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + child.nodeType);
					$r = child.nodeValue;
					return $r;
				}(this))).length != 0) return true;
				break;
			default:
			}
		}
		return false;
	}
	,__class__: haxe_xml_Printer
};
var hex_collection_IHashMap = function() { };
$hxClasses["hex.collection.IHashMap"] = hex_collection_IHashMap;
hex_collection_IHashMap.__name__ = ["hex","collection","IHashMap"];
hex_collection_IHashMap.prototype = {
	__class__: hex_collection_IHashMap
};
var hex_collection_HashMap = function() {
	this._init();
};
$hxClasses["hex.collection.HashMap"] = hex_collection_HashMap;
hex_collection_HashMap.__name__ = ["hex","collection","HashMap"];
hex_collection_HashMap.__interfaces__ = [hex_collection_IHashMap];
hex_collection_HashMap.prototype = {
	_init: function() {
		this._keys = new haxe_ds_StringMap();
		this._values = new haxe_ds_StringMap();
		this._size = 0;
	}
	,clear: function() {
		this._init();
	}
	,containsKey: function(key) {
		if(key != null) {
			var key1 = this._getName(key);
			return this._keys.exists(key1);
		} else throw new js__$Boot_HaxeError(new hex_error_NullPointerException(Std.string(this) + ".containsKey() failed. key can't be null",{ fileName : "HashMap.hx", lineNumber : 57, className : "hex.collection.HashMap", methodName : "containsKey"}));
	}
	,containsValue: function(value) {
		if(value != null) {
			var key = this._getName(value);
			return this._values.exists(key);
		} else throw new js__$Boot_HaxeError(new hex_error_NullPointerException(Std.string(this) + ".containsValue() failed. value can't be null",{ fileName : "HashMap.hx", lineNumber : 80, className : "hex.collection.HashMap", methodName : "containsValue"}));
	}
	,get: function(key) {
		if(key != null) {
			var key1 = this._getName(key);
			return this._keys.get(key1);
		} else throw new js__$Boot_HaxeError(new hex_error_NullPointerException(Std.string(this) + ".get() failed. key can't be null",{ fileName : "HashMap.hx", lineNumber : 112, className : "hex.collection.HashMap", methodName : "get"}));
	}
	,isEmpty: function() {
		return this._size == 0;
	}
	,put: function(key,value) {
		var oldValue = null;
		if(key == null) throw new js__$Boot_HaxeError(new hex_error_NullPointerException(Std.string(this) + ".put() failed. key can't be null",{ fileName : "HashMap.hx", lineNumber : 147, className : "hex.collection.HashMap", methodName : "put"})); else if(value == null) throw new js__$Boot_HaxeError(new hex_error_NullPointerException(Std.string(this) + ".put() failed. value can't be null",{ fileName : "HashMap.hx", lineNumber : 151, className : "hex.collection.HashMap", methodName : "put"})); else {
			if(this.containsKey(key)) oldValue = this.remove(key);
			this._size++;
			var key1 = this._getName(key);
			this._keys.set(key1,value);
			var key2 = this._getName(value);
			this._values.set(key2,key);
			return oldValue;
		}
	}
	,_getName: function(o) {
		var s;
		if(typeof(o) == "string") s = "_S" + Std.string(o); else if(typeof(o) == "boolean") s = "_B" + Std.string(o); else if(typeof(o) == "number" || ((o | 0) === o)) s = "_N" + Std.string(o); else s = "_O" + hex_core_HashCodeFactory.getKey(o);
		return s;
	}
	,remove: function(key) {
		if(key != null) {
			var sKID = this._getName(key);
			if(this._keys.exists(sKID)) {
				var sVID = this._getName(this._keys.get(sKID));
				var value = this._keys.get(sKID);
				this._values.remove(sVID);
				this._keys.remove(sKID);
				this._size--;
				return value;
			} else return null;
		} else throw new js__$Boot_HaxeError(new hex_error_NullPointerException(Std.string(this) + ".remove() failed. key can't be null",{ fileName : "HashMap.hx", lineNumber : 236, className : "hex.collection.HashMap", methodName : "remove"}));
	}
	,size: function() {
		return this._size;
	}
	,getKeys: function() {
		var a = [];
		var it = this._values.iterator();
		while(it.hasNext()) a.push(it.next());
		return a;
	}
	,getValues: function() {
		var a = [];
		var it = this._keys.iterator();
		while(it.hasNext()) a.push(it.next());
		return a;
	}
	,__class__: hex_collection_HashMap
};
var hex_collection_ILocator = function() { };
$hxClasses["hex.collection.ILocator"] = hex_collection_ILocator;
hex_collection_ILocator.__name__ = ["hex","collection","ILocator"];
hex_collection_ILocator.prototype = {
	__class__: hex_collection_ILocator
};
var hex_collection_ILocatorListener = function() { };
$hxClasses["hex.collection.ILocatorListener"] = hex_collection_ILocatorListener;
hex_collection_ILocatorListener.__name__ = ["hex","collection","ILocatorListener"];
hex_collection_ILocatorListener.prototype = {
	__class__: hex_collection_ILocatorListener
};
var hex_collection_Locator = function() {
	this._map = new hex_collection_HashMap();
	this._dispatcher = new hex_event_Dispatcher();
};
$hxClasses["hex.collection.Locator"] = hex_collection_Locator;
hex_collection_Locator.__name__ = ["hex","collection","Locator"];
hex_collection_Locator.__interfaces__ = [hex_collection_ILocator];
hex_collection_Locator.prototype = {
	clear: function() {
		this._map.clear();
	}
	,release: function() {
		this.clear();
		this._map = null;
		if(this._dispatcher != null) {
			this._dispatcher.removeAllListeners();
			this._dispatcher = null;
		}
	}
	,isEmpty: function() {
		return this._map.size() == 0;
	}
	,keys: function() {
		return this._map.getKeys();
	}
	,values: function() {
		return this._map.getValues();
	}
	,isRegisteredWithKey: function(key) {
		return this._map.containsKey(key);
	}
	,locate: function(key) {
		if(this.isRegisteredWithKey(key)) return this._map.get(key); else throw new js__$Boot_HaxeError(new hex_error_NoSuchElementException("Can't find item with '" + Std.string(key) + "' key in " + this.toString(),{ fileName : "Locator.hx", lineNumber : 69, className : "hex.collection.Locator", methodName : "locate"}));
	}
	,add: function(m) {
		var iterator = m.keys();
		while(iterator.hasNext()) {
			var key = iterator.next();
			this.register(key,m.h[key]);
		}
	}
	,register: function(key,element) {
		if(this._map.containsKey(key)) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("item is already registered with '" + Std.string(key) + "' key in " + this.toString(),{ fileName : "Locator.hx", lineNumber : 88, className : "hex.collection.Locator", methodName : "register"})); else {
			this._map.put(key,element);
			this._dispatchRegisterEvent(key,element);
			return true;
		}
	}
	,unregister: function(key) {
		if(this.isRegisteredWithKey(key)) {
			this._map.remove(key);
			this._dispatchUnregisterEvent(key);
			return true;
		} else return false;
	}
	,addListener: function(listener) {
		return this._dispatcher.addListener(listener);
	}
	,removeListener: function(listener) {
		return this._dispatcher.removeListener(listener);
	}
	,toString: function() {
		return hex_log_Stringifier.stringify(this);
	}
	,_dispatchRegisterEvent: function(key,element) {
	}
	,_dispatchUnregisterEvent: function(key) {
	}
	,__class__: hex_collection_Locator
};
var hex_event_MessageType = function(messageName) {
	if(messageName == null) messageName = "handleMessage";
	this.name = messageName;
};
$hxClasses["hex.event.MessageType"] = hex_event_MessageType;
hex_event_MessageType.__name__ = ["hex","event","MessageType"];
hex_event_MessageType.prototype = {
	__class__: hex_event_MessageType
};
var hex_collection_LocatorMessage = function() {
};
$hxClasses["hex.collection.LocatorMessage"] = hex_collection_LocatorMessage;
hex_collection_LocatorMessage.__name__ = ["hex","collection","LocatorMessage"];
hex_collection_LocatorMessage.prototype = {
	__class__: hex_collection_LocatorMessage
};
var hex_config_stateful_IStatefulConfig = function() { };
$hxClasses["hex.config.stateful.IStatefulConfig"] = hex_config_stateful_IStatefulConfig;
hex_config_stateful_IStatefulConfig.__name__ = ["hex","config","stateful","IStatefulConfig"];
hex_config_stateful_IStatefulConfig.prototype = {
	__class__: hex_config_stateful_IStatefulConfig
};
var hex_config_stateful_ServiceLocator = function() {
	this._mapping = new hex_collection_HashMap();
	hex_collection_Locator.call(this);
};
$hxClasses["hex.config.stateful.ServiceLocator"] = hex_config_stateful_ServiceLocator;
hex_config_stateful_ServiceLocator.__name__ = ["hex","config","stateful","ServiceLocator"];
hex_config_stateful_ServiceLocator.__interfaces__ = [hex_config_stateful_IStatefulConfig];
hex_config_stateful_ServiceLocator.__super__ = hex_collection_Locator;
hex_config_stateful_ServiceLocator.prototype = $extend(hex_collection_Locator.prototype,{
	getService: function(type,name) {
		if(name == null) name = "";
		var helper;
		if(name.length > 0) helper = this.locate(name + "#" + Type.getClassName(type)); else helper = this.locate(Type.getClassName(type));
		var service = helper.value;
		if(js_Boot.__instanceof(service,Class)) service = Type.createInstance(service,[]);
		if(js_Boot.__instanceof(service,hex_service_IService)) return service; else throw new js__$Boot_HaxeError(new hex_error_NoSuchElementException(Std.string(this) + ".getService failed to retrieve service with key '" + Std.string(type) + "'",{ fileName : "ServiceLocator.hx", lineNumber : 56, className : "hex.config.stateful.ServiceLocator", methodName : "getService"}));
	}
	,configure: function(injector,dispatcher,module) {
		var keys = this.keys();
		var _g = 0;
		while(_g < keys.length) {
			var className = keys[_g];
			++_g;
			var separatorIndex = className.indexOf("#");
			var serviceClassKey;
			if(separatorIndex != -1) serviceClassKey = Type.resolveClass(HxOverrides.substr(className,separatorIndex + 1,null)); else serviceClassKey = Type.resolveClass(className);
			var helper = this.locate(className);
			var service = helper.value;
			if(js_Boot.__instanceof(service,Class)) {
				if(helper.mapName.length > 0) injector.mapToType(serviceClassKey,service,helper.mapName); else injector.mapToType(serviceClassKey,service);
			} else if(js_Boot.__instanceof(service,hex_service_stateful_IStatefulService)) {
				var serviceDispatcher = service.getDispatcher();
				if(serviceDispatcher != null) serviceDispatcher.add(dispatcher);
				if(helper.mapName.length > 0) injector.mapToValue(serviceClassKey,service,helper.mapName); else injector.mapToValue(serviceClassKey,service);
			} else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("Mapping failed on '" + Std.string(service) + "' This instance is not a stateful service nor a service class.",{ fileName : "ServiceLocator.hx", lineNumber : 110, className : "hex.config.stateful.ServiceLocator", methodName : "configure"}));
			this._mapping.put(serviceClassKey,service);
		}
	}
	,addService: function(service,value,mapName) {
		if(mapName == null) mapName = "";
		return this._registerService(service,new hex_config_stateful__$ServiceLocator_ServiceLocatorHelper(value,mapName),mapName);
	}
	,getMapping: function() {
		return this._mapping;
	}
	,_registerService: function(type,service,mapName) {
		if(mapName == null) mapName = "";
		var className;
		className = (mapName != ""?mapName + "#":"") + Type.getClassName(type);
		return this.register(className,service);
	}
	,_dispatchRegisterEvent: function(key,element) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.REGISTER,[key,element]);
	}
	,_dispatchUnregisterEvent: function(key) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.UNREGISTER,[key]);
	}
	,__class__: hex_config_stateful_ServiceLocator
});
var hex_config_stateful__$ServiceLocator_ServiceLocatorHelper = function(value,mapName) {
	this.value = value;
	this.mapName = mapName;
};
$hxClasses["hex.config.stateful._ServiceLocator.ServiceLocatorHelper"] = hex_config_stateful__$ServiceLocator_ServiceLocatorHelper;
hex_config_stateful__$ServiceLocator_ServiceLocatorHelper.__name__ = ["hex","config","stateful","_ServiceLocator","ServiceLocatorHelper"];
hex_config_stateful__$ServiceLocator_ServiceLocatorHelper.prototype = {
	toString: function() {
		return "ServiceLocatorHelper( value:" + Std.string(this.value) + ", mapName:" + this.mapName + " )";
	}
	,__class__: hex_config_stateful__$ServiceLocator_ServiceLocatorHelper
};
var hex_config_stateless_IStatelessConfig = function() { };
$hxClasses["hex.config.stateless.IStatelessConfig"] = hex_config_stateless_IStatelessConfig;
hex_config_stateless_IStatelessConfig.__name__ = ["hex","config","stateless","IStatelessConfig"];
hex_config_stateless_IStatelessConfig.prototype = {
	__class__: hex_config_stateless_IStatelessConfig
};
var hex_di_IInjectorContainer = function() { };
$hxClasses["hex.di.IInjectorContainer"] = hex_di_IInjectorContainer;
hex_di_IInjectorContainer.__name__ = ["hex","di","IInjectorContainer"];
var hex_config_stateless_StatelessCommandConfig = function() {
};
$hxClasses["hex.config.stateless.StatelessCommandConfig"] = hex_config_stateless_StatelessCommandConfig;
hex_config_stateless_StatelessCommandConfig.__name__ = ["hex","config","stateless","StatelessCommandConfig"];
hex_config_stateless_StatelessCommandConfig.__interfaces__ = [hex_config_stateless_IStatelessConfig];
hex_config_stateless_StatelessCommandConfig.prototype = {
	configure: function() {
		throw new js__$Boot_HaxeError(new hex_error_VirtualMethodException("'configure' is not implemented",{ fileName : "StatelessCommandConfig.hx", lineNumber : 30, className : "hex.config.stateless.StatelessCommandConfig", methodName : "configure"}));
	}
	,map: function(messageType,commandClass) {
		return this.frontController.map(messageType,commandClass);
	}
	,__class__: hex_config_stateless_StatelessCommandConfig
};
var hex_config_stateless_StatelessModelConfig = function() {
};
$hxClasses["hex.config.stateless.StatelessModelConfig"] = hex_config_stateless_StatelessModelConfig;
hex_config_stateless_StatelessModelConfig.__name__ = ["hex","config","stateless","StatelessModelConfig"];
hex_config_stateless_StatelessModelConfig.__interfaces__ = [hex_config_stateless_IStatelessConfig];
hex_config_stateless_StatelessModelConfig.prototype = {
	configure: function() {
		throw new js__$Boot_HaxeError(new hex_error_VirtualMethodException(Std.string(this) + ".configure must be overridden",{ fileName : "StatelessModelConfig.hx", lineNumber : 24, className : "hex.config.stateless.StatelessModelConfig", methodName : "configure"}));
	}
	,mapModel: function(modelInterface,modelClass,name) {
		if(name == null) name = "";
		var instance = this.injector.instantiateUnmapped(modelClass);
		this.injector.mapToValue(modelInterface,instance,name);
		this.injector.mapToValue(Type.resolveClass(Type.getClassName(modelInterface) + "RO"),instance);
	}
	,__class__: hex_config_stateless_StatelessModelConfig
};
var hex_control_IFrontController = function() { };
$hxClasses["hex.control.IFrontController"] = hex_control_IFrontController;
hex_control_IFrontController.__name__ = ["hex","control","IFrontController"];
hex_control_IFrontController.prototype = {
	__class__: hex_control_IFrontController
};
var hex_control_FrontController = function(facadeDispatcher,injector,module) {
	hex_collection_Locator.call(this);
	this._facadeDispatcher = facadeDispatcher;
	this._injector = injector;
	this._module = module;
	this._facadeDispatcher.addListener(this);
};
$hxClasses["hex.control.FrontController"] = hex_control_FrontController;
hex_control_FrontController.__name__ = ["hex","control","FrontController"];
hex_control_FrontController.__interfaces__ = [hex_control_IFrontController];
hex_control_FrontController.__super__ = hex_collection_Locator;
hex_control_FrontController.prototype = $extend(hex_collection_Locator.prototype,{
	map: function(messageType,commandClass) {
		var commandMapping = new hex_control_command_CommandMapping(commandClass);
		this.register(messageType,commandMapping);
		return commandMapping;
	}
	,unmap: function(messageType) {
		var commandMapping = this.locate(messageType);
		this.unregister(messageType);
		return commandMapping;
	}
	,handleMessage: function(messageType,request) {
		if(this.isRegisteredWithKey(messageType)) {
			var commandMapping = this.locate(messageType);
			var commandExecutor = new hex_control_command_CommandExecutor(this._injector,this._module);
			var mappingRemoval = null;
			if(commandMapping.get_isFiredOnce()) mappingRemoval = (function(f,a1) {
				return function() {
					return f(a1);
				};
			})($bind(this,this.unmap),messageType);
			commandExecutor.executeCommand(commandMapping,request,mappingRemoval);
		}
	}
	,_dispatchRegisterEvent: function(key,element) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.REGISTER,[key,element]);
	}
	,_dispatchUnregisterEvent: function(key) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.UNREGISTER,[key]);
	}
	,__class__: hex_control_FrontController
});
var hex_control_Request = function(executionPayloads) {
	this._executionPayloads = executionPayloads;
};
$hxClasses["hex.control.Request"] = hex_control_Request;
hex_control_Request.__name__ = ["hex","control","Request"];
hex_control_Request.prototype = {
	getExecutionPayloads: function() {
		return this._executionPayloads;
	}
	,clone: function() {
		return new hex_control_Request(this._executionPayloads);
	}
	,__class__: hex_control_Request
};
var hex_control_command_ICommand = function() { };
$hxClasses["hex.control.command.ICommand"] = hex_control_command_ICommand;
hex_control_command_ICommand.__name__ = ["hex","control","command","ICommand"];
hex_control_command_ICommand.prototype = {
	__class__: hex_control_command_ICommand
};
var hex_control_async_IAsyncCommand = function() { };
$hxClasses["hex.control.async.IAsyncCommand"] = hex_control_async_IAsyncCommand;
hex_control_async_IAsyncCommand.__name__ = ["hex","control","async","IAsyncCommand"];
hex_control_async_IAsyncCommand.__interfaces__ = [hex_control_command_ICommand];
hex_control_async_IAsyncCommand.prototype = {
	__class__: hex_control_async_IAsyncCommand
	,__properties__: {get_isCancelled:"get_isCancelled",get_hasFailed:"get_hasFailed",get_hasCompleted:"get_hasCompleted",get_isRunning:"get_isRunning",get_wasUsed:"get_wasUsed"}
};
var hex_control_async_AsyncCommand = function() {
	this._status = "WAS_NEVER_USED";
	this._dispatcher = new hex_event_Dispatcher();
};
$hxClasses["hex.control.async.AsyncCommand"] = hex_control_async_AsyncCommand;
hex_control_async_AsyncCommand.__name__ = ["hex","control","async","AsyncCommand"];
hex_control_async_AsyncCommand.__interfaces__ = [hex_control_async_IAsyncCommand];
hex_control_async_AsyncCommand.isDetained = function(aSynCommand) {
	return hex_control_async_AsyncCommand._POOL.h.__keys__[aSynCommand.__id__] != null;
};
hex_control_async_AsyncCommand.detain = function(aSynCommand) {
	hex_control_async_AsyncCommand._POOL.set(aSynCommand,true);
};
hex_control_async_AsyncCommand.release = function(aSynCommand) {
	if(hex_control_async_AsyncCommand._POOL.h.__keys__[aSynCommand.__id__] != null) hex_control_async_AsyncCommand._POOL.remove(aSynCommand);
};
hex_control_async_AsyncCommand.prototype = {
	preExecute: function() {
		this.get_wasUsed() && this._throwExecutionIllegalStateError();
		this._status = "IS_RUNNING";
		hex_control_async_AsyncCommand.detain(this);
	}
	,cancel: function() {
		this._handleCancel();
	}
	,addAsyncCommandListener: function(listener) {
		this.addCompleteHandler(listener,$bind(listener,listener.onAsyncCommandComplete));
		this.addFailHandler(listener,$bind(listener,listener.onAsyncCommandFail));
		this.addCancelHandler(listener,$bind(listener,listener.onAsyncCommandCancel));
	}
	,removeAsyncCommandListener: function(listener) {
		this.removeCompleteHandler(listener,$bind(listener,listener.onAsyncCommandComplete));
		this.removeFailHandler(listener,$bind(listener,listener.onAsyncCommandFail));
		this.removeCancelHandler(listener,$bind(listener,listener.onAsyncCommandCancel));
	}
	,addCompleteHandler: function(scope,callback) {
		if(this.get_hasCompleted()) callback(this); else this._dispatcher.addHandler(hex_control_async_AsyncCommandMessage.COMPLETE,scope,callback);
	}
	,removeCompleteHandler: function(scope,callback) {
		this._dispatcher.removeHandler(hex_control_async_AsyncCommandMessage.COMPLETE,scope,callback);
	}
	,addFailHandler: function(scope,callback) {
		if(this.get_hasFailed()) callback(this); else this._dispatcher.addHandler(hex_control_async_AsyncCommandMessage.FAIL,scope,callback);
	}
	,removeFailHandler: function(scope,callback) {
		this._dispatcher.removeHandler(hex_control_async_AsyncCommandMessage.FAIL,scope,callback);
	}
	,addCancelHandler: function(scope,callback) {
		if(this.get_isCancelled()) callback(this); else this._dispatcher.addHandler(hex_control_async_AsyncCommandMessage.CANCEL,scope,callback);
	}
	,removeCancelHandler: function(scope,callback) {
		this._dispatcher.removeHandler(hex_control_async_AsyncCommandMessage.CANCEL,scope,callback);
	}
	,_handleComplete: function() {
		this.get_wasUsed() && this._status != "IS_RUNNING" && this._throwIllegalStateError("_handleComplete");
		this._status = "IS_COMPLETED";
		this._dispatcher.dispatch(hex_control_async_AsyncCommandMessage.COMPLETE,[this]);
		this._release();
	}
	,_handleFail: function() {
		this.get_wasUsed() && this._status != "IS_RUNNING" && this._throwIllegalStateError("_handleFail");
		this._status = "IS_FAILED";
		this._dispatcher.dispatch(hex_control_async_AsyncCommandMessage.FAIL,[this]);
		this._release();
	}
	,_handleCancel: function() {
		this.get_wasUsed() && this._status != "IS_RUNNING" && this._throwIllegalStateError("_handleCancel");
		this._status = "IS_CANCELLED";
		this._dispatcher.dispatch(hex_control_async_AsyncCommandMessage.CANCEL,[this]);
		this._release();
	}
	,get_wasUsed: function() {
		return this._status != "WAS_NEVER_USED";
	}
	,get_isRunning: function() {
		return this._status == "IS_RUNNING";
	}
	,get_hasCompleted: function() {
		return this._status == "IS_COMPLETED";
	}
	,get_hasFailed: function() {
		return this._status == "IS_FAILED";
	}
	,get_isCancelled: function() {
		return this._status == "IS_CANCELLED";
	}
	,execute: function(request) {
		throw new js__$Boot_HaxeError(new hex_error_VirtualMethodException(Std.string(this) + ".execute must be overridden",{ fileName : "AsyncCommand.hx", lineNumber : 176, className : "hex.control.async.AsyncCommand", methodName : "execute"}));
	}
	,getResult: function() {
		return null;
	}
	,getReturnedExecutionPayload: function() {
		return null;
	}
	,getOwner: function() {
		return this._owner;
	}
	,setOwner: function(owner) {
		if(this._owner == null) this._owner = owner;
	}
	,getExecuteMethod: function() {
		return $bind(this,this.execute);
	}
	,_removeAllListeners: function() {
		this._dispatcher.removeAllListeners();
	}
	,_throwExecutionIllegalStateError: function() {
		var msg = "";
		if(this.get_isRunning()) msg = "'execute' call failed. This command is already processing."; else if(this.get_isCancelled()) msg = "'execute' call failed. This command is cancelled."; else if(this.get_hasCompleted()) msg = "'execute' call failed. This command is completed and can't be executed twice."; else if(this.get_hasFailed()) msg = "'execute' call failed. This command has failed and can't be executed twice."; else if(!this.get_wasUsed()) msg = "'execute' call failed. 'preExecute' should be called before.";
		this._release();
		throw new js__$Boot_HaxeError(new hex_error_IllegalStateException(msg,{ fileName : "AsyncCommand.hx", lineNumber : 240, className : "hex.control.async.AsyncCommand", methodName : "_throwExecutionIllegalStateError"}));
	}
	,_throwIllegalStateError: function(process) {
		var msg = "";
		if(this.get_isCancelled()) msg = "'" + process + "' call failed in '" + hex_log_Stringifier.stringify(this) + "'. This command was already cancelled."; else if(this.get_hasCompleted()) msg = "'" + process + "' call failed in '" + hex_log_Stringifier.stringify(this) + "'. This command was already completed."; else if(this.get_hasFailed()) msg = "'" + process + "' call failed in '" + hex_log_Stringifier.stringify(this) + "'. This command has already failed.";
		this._release();
		throw new js__$Boot_HaxeError(new hex_error_IllegalStateException(msg,{ fileName : "AsyncCommand.hx", lineNumber : 261, className : "hex.control.async.AsyncCommand", methodName : "_throwIllegalStateError"}));
	}
	,_release: function() {
		this._removeAllListeners();
		hex_control_async_AsyncCommand.release(this);
	}
	,__class__: hex_control_async_AsyncCommand
	,__properties__: {get_isCancelled:"get_isCancelled",get_hasFailed:"get_hasFailed",get_hasCompleted:"get_hasCompleted",get_isRunning:"get_isRunning",get_wasUsed:"get_wasUsed"}
};
var hex_control_async_AsyncCommandMessage = function() {
};
$hxClasses["hex.control.async.AsyncCommandMessage"] = hex_control_async_AsyncCommandMessage;
hex_control_async_AsyncCommandMessage.__name__ = ["hex","control","async","AsyncCommandMessage"];
hex_control_async_AsyncCommandMessage.prototype = {
	__class__: hex_control_async_AsyncCommandMessage
};
var hex_control_async_AsyncCommandUtil = function() {
	throw new js__$Boot_HaxeError(new hex_error_PrivateConstructorException("'AsyncCommandUtil' class can't be instantiated.",{ fileName : "AsyncCommandUtil.hx", lineNumber : 14, className : "hex.control.async.AsyncCommandUtil", methodName : "new"}));
};
$hxClasses["hex.control.async.AsyncCommandUtil"] = hex_control_async_AsyncCommandUtil;
hex_control_async_AsyncCommandUtil.__name__ = ["hex","control","async","AsyncCommandUtil"];
hex_control_async_AsyncCommandUtil.addListenersToAsyncCommand = function(handlers,methodToAddListener) {
	var _g = 0;
	while(_g < handlers.length) {
		var handler = handlers[_g];
		++_g;
		methodToAddListener(handler.scope,handler.callback);
	}
};
hex_control_async_AsyncCommandUtil.prototype = {
	__class__: hex_control_async_AsyncCommandUtil
};
var hex_control_async_AsyncHandler = function(scope,callback) {
	this.scope = scope;
	this.callback = callback;
};
$hxClasses["hex.control.async.AsyncHandler"] = hex_control_async_AsyncHandler;
hex_control_async_AsyncHandler.__name__ = ["hex","control","async","AsyncHandler"];
hex_control_async_AsyncHandler.prototype = {
	__class__: hex_control_async_AsyncHandler
};
var hex_control_async_IAsyncCommandListener = function() { };
$hxClasses["hex.control.async.IAsyncCommandListener"] = hex_control_async_IAsyncCommandListener;
hex_control_async_IAsyncCommandListener.__name__ = ["hex","control","async","IAsyncCommandListener"];
hex_control_async_IAsyncCommandListener.prototype = {
	__class__: hex_control_async_IAsyncCommandListener
};
var hex_control_command_BasicCommand = function() {
};
$hxClasses["hex.control.command.BasicCommand"] = hex_control_command_BasicCommand;
hex_control_command_BasicCommand.__name__ = ["hex","control","command","BasicCommand"];
hex_control_command_BasicCommand.__interfaces__ = [hex_control_command_ICommand];
hex_control_command_BasicCommand.prototype = {
	execute: function(request) {
		throw new js__$Boot_HaxeError(new hex_error_VirtualMethodException(Std.string(this) + ".execute must be overridden",{ fileName : "BasicCommand.hx", lineNumber : 24, className : "hex.control.command.BasicCommand", methodName : "execute"}));
	}
	,getResult: function() {
		return null;
	}
	,getReturnedExecutionPayload: function() {
		return null;
	}
	,getOwner: function() {
		return this._owner;
	}
	,setOwner: function(owner) {
		this._owner = owner;
	}
	,getExecuteMethod: function() {
		return $bind(this,this.execute);
	}
	,__class__: hex_control_command_BasicCommand
};
var hex_control_command_CommandExecutor = function(injector,module) {
	this._injector = injector;
	this._module = module;
};
$hxClasses["hex.control.command.CommandExecutor"] = hex_control_command_CommandExecutor;
hex_control_command_CommandExecutor.__name__ = ["hex","control","command","CommandExecutor"];
hex_control_command_CommandExecutor.prototype = {
	executeCommand: function(mapping,request,mappingRemoval) {
		var payloads = mapping.getPayloads();
		if(request != null) if(payloads != null) payloads = payloads.concat(request.getExecutionPayloads()); else payloads = request.getExecutionPayloads();
		if(mapping.get_hasMappingResult()) if(payloads != null) payloads = payloads.concat(mapping.getPayloadResult()); else payloads = mapping.getPayloadResult();
		if(payloads != null) hex_control_payload_PayloadUtil.mapPayload(payloads,this._injector);
		var command = null;
		if(!mapping.get_hasGuard() || hex_control_guard_GuardUtil.guardsApprove(mapping.getGuards(),this._injector)) {
			if(mappingRemoval != null) mappingRemoval();
			command = this._injector.getOrCreateNewInstance(mapping.getCommandClass());
			mapping.setLastCommandInstance(command);
		}
		if(payloads != null) hex_control_payload_PayloadUtil.unmapPayload(payloads,this._injector);
		if(command != null) {
			command.setOwner(this._module);
			var isAsync = js_Boot.__instanceof(command,hex_control_async_IAsyncCommand);
			if(isAsync) {
				var asynCommand;
				asynCommand = js_Boot.__cast(command , hex_control_async_IAsyncCommand);
				asynCommand.preExecute();
				if(mapping.get_hasCompleteHandler()) hex_control_async_AsyncCommandUtil.addListenersToAsyncCommand(mapping.getCompleteHandlers(),$bind(asynCommand,asynCommand.addCompleteHandler));
				if(mapping.get_hasFailHandler()) hex_control_async_AsyncCommandUtil.addListenersToAsyncCommand(mapping.getFailHandlers(),$bind(asynCommand,asynCommand.addFailHandler));
				if(mapping.get_hasCancelHandler()) hex_control_async_AsyncCommandUtil.addListenersToAsyncCommand(mapping.getCancelHandlers(),$bind(asynCommand,asynCommand.addCancelHandler));
			}
			Reflect.callMethod(command,command.getExecuteMethod(),[request]);
		}
	}
	,__class__: hex_control_command_CommandExecutor
};
var hex_control_command_ICommandMapping = function() { };
$hxClasses["hex.control.command.ICommandMapping"] = hex_control_command_ICommandMapping;
hex_control_command_ICommandMapping.__name__ = ["hex","control","command","ICommandMapping"];
hex_control_command_ICommandMapping.prototype = {
	__class__: hex_control_command_ICommandMapping
	,__properties__: {get_hasMappingResult:"get_hasMappingResult",get_hasCancelHandler:"get_hasCancelHandler",get_hasFailHandler:"get_hasFailHandler",get_hasCompleteHandler:"get_hasCompleteHandler",get_hasPayload:"get_hasPayload",get_isFiredOnce:"get_isFiredOnce",get_hasGuard:"get_hasGuard"}
};
var hex_control_command_CommandMapping = function(commandClass) {
	this._commandClass = commandClass;
	this.isFiredOnce = false;
};
$hxClasses["hex.control.command.CommandMapping"] = hex_control_command_CommandMapping;
hex_control_command_CommandMapping.__name__ = ["hex","control","command","CommandMapping"];
hex_control_command_CommandMapping.__interfaces__ = [hex_control_command_ICommandMapping];
hex_control_command_CommandMapping.prototype = {
	getCommandClass: function() {
		return this._commandClass;
	}
	,get_hasGuard: function() {
		return this._guards != null;
	}
	,getGuards: function() {
		return this._guards;
	}
	,withGuards: function(guards) {
		if(this._guards == null) this._guards = [];
		this._guards = this._guards.concat(guards);
		return this;
	}
	,get_isFiredOnce: function() {
		return this.isFiredOnce;
	}
	,once: function() {
		this.isFiredOnce = true;
		return this;
	}
	,get_hasPayload: function() {
		return this._payloads != null;
	}
	,getPayloads: function() {
		return this._payloads;
	}
	,withPayloads: function(payloads) {
		if(this._payloads == null) this._payloads = [];
		this._payloads = this._payloads.concat(payloads);
		return this;
	}
	,getCompleteHandlers: function() {
		return this._completeHandlers;
	}
	,get_hasCompleteHandler: function() {
		return this._completeHandlers != null;
	}
	,withCompleteHandlers: function(handler) {
		if(this._completeHandlers == null) this._completeHandlers = [];
		this._completeHandlers.push(handler);
		return this;
	}
	,getFailHandlers: function() {
		return this._failHandlers;
	}
	,get_hasFailHandler: function() {
		return this._failHandlers != null;
	}
	,withFailHandlers: function(handler) {
		if(this._failHandlers == null) this._failHandlers = [];
		this._failHandlers.push(handler);
		return this;
	}
	,getCancelHandlers: function() {
		return this._cancelHandlers;
	}
	,get_hasCancelHandler: function() {
		return this._cancelHandlers != null;
	}
	,withCancelHandlers: function(handler) {
		if(this._cancelHandlers == null) this._cancelHandlers = [];
		this._cancelHandlers.push(handler);
		return this;
	}
	,setContextOwner: function(contextOwner) {
		this._contextOwner = contextOwner;
	}
	,getContextOwner: function() {
		return this._contextOwner;
	}
	,get_hasMappingResult: function() {
		return this._mappingResults != null;
	}
	,withMappingResults: function(mappingResults) {
		if(this._mappingResults == null) this._mappingResults = [];
		this._mappingResults = this._mappingResults.concat(mappingResults);
		return this;
	}
	,setLastCommandInstance: function(command) {
		this._command = command;
	}
	,getPayloadResult: function() {
		var payload = [];
		if(this._mappingResults != null) {
			var _g = 0;
			var _g1 = this._mappingResults;
			while(_g < _g1.length) {
				var mapping = _g1[_g];
				++_g;
				var command;
				command = (js_Boot.__cast(mapping , hex_control_command_CommandMapping))._command;
				if(command != null) {
					var returnedExecutionPayload = command.getReturnedExecutionPayload();
					if(returnedExecutionPayload != null) payload = payload.concat(command.getReturnedExecutionPayload());
				}
			}
		}
		if(payload.length > 0) return payload; else return null;
	}
	,__class__: hex_control_command_CommandMapping
	,__properties__: {get_hasMappingResult:"get_hasMappingResult",get_hasCancelHandler:"get_hasCancelHandler",get_hasFailHandler:"get_hasFailHandler",get_hasCompleteHandler:"get_hasCompleteHandler",get_hasPayload:"get_hasPayload",get_isFiredOnce:"get_isFiredOnce",get_hasGuard:"get_hasGuard"}
};
var hex_control_guard_GuardUtil = function() {
	throw new js__$Boot_HaxeError(new hex_error_PrivateConstructorException("'GuardUtil' class can't be instantiated.",{ fileName : "GuardUtil.hx", lineNumber : 14, className : "hex.control.guard.GuardUtil", methodName : "new"}));
};
$hxClasses["hex.control.guard.GuardUtil"] = hex_control_guard_GuardUtil;
hex_control_guard_GuardUtil.__name__ = ["hex","control","guard","GuardUtil"];
hex_control_guard_GuardUtil.guardsApprove = function(guards,injector) {
	if(guards != null) {
		var _g = 0;
		while(_g < guards.length) {
			var guard = guards[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(guard,"approve")) guard = Reflect.field(guard,"approve"); else if(js_Boot.__instanceof(guard,Class)) {
				if(injector != null) guard = injector.instantiateUnmapped(guard); else guard = Type.createInstance(guard,[]);
				guard = guard.approve;
			}
			if(Reflect.isFunction(guard)) {
				var b = guard();
				if(!b) return false;
			}
		}
	}
	return true;
};
hex_control_guard_GuardUtil.prototype = {
	__class__: hex_control_guard_GuardUtil
};
var hex_control_macro_IMacroExecutor = function() { };
$hxClasses["hex.control.macro.IMacroExecutor"] = hex_control_macro_IMacroExecutor;
hex_control_macro_IMacroExecutor.__name__ = ["hex","control","macro","IMacroExecutor"];
hex_control_macro_IMacroExecutor.prototype = {
	__class__: hex_control_macro_IMacroExecutor
	,__properties__: {get_commandIndex:"get_commandIndex",get_hasRunEveryCommand:"get_hasRunEveryCommand",get_hasNextCommandMapping:"get_hasNextCommandMapping"}
};
var hex_control_macro_Macro = function() {
	this._isSequenceMode = true;
	this._isAtomic = true;
	hex_control_async_AsyncCommand.call(this);
	this.set_isAtomic(true);
	this.set_isInSequenceMode(true);
};
$hxClasses["hex.control.macro.Macro"] = hex_control_macro_Macro;
hex_control_macro_Macro.__name__ = ["hex","control","macro","Macro"];
hex_control_macro_Macro.__interfaces__ = [hex_control_async_IAsyncCommandListener];
hex_control_macro_Macro.__super__ = hex_control_async_AsyncCommand;
hex_control_macro_Macro.prototype = $extend(hex_control_async_AsyncCommand.prototype,{
	_prepare: function() {
		throw new js__$Boot_HaxeError(new hex_error_VirtualMethodException(Std.string(this) + ".execute must be overridden",{ fileName : "Macro.hx", lineNumber : 36, className : "hex.control.macro.Macro", methodName : "_prepare"}));
	}
	,preExecute: function() {
		if(this.macroExecutor != null) this.macroExecutor.setAsyncCommandListener(this); else throw new js__$Boot_HaxeError(new hex_error_NullPointerException("macroExecutor can't be null in '" + hex_log_Stringifier.stringify(this) + "'",{ fileName : "Macro.hx", lineNumber : 47, className : "hex.control.macro.Macro", methodName : "preExecute"}));
		this._prepare();
		hex_control_async_AsyncCommand.prototype.preExecute.call(this);
	}
	,execute: function(request) {
		!this.get_isRunning() && this._throwExecutionIllegalStateError();
		this._request = request;
		this._executeNextCommand();
	}
	,add: function(commandClass) {
		return this.macroExecutor.add(commandClass);
	}
	,addMapping: function(mapping) {
		return this.macroExecutor.addMapping(mapping);
	}
	,_executeCommand: function() {
		var command = this.macroExecutor.executeNextCommand(this._request);
		if(command != null) {
			var isAsync = js_Boot.__instanceof(command,hex_control_async_IAsyncCommand);
			if(!isAsync || this.get_isInParallelMode()) this._executeNextCommand();
		}
	}
	,_executeNextCommand: function() {
		if(this.macroExecutor.get_hasNextCommandMapping()) this._executeCommand(); else if(this.macroExecutor.get_hasRunEveryCommand()) this._handleComplete();
	}
	,get_isAtomic: function() {
		return this.isAtomic;
	}
	,set_isAtomic: function(value) {
		this.isAtomic = value;
		return value;
	}
	,get_isInSequenceMode: function() {
		return this.isInSequenceMode;
	}
	,set_isInSequenceMode: function(value) {
		this.isInSequenceMode = value;
		return value;
	}
	,get_isInParallelMode: function() {
		return !this.get_isInSequenceMode();
	}
	,set_isInParallelMode: function(value) {
		this.set_isInSequenceMode(!value);
		return this.get_isInSequenceMode();
	}
	,onAsyncCommandComplete: function(cmd) {
		this.macroExecutor.asyncCommandCalled(cmd);
		this._executeNextCommand();
	}
	,onAsyncCommandFail: function(cmd) {
		if(cmd != null) this.macroExecutor.asyncCommandCalled(cmd);
		if(this.get_isAtomic()) {
			if(this.get_isRunning()) this._handleFail();
		} else this._executeNextCommand();
	}
	,onAsyncCommandCancel: function(cmd) {
		this.macroExecutor.asyncCommandCalled(cmd);
		if(this.get_isAtomic()) this.cancel(); else this._executeNextCommand();
	}
	,toString: function() {
		return hex_log_Stringifier.stringify(this);
	}
	,__class__: hex_control_macro_Macro
	,__properties__: $extend(hex_control_async_AsyncCommand.prototype.__properties__,{set_isInParallelMode:"set_isInParallelMode",get_isInParallelMode:"get_isInParallelMode",set_isInSequenceMode:"set_isInSequenceMode",get_isInSequenceMode:"get_isInSequenceMode",set_isAtomic:"set_isAtomic",get_isAtomic:"get_isAtomic"})
});
var hex_control_macro_MacroExecutor = function() {
	this._commandMappingCollection = [];
	this._runningAsyncCommandList = [];
	this._commandIndex = 0;
	this._commandCalledCount = 0;
};
$hxClasses["hex.control.macro.MacroExecutor"] = hex_control_macro_MacroExecutor;
hex_control_macro_MacroExecutor.__name__ = ["hex","control","macro","MacroExecutor"];
hex_control_macro_MacroExecutor.__interfaces__ = [hex_control_macro_IMacroExecutor];
hex_control_macro_MacroExecutor.prototype = {
	executeCommand: function(mapping,request) {
		var injector = null;
		var contextOwner = mapping.getContextOwner();
		if(contextOwner != null) injector = contextOwner.getBasicInjector(); else injector = this.injector;
		var payloads = mapping.getPayloads();
		if(request != null) if(payloads != null) payloads = payloads.concat(request.getExecutionPayloads()); else payloads = request.getExecutionPayloads();
		if(mapping.get_hasMappingResult()) if(payloads != null) payloads = payloads.concat(mapping.getPayloadResult()); else payloads = mapping.getPayloadResult();
		if(payloads != null) hex_control_payload_PayloadUtil.mapPayload(payloads,injector);
		var command = null;
		if(!mapping.get_hasGuard() || hex_control_guard_GuardUtil.guardsApprove(mapping.getGuards(),injector)) {
			command = injector.getOrCreateNewInstance(mapping.getCommandClass());
			mapping.setLastCommandInstance(command);
		} else {
			this._commandCalledCount++;
			this._asyncCommandListener.onAsyncCommandFail(null);
			return null;
		}
		if(payloads != null) hex_control_payload_PayloadUtil.unmapPayload(payloads,injector);
		if(command != null) {
			if(injector.hasMapping(hex_module_IModule)) command.setOwner(injector.getInstance(hex_module_IModule));
			var isAsync = js_Boot.__instanceof(command,hex_control_async_IAsyncCommand);
			if(isAsync) {
				var aSyncCommand;
				aSyncCommand = js_Boot.__cast(command , hex_control_async_IAsyncCommand);
				aSyncCommand.preExecute();
				if(mapping.get_hasCompleteHandler()) hex_control_async_AsyncCommandUtil.addListenersToAsyncCommand(mapping.getCompleteHandlers(),$bind(aSyncCommand,aSyncCommand.addCompleteHandler));
				if(mapping.get_hasFailHandler()) hex_control_async_AsyncCommandUtil.addListenersToAsyncCommand(mapping.getFailHandlers(),$bind(aSyncCommand,aSyncCommand.addFailHandler));
				if(mapping.get_hasCancelHandler()) hex_control_async_AsyncCommandUtil.addListenersToAsyncCommand(mapping.getCancelHandlers(),$bind(aSyncCommand,aSyncCommand.addCancelHandler));
				aSyncCommand.addAsyncCommandListener(this._asyncCommandListener);
				this._runningAsyncCommandList.push(aSyncCommand);
			}
			Reflect.callMethod(command,command.getExecuteMethod(),[request]);
			if(!isAsync) this._commandCalledCount++;
		}
		return command;
	}
	,get_commandIndex: function() {
		return this._commandIndex;
	}
	,get_hasRunEveryCommand: function() {
		return this._commandCalledCount == this._commandMappingCollection.length;
	}
	,setAsyncCommandListener: function(listener) {
		this._asyncCommandListener = listener;
	}
	,get_hasNextCommandMapping: function() {
		return this._commandMappingCollection != null && this._commandIndex < this._commandMappingCollection.length;
	}
	,add: function(commandClass) {
		var mapping = new hex_control_command_CommandMapping(commandClass);
		this._commandMappingCollection.push(mapping);
		return mapping;
	}
	,addMapping: function(mapping) {
		this._commandMappingCollection.push(mapping);
		return mapping;
	}
	,executeNextCommand: function(request) {
		return this.executeCommand(this._commandMappingCollection[this._commandIndex++],request);
	}
	,asyncCommandCalled: function(asyncCommand) {
		var index = HxOverrides.indexOf(this._runningAsyncCommandList,asyncCommand,0);
		if(index > -1) {
			this._runningAsyncCommandList.splice(index,1);
			this._commandCalledCount++;
		} else throw new js__$Boot_HaxeError(new hex_error_IllegalStateException("Following command was not running: " + Std.string(asyncCommand),{ fileName : "MacroExecutor.hx", lineNumber : 179, className : "hex.control.macro.MacroExecutor", methodName : "asyncCommandCalled"}));
	}
	,__class__: hex_control_macro_MacroExecutor
	,__properties__: {get_hasNextCommandMapping:"get_hasNextCommandMapping",get_hasRunEveryCommand:"get_hasRunEveryCommand",get_commandIndex:"get_commandIndex"}
};
var hex_control_payload_ExecutionPayload = function(data,type,name) {
	if(name == null) name = "";
	if(data == null) throw new js__$Boot_HaxeError(new hex_error_NullPointerException("ExecutionPayload data can't be null",{ fileName : "ExecutionPayload.hx", lineNumber : 21, className : "hex.control.payload.ExecutionPayload", methodName : "new"})); else if(!js_Boot.__instanceof(data,type)) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("ExecutionPayload data '" + Std.string(data) + "' should be an instance of type '" + Std.string(type) + "'",{ fileName : "ExecutionPayload.hx", lineNumber : 25, className : "hex.control.payload.ExecutionPayload", methodName : "new"}));
	this._data = data;
	this._type = type;
	this._name = name;
};
$hxClasses["hex.control.payload.ExecutionPayload"] = hex_control_payload_ExecutionPayload;
hex_control_payload_ExecutionPayload.__name__ = ["hex","control","payload","ExecutionPayload"];
hex_control_payload_ExecutionPayload.prototype = {
	getData: function() {
		return this._data;
	}
	,getType: function() {
		return this._type;
	}
	,getName: function() {
		return this._name;
	}
	,withClass: function(type) {
		this._type = type;
		return this;
	}
	,withName: function(name) {
		if(name != null) this._name = name; else this._name = "";
		return this;
	}
	,__class__: hex_control_payload_ExecutionPayload
};
var hex_control_payload_PayloadUtil = function() {
	throw new js__$Boot_HaxeError(new hex_error_PrivateConstructorException("'PayloadUtil' class can't be instantiated.",{ fileName : "PayloadUtil.hx", lineNumber : 14, className : "hex.control.payload.PayloadUtil", methodName : "new"}));
};
$hxClasses["hex.control.payload.PayloadUtil"] = hex_control_payload_PayloadUtil;
hex_control_payload_PayloadUtil.__name__ = ["hex","control","payload","PayloadUtil"];
hex_control_payload_PayloadUtil.mapPayload = function(payloads,injector) {
	var _g = 0;
	while(_g < payloads.length) {
		var payload = payloads[_g];
		++_g;
		injector.mapToValue(payload.getType(),payload.getData(),payload.getName());
	}
};
hex_control_payload_PayloadUtil.unmapPayload = function(payloads,injector) {
	var _g = 0;
	while(_g < payloads.length) {
		var payload = payloads[_g];
		++_g;
		injector.unmap(payload.getType(),payload.getName());
	}
};
hex_control_payload_PayloadUtil.prototype = {
	__class__: hex_control_payload_PayloadUtil
};
var hex_core_HashCodeFactory = function() {
	throw new js__$Boot_HaxeError(new hex_error_PrivateConstructorException("'HashCodeFactory' class can't be instantiated.",{ fileName : "HashCodeFactory.hx", lineNumber : 15, className : "hex.core.HashCodeFactory", methodName : "new"}));
};
$hxClasses["hex.core.HashCodeFactory"] = hex_core_HashCodeFactory;
hex_core_HashCodeFactory.__name__ = ["hex","core","HashCodeFactory"];
hex_core_HashCodeFactory.getNextKEY = function() {
	return hex_core_HashCodeFactory._nKEY++;
};
hex_core_HashCodeFactory.getNextName = function() {
	return "" + hex_core_HashCodeFactory._nKEY;
};
hex_core_HashCodeFactory.getKey = function(o) {
	if(!(function($this) {
		var $r;
		var key = o;
		$r = hex_core_HashCodeFactory._M.h.__keys__[key.__id__] != null;
		return $r;
	}(this))) {
		var key1 = o;
		var value = hex_core_HashCodeFactory.getNextKEY();
		hex_core_HashCodeFactory._M.set(key1,value);
	}
	var key2 = o;
	return hex_core_HashCodeFactory._M.h[key2.__id__];
};
hex_core_HashCodeFactory.previewNextKey = function() {
	return hex_core_HashCodeFactory._nKEY;
};
hex_core_HashCodeFactory.prototype = {
	__class__: hex_core_HashCodeFactory
};
var hex_core_IAnnotationParsable = function() { };
$hxClasses["hex.core.IAnnotationParsable"] = hex_core_IAnnotationParsable;
hex_core_IAnnotationParsable.__name__ = ["hex","core","IAnnotationParsable"];
var hex_data_IParser = function() { };
$hxClasses["hex.data.IParser"] = hex_data_IParser;
hex_data_IParser.__name__ = ["hex","data","IParser"];
hex_data_IParser.prototype = {
	__class__: hex_data_IParser
};
var hex_di_IBasicInjector = function() { };
$hxClasses["hex.di.IBasicInjector"] = hex_di_IBasicInjector;
hex_di_IBasicInjector.__name__ = ["hex","di","IBasicInjector"];
hex_di_IBasicInjector.prototype = {
	__class__: hex_di_IBasicInjector
};
var hex_di_IContextOwner = function() { };
$hxClasses["hex.di.IContextOwner"] = hex_di_IContextOwner;
hex_di_IContextOwner.__name__ = ["hex","di","IContextOwner"];
hex_di_IContextOwner.prototype = {
	__class__: hex_di_IContextOwner
};
var hex_di_IDependencyInjector = function() { };
$hxClasses["hex.di.IDependencyInjector"] = hex_di_IDependencyInjector;
hex_di_IDependencyInjector.__name__ = ["hex","di","IDependencyInjector"];
hex_di_IDependencyInjector.__interfaces__ = [hex_di_IBasicInjector];
hex_di_IDependencyInjector.prototype = {
	__class__: hex_di_IDependencyInjector
};
var hex_di_IInjectable = function() { };
$hxClasses["hex.di.IInjectable"] = hex_di_IInjectable;
hex_di_IInjectable.__name__ = ["hex","di","IInjectable"];
hex_di_IInjectable.prototype = {
	__class__: hex_di_IInjectable
};
var hex_event_IEvent = function() { };
$hxClasses["hex.event.IEvent"] = hex_event_IEvent;
hex_event_IEvent.__name__ = ["hex","event","IEvent"];
hex_event_IEvent.prototype = {
	__class__: hex_event_IEvent
};
var hex_event_BasicEvent = function(type,target) {
	this.type = type;
	this.target = target;
};
$hxClasses["hex.event.BasicEvent"] = hex_event_BasicEvent;
hex_event_BasicEvent.__name__ = ["hex","event","BasicEvent"];
hex_event_BasicEvent.__interfaces__ = [hex_event_IEvent];
hex_event_BasicEvent.prototype = {
	clone: function() {
		return new hex_event_BasicEvent(this.type,this.target);
	}
	,toString: function() {
		return hex_log_Stringifier.stringify(this) + (":{ type:" + this.type + ", target:" + Std.string(this.target) + " }");
	}
	,__class__: hex_event_BasicEvent
};
var hex_di_InjectionEvent = function(type,target,instance,instanceType) {
	hex_event_BasicEvent.call(this,type,target);
	this.instance = instance;
	this.instanceType = instanceType;
};
$hxClasses["hex.di.InjectionEvent"] = hex_di_InjectionEvent;
hex_di_InjectionEvent.__name__ = ["hex","di","InjectionEvent"];
hex_di_InjectionEvent.__super__ = hex_event_BasicEvent;
hex_di_InjectionEvent.prototype = $extend(hex_event_BasicEvent.prototype,{
	clone: function() {
		return new hex_di_InjectionEvent(this.type,this.target,this.instance,this.instanceType);
	}
	,__class__: hex_di_InjectionEvent
});
var hex_di_Injector = function() {
	this._classDescriptor = new hex_di_reflect_ClassDescriptionProvider(new hex_di_annotation_AnnotationDataProvider(hex_di_IInjectorContainer));
	this._ed = new hex_event_LightweightClosureDispatcher();
	this._mapping = new haxe_ds_StringMap();
	this._processedMapping = new haxe_ds_StringMap();
	this._managedObjects = new haxe_ds_ObjectMap();
};
$hxClasses["hex.di.Injector"] = hex_di_Injector;
hex_di_Injector.__name__ = ["hex","di","Injector"];
hex_di_Injector.__interfaces__ = [hex_di_IDependencyInjector];
hex_di_Injector.prototype = {
	createChildInjector: function() {
		var injector = new hex_di_Injector();
		injector._parentInjector = this;
		return injector;
	}
	,addEventListener: function(eventType,callback) {
		return this._ed.addEventListener(eventType,callback);
	}
	,removeEventListener: function(eventType,callback) {
		return this._ed.removeEventListener(eventType,callback);
	}
	,mapToValue: function(clazz,value,name) {
		if(name == null) name = "";
		this.map(clazz,name).toValue(value);
	}
	,mapToType: function(clazz,type,name) {
		if(name == null) name = "";
		this.map(clazz,name).toType(type);
	}
	,mapToSingleton: function(clazz,type,name) {
		if(name == null) name = "";
		this.map(clazz,name).toSingleton(type);
	}
	,getInstance: function(type,name,targetType) {
		if(name == null) name = "";
		var mappingID = Type.getClassName(type) + "|" + name;
		var mapping = this._mapping.get(mappingID);
		if(this._mapping.get(mappingID) != null) return mapping.getResult(); else if(this._parentInjector != null) return this._parentInjector.getInstance(type,name); else throw new js__$Boot_HaxeError(new hex_di_error_MissingMappingException("'" + hex_log_Stringifier.stringify(this) + "' is missing a mapping to get instance with type '" + Type.getClassName(type) + "' inside instance of '" + hex_log_Stringifier.stringify(this) + "'. Target dependency: '" + mappingID + "'",{ fileName : "Injector.hx", lineNumber : 86, className : "hex.di.Injector", methodName : "getInstance"}));
	}
	,getProvider: function(type,name) {
		if(name == null) name = "";
		var mappingID = Type.getClassName(type) + "|" + name;
		var mapping = this._mapping.get(mappingID);
		if(this._mapping.get(mappingID) != null) return mapping.provider; else if(this._parentInjector != null) return this._parentInjector.getInstance(type,name); else return null;
	}
	,instantiateUnmapped: function(type) {
		var classDescription = this._classDescriptor.getClassDescription(type);
		var instance;
		if(classDescription != null && classDescription.constructorInjection != null) instance = classDescription.constructorInjection.createInstance(type,this); else instance = Type.createInstance(type,[]);
		this._ed.dispatchEvent(new hex_di_InjectionEvent("onPostInstantiate",this,instance,type));
		if(classDescription != null) this._applyInjection(instance,type,classDescription);
		return instance;
	}
	,getOrCreateNewInstance: function(type) {
		if(this.satisfies(type)) return this.getInstance(type); else return this.instantiateUnmapped(type);
	}
	,hasMapping: function(type,name) {
		if(name == null) name = "";
		var mappingID = Type.getClassName(type) + "|" + name;
		if(this._mapping.get(mappingID) != null) return true; else if(this._parentInjector != null) return this._parentInjector.hasMapping(type,name); else return false;
	}
	,unmap: function(type,name) {
		if(name == null) name = "";
		var mappingID = Type.getClassName(type) + "|" + name;
		var mapping = this._mapping.get(mappingID);
		if(mapping == null) throw new js__$Boot_HaxeError(new hex_di_error_InjectorException("unmap failed with mapping named '" + mappingID + "' @" + hex_log_Stringifier.stringify(this),{ fileName : "Injector.hx", lineNumber : 164, className : "hex.di.Injector", methodName : "unmap"}));
		mapping.provider.destroy();
		this._mapping.remove(mappingID);
	}
	,hasDirectMapping: function(type,name) {
		if(name == null) name = "";
		var mappingID = Type.getClassName(type) + "|" + name;
		return this._mapping.get(mappingID) != null;
	}
	,satisfies: function(type,name) {
		if(name == null) name = "";
		var mappingID = Type.getClassName(type) + "|" + name;
		var mapping = this._mapping.get(mappingID);
		if(this._mapping.get(mappingID) != null) return mapping.provider != null; else if(this._parentInjector != null) return this._parentInjector.satisfies(type,name); else return false;
	}
	,satisfiesDirectly: function(type,name) {
		if(name == null) name = "";
		var mappingID = Type.getClassName(type) + "|" + name;
		var mapping = this._mapping.get(mappingID);
		if(mapping != null) return mapping.provider != null; else return false;
	}
	,injectInto: function(target) {
		var targetType = Type.getClass(target);
		var classDescription = this._classDescriptor.getClassDescription(targetType);
		if(classDescription != null) this._applyInjection(target,targetType,classDescription);
	}
	,destroyInstance: function(instance) {
		var key = instance;
		this._managedObjects.remove(key);
		var classDescription = this._classDescriptor.getClassDescription(Type.getClass(instance));
		if(classDescription != null) {
			var _g = 0;
			var _g1 = classDescription.preDestroy;
			while(_g < _g1.length) {
				var preDestroy = _g1[_g];
				++_g;
				preDestroy.applyInjection(instance,this);
			}
		}
	}
	,map: function(type,name) {
		if(name == null) name = "";
		var mappingID = Type.getClassName(type) + "|" + name;
		if(this._mapping.get(mappingID) != null) return this._mapping.get(mappingID); else return this._createMapping(type,name,mappingID);
	}
	,teardown: function() {
		var $it0 = this._mapping.iterator();
		while( $it0.hasNext() ) {
			var mapping = $it0.next();
			mapping.provider.destroy();
		}
		var it = this._managedObjects.iterator();
		while(it.hasNext()) this.destroyInstance(it.next());
		this._mapping = new haxe_ds_StringMap();
		this._processedMapping = new haxe_ds_StringMap();
		this._managedObjects = new haxe_ds_ObjectMap();
		this._ed = new hex_event_LightweightClosureDispatcher();
	}
	,_createMapping: function(type,name,mappingID) {
		if(this._processedMapping.get(mappingID)) throw new js__$Boot_HaxeError(new hex_di_error_InjectorException("Mapping named '" + mappingID + "' is already processing @" + hex_log_Stringifier.stringify(this),{ fileName : "Injector.hx", lineNumber : 273, className : "hex.di.Injector", methodName : "_createMapping"}));
		{
			this._processedMapping.set(mappingID,true);
			true;
		}
		var mapping = new hex_di_mapping_InjectionMapping(this,type,name,mappingID);
		{
			this._mapping.set(mappingID,mapping);
			mapping;
		}
		this._processedMapping.remove(mappingID);
		return mapping;
	}
	,_applyInjection: function(target,targetType,classDescription) {
		this._ed.dispatchEvent(new hex_di_InjectionEvent("onPreConstruct",this,target,targetType));
		classDescription.applyInjection(target,this);
		if(classDescription.preDestroy.length > 0) {
			var key = target;
			var value = target;
			this._managedObjects.set(key,value);
		}
		this._ed.dispatchEvent(new hex_di_InjectionEvent("onPostConstruct",this,target,targetType));
	}
	,__class__: hex_di_Injector
};
var hex_di_annotation_IAnnotationDataProvider = function() { };
$hxClasses["hex.di.annotation.IAnnotationDataProvider"] = hex_di_annotation_IAnnotationDataProvider;
hex_di_annotation_IAnnotationDataProvider.__name__ = ["hex","di","annotation","IAnnotationDataProvider"];
hex_di_annotation_IAnnotationDataProvider.prototype = {
	__class__: hex_di_annotation_IAnnotationDataProvider
};
var hex_di_annotation_AnnotationDataProvider = function(type) {
	this._metadataName = Type.getClassName(type);
	this._annotatedClasses = new hex_collection_HashMap();
};
$hxClasses["hex.di.annotation.AnnotationDataProvider"] = hex_di_annotation_AnnotationDataProvider;
hex_di_annotation_AnnotationDataProvider.__name__ = ["hex","di","annotation","AnnotationDataProvider"];
hex_di_annotation_AnnotationDataProvider.__interfaces__ = [hex_di_annotation_IAnnotationDataProvider];
hex_di_annotation_AnnotationDataProvider.prototype = {
	getClassAnnotationData: function(type) {
		if(this._annotatedClasses.containsKey(type)) return this._annotatedClasses.get(type); else return this._getClassAnnotationData(type);
	}
	,_getClassAnnotationData: function(type) {
		var meta = Reflect.field(haxe_rtti_Meta.getType(type),this._metadataName);
		if(meta != null) {
			var classAnnotationData = JSON.parse(meta);
			this._annotatedClasses.put(type,classAnnotationData);
			return JSON.parse(meta);
		} else return null;
	}
	,__class__: hex_di_annotation_AnnotationDataProvider
};
var hex_error_Exception = function(message,posInfos) {
	this.message = message;
	this.posInfos = posInfos;
	this.name = hex_log_Stringifier.stringify(this);
	hex_log_Logger.ERROR(this.toString(),null,{ fileName : "Exception.hx", lineNumber : 24, className : "hex.error.Exception", methodName : "new"});
};
$hxClasses["hex.error.Exception"] = hex_error_Exception;
hex_error_Exception.__name__ = ["hex","error","Exception"];
hex_error_Exception.prototype = {
	toString: function() {
		return (this.posInfos != null?this.name + " at " + this.posInfos.className + "#" + this.posInfos.methodName + " line:" + this.posInfos.lineNumber + " in file '" + this.posInfos.fileName + "'":this.name) + " | " + this.message;
	}
	,__class__: hex_error_Exception
};
var hex_di_error_InjectorException = function(message,posInfos) {
	hex_error_Exception.call(this,message,posInfos);
};
$hxClasses["hex.di.error.InjectorException"] = hex_di_error_InjectorException;
hex_di_error_InjectorException.__name__ = ["hex","di","error","InjectorException"];
hex_di_error_InjectorException.__super__ = hex_error_Exception;
hex_di_error_InjectorException.prototype = $extend(hex_error_Exception.prototype,{
	__class__: hex_di_error_InjectorException
});
var hex_di_error_MissingMappingException = function(message,posInfos) {
	hex_di_error_InjectorException.call(this,message,posInfos);
};
$hxClasses["hex.di.error.MissingMappingException"] = hex_di_error_MissingMappingException;
hex_di_error_MissingMappingException.__name__ = ["hex","di","error","MissingMappingException"];
hex_di_error_MissingMappingException.__super__ = hex_di_error_InjectorException;
hex_di_error_MissingMappingException.prototype = $extend(hex_di_error_InjectorException.prototype,{
	__class__: hex_di_error_MissingMappingException
});
var hex_di_mapping_InjectionMapping = function(injector,type,name,mappingID) {
	this._injector = injector;
	this._type = type;
	this._name = name;
	this._mappingID = mappingID;
};
$hxClasses["hex.di.mapping.InjectionMapping"] = hex_di_mapping_InjectionMapping;
hex_di_mapping_InjectionMapping.__name__ = ["hex","di","mapping","InjectionMapping"];
hex_di_mapping_InjectionMapping.prototype = {
	getResult: function() {
		if(this.provider != null) return this.provider.getResult(this._injector);
		throw new js__$Boot_HaxeError(new hex_error_NullPointerException("can't retrieve result, mapping with id '" + this._mappingID + "' has no provider",{ fileName : "InjectionMapping.hx", lineNumber : 37, className : "hex.di.mapping.InjectionMapping", methodName : "getResult"}));
	}
	,asSingleton: function() {
		return this.toSingleton(this._type);
	}
	,toSingleton: function(type) {
		return this._toProvider(new hex_di_provider_SingletonProvider(type,this._injector));
	}
	,toType: function(type) {
		return this._toProvider(new hex_di_provider_ClassProvider(type));
	}
	,toValue: function(value) {
		return this._toProvider(new hex_di_provider_ValueProvider(value,this._injector));
	}
	,_toProvider: function(provider) {
		if(this.provider != null) console.log("Warning: Injector already has a mapping for " + this._mappingID + ".\n " + "If you have overridden this mapping intentionally you can use " + "\"injector.unmap()\" prior to your replacement mapping in order to " + "avoid seeing this message.");
		this.provider = provider;
		return this;
	}
	,__class__: hex_di_mapping_InjectionMapping
};
var hex_di_provider_IDependencyProvider = function() { };
$hxClasses["hex.di.provider.IDependencyProvider"] = hex_di_provider_IDependencyProvider;
hex_di_provider_IDependencyProvider.__name__ = ["hex","di","provider","IDependencyProvider"];
hex_di_provider_IDependencyProvider.prototype = {
	__class__: hex_di_provider_IDependencyProvider
};
var hex_di_provider_ClassProvider = function(type) {
	this._type = type;
};
$hxClasses["hex.di.provider.ClassProvider"] = hex_di_provider_ClassProvider;
hex_di_provider_ClassProvider.__name__ = ["hex","di","provider","ClassProvider"];
hex_di_provider_ClassProvider.__interfaces__ = [hex_di_provider_IDependencyProvider];
hex_di_provider_ClassProvider.prototype = {
	getResult: function(injector) {
		return injector.instantiateUnmapped(this._type);
	}
	,destroy: function() {
	}
	,__class__: hex_di_provider_ClassProvider
};
var hex_di_provider_SingletonProvider = function(type,injector) {
	this._isDestroyed = false;
	this._type = type;
	this._injector = injector;
};
$hxClasses["hex.di.provider.SingletonProvider"] = hex_di_provider_SingletonProvider;
hex_di_provider_SingletonProvider.__name__ = ["hex","di","provider","SingletonProvider"];
hex_di_provider_SingletonProvider.__interfaces__ = [hex_di_provider_IDependencyProvider];
hex_di_provider_SingletonProvider.prototype = {
	getResult: function(injector) {
		if(this._isDestroyed) throw new js__$Boot_HaxeError(new hex_di_error_InjectorException("Forbidden usage of unmapped singleton provider for type '" + Type.getClassName(this._value) + "'",{ fileName : "SingletonProvider.hx", lineNumber : 28, className : "hex.di.provider.SingletonProvider", methodName : "getResult"})); else if(this._value == null) this._value = this._injector.instantiateUnmapped(this._type);
		return this._value;
	}
	,destroy: function() {
		this._isDestroyed = true;
		if(this._value != null) this._injector.destroyInstance(this._value);
		this._injector = null;
		this._value = null;
	}
	,__class__: hex_di_provider_SingletonProvider
};
var hex_di_provider_ValueProvider = function(value,injector) {
	this._value = value;
	this._injector = injector;
};
$hxClasses["hex.di.provider.ValueProvider"] = hex_di_provider_ValueProvider;
hex_di_provider_ValueProvider.__name__ = ["hex","di","provider","ValueProvider"];
hex_di_provider_ValueProvider.__interfaces__ = [hex_di_provider_IDependencyProvider];
hex_di_provider_ValueProvider.prototype = {
	getResult: function(injector) {
		return this._value;
	}
	,destroy: function() {
		this._injector.destroyInstance(this._value);
		this._injector = null;
		this._value = null;
	}
	,__class__: hex_di_provider_ValueProvider
};
var hex_di_reflect_ArgumentInjectionVO = function(type,injectionName,isOptional) {
	if(isOptional == null) isOptional = false;
	this.isOptional = false;
	this.type = type;
	this.injectionName = injectionName;
	this.isOptional = isOptional;
};
$hxClasses["hex.di.reflect.ArgumentInjectionVO"] = hex_di_reflect_ArgumentInjectionVO;
hex_di_reflect_ArgumentInjectionVO.__name__ = ["hex","di","reflect","ArgumentInjectionVO"];
hex_di_reflect_ArgumentInjectionVO.prototype = {
	__class__: hex_di_reflect_ArgumentInjectionVO
};
var hex_di_reflect_ClassDescription = function(constructorInjection,injections,postConstruct,preDestroy) {
	this.constructorInjection = constructorInjection;
	this.injections = injections;
	this.postConstruct = postConstruct;
	this.preDestroy = preDestroy;
	if(this.postConstruct.length > 0) haxe_ds_ArraySort.sort(this.postConstruct,$bind(this,this._sort));
	if(this.preDestroy.length > 0) haxe_ds_ArraySort.sort(this.preDestroy,$bind(this,this._sort));
};
$hxClasses["hex.di.reflect.ClassDescription"] = hex_di_reflect_ClassDescription;
hex_di_reflect_ClassDescription.__name__ = ["hex","di","reflect","ClassDescription"];
hex_di_reflect_ClassDescription.__interfaces__ = [hex_di_IInjectable];
hex_di_reflect_ClassDescription.prototype = {
	_sort: function(a,b) {
		return a.order - b.order;
	}
	,applyInjection: function(target,injector) {
		var _g = 0;
		var _g1 = this.injections;
		while(_g < _g1.length) {
			var injection = _g1[_g];
			++_g;
			injection.applyInjection(target,injector);
		}
		var _g2 = 0;
		var _g11 = this.postConstruct;
		while(_g2 < _g11.length) {
			var injection1 = _g11[_g2];
			++_g2;
			injection1.applyInjection(target,injector);
		}
		return target;
	}
	,__class__: hex_di_reflect_ClassDescription
};
var hex_di_reflect_IClassDescriptionProvider = function() { };
$hxClasses["hex.di.reflect.IClassDescriptionProvider"] = hex_di_reflect_IClassDescriptionProvider;
hex_di_reflect_IClassDescriptionProvider.__name__ = ["hex","di","reflect","IClassDescriptionProvider"];
hex_di_reflect_IClassDescriptionProvider.prototype = {
	__class__: hex_di_reflect_IClassDescriptionProvider
};
var hex_di_reflect_ClassDescriptionProvider = function(classAnnotationDataProvider) {
	this._classAnnotationDataProvider = classAnnotationDataProvider;
	this._classDescription = new hex_collection_HashMap();
};
$hxClasses["hex.di.reflect.ClassDescriptionProvider"] = hex_di_reflect_ClassDescriptionProvider;
hex_di_reflect_ClassDescriptionProvider.__name__ = ["hex","di","reflect","ClassDescriptionProvider"];
hex_di_reflect_ClassDescriptionProvider.__interfaces__ = [hex_di_reflect_IClassDescriptionProvider];
hex_di_reflect_ClassDescriptionProvider.prototype = {
	getClassDescription: function(type) {
		if(this._classDescription.containsKey(type)) return this._classDescription.get(type); else return this._getClassDescription(type);
	}
	,_getClassDescription: function(type) {
		var classAnnotationData = this._classAnnotationDataProvider.getClassAnnotationData(type);
		if(classAnnotationData != null) {
			var injections = [];
			var postConstruct = [];
			var preDestroy = [];
			var _g = 0;
			var _g1 = classAnnotationData.props;
			while(_g < _g1.length) {
				var prop = _g1[_g];
				++_g;
				injections.push(new hex_di_reflect_PropertyInjection(prop.name,prop.type,prop.key,prop.isOpt));
			}
			var _g2 = 0;
			var _g11 = classAnnotationData.methods;
			while(_g2 < _g11.length) {
				var method = _g11[_g2];
				++_g2;
				var $arguments = [];
				var _g21 = 0;
				var _g3 = method.args;
				while(_g21 < _g3.length) {
					var arg = _g3[_g21];
					++_g21;
					$arguments.push(new hex_di_reflect_ArgumentInjectionVO(Type.resolveClass(arg.type),arg.key,arg.isOpt));
				}
				if(method.isPost) postConstruct.push(new hex_di_reflect_OrderedInjection(method.name,$arguments,method.order)); else if(method.isPre) preDestroy.push(new hex_di_reflect_OrderedInjection(method.name,$arguments,method.order)); else injections.push(new hex_di_reflect_MethodInjection(method.name,$arguments));
			}
			var ctor = classAnnotationData.ctor;
			var ctorArguments = [];
			var _g4 = 0;
			var _g12 = ctor.args;
			while(_g4 < _g12.length) {
				var arg1 = _g12[_g4];
				++_g4;
				ctorArguments.push(new hex_di_reflect_ArgumentInjectionVO(Type.resolveClass(arg1.type),arg1.key,arg1.isOpt));
			}
			var constructorInjection = new hex_di_reflect_ConstructorInjection(ctorArguments);
			var classDescription = new hex_di_reflect_ClassDescription(constructorInjection,injections,postConstruct,preDestroy);
			return classDescription;
		} else return null;
	}
	,__class__: hex_di_reflect_ClassDescriptionProvider
};
var hex_di_reflect_MethodInjection = function(methodName,args) {
	this.methodName = methodName;
	this.args = args;
};
$hxClasses["hex.di.reflect.MethodInjection"] = hex_di_reflect_MethodInjection;
hex_di_reflect_MethodInjection.__name__ = ["hex","di","reflect","MethodInjection"];
hex_di_reflect_MethodInjection.__interfaces__ = [hex_di_IInjectable];
hex_di_reflect_MethodInjection.prototype = {
	applyInjection: function(target,injector) {
		Reflect.callMethod(target,Reflect.field(target,this.methodName),this._gatherArgs(target,injector));
		return target;
	}
	,_gatherArgs: function(target,injector) {
		var args = [];
		var _g = 0;
		var _g1 = this.args;
		while(_g < _g1.length) {
			var arg = _g1[_g];
			++_g;
			var provider = injector.getProvider(arg.type,arg.injectionName);
			if(provider != null) args.push(provider.getResult(injector)); else if(!arg.isOptional) this._throwMissingMappingException(target,arg.type,arg.injectionName,injector);
		}
		return args;
	}
	,_throwMissingMappingException: function(target,type,injectionName,injector) {
		throw new js__$Boot_HaxeError(new hex_di_error_MissingMappingException("'" + hex_log_Stringifier.stringify(injector) + "' is missing a mapping to inject argument into method named '" + this.methodName + "' with type '" + Type.getClassName(type) + "' inside instance of '" + hex_log_Stringifier.stringify(target) + "'. Target dependency: '" + Type.getClassName(type) + "|" + injectionName + "'",{ fileName : "MethodInjection.hx", lineNumber : 52, className : "hex.di.reflect.MethodInjection", methodName : "_throwMissingMappingException"}));
	}
	,__class__: hex_di_reflect_MethodInjection
};
var hex_di_reflect_ConstructorInjection = function(args) {
	hex_di_reflect_MethodInjection.call(this,"new",args);
};
$hxClasses["hex.di.reflect.ConstructorInjection"] = hex_di_reflect_ConstructorInjection;
hex_di_reflect_ConstructorInjection.__name__ = ["hex","di","reflect","ConstructorInjection"];
hex_di_reflect_ConstructorInjection.__super__ = hex_di_reflect_MethodInjection;
hex_di_reflect_ConstructorInjection.prototype = $extend(hex_di_reflect_MethodInjection.prototype,{
	createInstance: function(type,injector) {
		return Type.createInstance(type,this._gatherArgs(type,injector));
	}
	,_throwMissingMappingException: function(target,type,injectionName,injector) {
		throw new js__$Boot_HaxeError(new hex_di_error_MissingMappingException("'" + hex_log_Stringifier.stringify(injector) + "' is missing a mapping to inject argument" + " with type '" + Type.getClassName(type) + "' into constructor of class '" + hex_log_Stringifier.stringify(target) + "'. Target dependency: '" + Type.getClassName(type) + "|" + injectionName + "'",{ fileName : "ConstructorInjection.hx", lineNumber : 26, className : "hex.di.reflect.ConstructorInjection", methodName : "_throwMissingMappingException"}));
	}
	,__class__: hex_di_reflect_ConstructorInjection
});
var hex_di_reflect_OrderedInjection = function(methodName,args,order) {
	if(order == null) order = 0;
	hex_di_reflect_MethodInjection.call(this,methodName,args);
	this.order = order;
};
$hxClasses["hex.di.reflect.OrderedInjection"] = hex_di_reflect_OrderedInjection;
hex_di_reflect_OrderedInjection.__name__ = ["hex","di","reflect","OrderedInjection"];
hex_di_reflect_OrderedInjection.__super__ = hex_di_reflect_MethodInjection;
hex_di_reflect_OrderedInjection.prototype = $extend(hex_di_reflect_MethodInjection.prototype,{
	__class__: hex_di_reflect_OrderedInjection
});
var hex_di_reflect_PropertyInjection = function(propertyName,propertyType,injectionName,isOptional) {
	if(isOptional == null) isOptional = false;
	if(injectionName == null) injectionName = "";
	this.propertyName = propertyName;
	this.propertyType = Type.resolveClass(propertyType);
	this.injectionName = injectionName;
	this.isOptional = isOptional;
};
$hxClasses["hex.di.reflect.PropertyInjection"] = hex_di_reflect_PropertyInjection;
hex_di_reflect_PropertyInjection.__name__ = ["hex","di","reflect","PropertyInjection"];
hex_di_reflect_PropertyInjection.__interfaces__ = [hex_di_IInjectable];
hex_di_reflect_PropertyInjection.prototype = {
	applyInjection: function(target,injector) {
		var provider = injector.getProvider(this.propertyType,this.injectionName);
		if(provider != null) Reflect.setProperty(target,this.propertyName,provider.getResult(injector)); else if(!this.isOptional) throw new js__$Boot_HaxeError(new hex_di_error_MissingMappingException("'" + hex_log_Stringifier.stringify(injector) + "' is missing a mapping to inject into property named '" + this.propertyName + "' with type '" + Type.getClassName(this.propertyType) + "' inside instance of '" + hex_log_Stringifier.stringify(target) + "'. Target dependency: '" + Type.getClassName(this.propertyType) + "|" + this.injectionName + "'",{ fileName : "PropertyInjection.hx", lineNumber : 37, className : "hex.di.reflect.PropertyInjection", methodName : "applyInjection"}));
		return target;
	}
	,__class__: hex_di_reflect_PropertyInjection
};
var hex_domain_IDomainDispatcher = function() { };
$hxClasses["hex.domain.IDomainDispatcher"] = hex_domain_IDomainDispatcher;
hex_domain_IDomainDispatcher.__name__ = ["hex","domain","IDomainDispatcher"];
hex_domain_IDomainDispatcher.prototype = {
	__class__: hex_domain_IDomainDispatcher
};
var hex_domain_DomainDispatcher = function(defaultDomain,dispatcherClass) {
	this.clear();
	this.setDefaultDomain(defaultDomain);
	this.setDispatcherClass(dispatcherClass);
};
$hxClasses["hex.domain.DomainDispatcher"] = hex_domain_DomainDispatcher;
hex_domain_DomainDispatcher.__name__ = ["hex","domain","DomainDispatcher"];
hex_domain_DomainDispatcher.__interfaces__ = [hex_domain_IDomainDispatcher];
hex_domain_DomainDispatcher.prototype = {
	setDispatcherClass: function(dispatcherClass) {
		if(dispatcherClass != null) this._dispatcherClass = dispatcherClass; else this._dispatcherClass = hex_event_Dispatcher;
	}
	,getDefaultDispatcher: function() {
		return this._domains.h[this._defaultDomain.__id__];
	}
	,getDefaultDomain: function() {
		return this._defaultDomain;
	}
	,setDefaultDomain: function(domain) {
		if(domain == null) this._defaultDomain = hex_domain_DefaultDomain.DOMAIN; else this._defaultDomain = domain;
		this.getDomainDispatcher(this.getDefaultDomain());
	}
	,clear: function() {
		this._domains = new haxe_ds_ObjectMap();
		var domain = this.getDefaultDomain();
		if(domain != null) this.getDomainDispatcher(domain);
	}
	,isRegistered: function(listener,messageType,domain) {
		if(this.hasChannelDispatcher(domain)) return this.getDomainDispatcher(domain).isRegistered(listener,messageType); else return false;
	}
	,hasChannelDispatcher: function(domain) {
		if(domain == null) return this._domains.h.__keys__[this._defaultDomain.__id__] != null; else return this._domains.h.__keys__[domain.__id__] != null;
	}
	,getDomainDispatcher: function(domain) {
		if(this.hasChannelDispatcher(domain)) if(domain == null) return this._domains.h[this._defaultDomain.__id__]; else return this._domains.h[domain.__id__]; else {
			var dispatcher = new hex_event_Dispatcher();
			this._domains.set(domain,dispatcher);
			return dispatcher;
		}
	}
	,releaseDomainDispatcher: function(domain) {
		if(this.hasChannelDispatcher(domain)) {
			this._domains.h[domain.__id__].removeAllListeners();
			this._domains.remove(domain);
			return true;
		} else return false;
	}
	,addListener: function(listener,domain) {
		return this.getDomainDispatcher(domain).addListener(listener);
	}
	,removeListener: function(listener,domain) {
		return this.getDomainDispatcher(domain).removeListener(listener);
	}
	,addHandler: function(messageType,scope,callback,domain) {
		return this.getDomainDispatcher(domain).addHandler(messageType,scope,callback);
	}
	,removeHandler: function(messageType,scope,callback,domain) {
		return this.getDomainDispatcher(domain).removeHandler(messageType,scope,callback);
	}
	,dispatch: function(messageType,domain,data) {
		this.getDomainDispatcher(domain).dispatch(messageType,data);
		if(domain != this._defaultDomain && domain != null) this.getDefaultDispatcher().dispatch(messageType,data);
	}
	,removeAllListeners: function() {
		var iterator = this._domains.keys();
		while(iterator.hasNext()) ((function($this) {
			var $r;
			var key = iterator.next();
			$r = $this._domains.h[key.__id__];
			return $r;
		}(this))).removeAllListeners();
		this.clear();
	}
	,__class__: hex_domain_DomainDispatcher
};
var hex_domain_IApplicationDomainDispatcher = function() { };
$hxClasses["hex.domain.IApplicationDomainDispatcher"] = hex_domain_IApplicationDomainDispatcher;
hex_domain_IApplicationDomainDispatcher.__name__ = ["hex","domain","IApplicationDomainDispatcher"];
hex_domain_IApplicationDomainDispatcher.__interfaces__ = [hex_domain_IDomainDispatcher];
var hex_domain_Domain = function(domainName) {
	if(domainName == null) throw new js__$Boot_HaxeError(new hex_error_NullPointerException("Domain's name can't be null",{ fileName : "Domain.hx", lineNumber : 20, className : "hex.domain.Domain", methodName : "new"})); else if(hex_domain_Domain._domainNames.exists(domainName)) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("Domain has already been registered with name '" + domainName + "'",{ fileName : "Domain.hx", lineNumber : 24, className : "hex.domain.Domain", methodName : "new"})); else {
		hex_domain_Domain._domainNames.set(domainName,this);
		this._domainName = domainName;
	}
};
$hxClasses["hex.domain.Domain"] = hex_domain_Domain;
hex_domain_Domain.__name__ = ["hex","domain","Domain"];
hex_domain_Domain.getDomain = function(domainName) {
	if(!hex_domain_Domain._domainNames.exists(domainName)) return null; else return hex_domain_Domain._domainNames.get(domainName);
};
hex_domain_Domain.prototype = {
	getName: function() {
		return this._domainName;
	}
	,toString: function() {
		return hex_log_Stringifier.stringify(this) + " with name '" + this.getName() + "'";
	}
	,__class__: hex_domain_Domain
};
var hex_domain_DomainUtil = function() {
};
$hxClasses["hex.domain.DomainUtil"] = hex_domain_DomainUtil;
hex_domain_DomainUtil.__name__ = ["hex","domain","DomainUtil"];
hex_domain_DomainUtil.getDomain = function(domainName,type) {
	var domain = null;
	if(hex_domain_DomainUtil._domain.exists(domainName)) domain = hex_domain_DomainUtil._domain.get(domainName); else {
		domain = Type.createInstance(type,[domainName]);
		hex_domain_DomainUtil._domain.set(domainName,domain);
	}
	return domain;
};
hex_domain_DomainUtil.prototype = {
	__class__: hex_domain_DomainUtil
};
var hex_domain_TopLevelDomain = function(domainName) {
	hex_domain_Domain.call(this,domainName);
};
$hxClasses["hex.domain.TopLevelDomain"] = hex_domain_TopLevelDomain;
hex_domain_TopLevelDomain.__name__ = ["hex","domain","TopLevelDomain"];
hex_domain_TopLevelDomain.__super__ = hex_domain_Domain;
hex_domain_TopLevelDomain.prototype = $extend(hex_domain_Domain.prototype,{
	__class__: hex_domain_TopLevelDomain
});
var hex_event_IDispatcher = function() { };
$hxClasses["hex.event.IDispatcher"] = hex_event_IDispatcher;
hex_event_IDispatcher.__name__ = ["hex","event","IDispatcher"];
hex_event_IDispatcher.prototype = {
	__class__: hex_event_IDispatcher
};
var hex_event_Dispatcher = function() {
	this._isSealed = false;
	this._cachedMethodCalls = [];
	this._listeners = new haxe_ds_ObjectMap();
};
$hxClasses["hex.event.Dispatcher"] = hex_event_Dispatcher;
hex_event_Dispatcher.__name__ = ["hex","event","Dispatcher"];
hex_event_Dispatcher.__interfaces__ = [hex_event_IDispatcher];
hex_event_Dispatcher.prototype = {
	dispatch: function(messageType,data) {
		this._seal(true);
		var parameters = null;
		var iterator = this._listeners.keys();
		while(iterator.hasNext()) {
			var listener = iterator.next();
			var m = this._listeners.h[listener.__id__];
			if(Lambda.count(m) > 0) {
				if(m.h.__keys__[messageType.__id__] != null) {
					var handler = m.h[messageType.__id__];
					handler.call(data);
				}
			} else {
				var messageName = messageType.name;
				var callback = Reflect.field(listener,messageName);
				if(callback != null && messageName != "handleMessage") callback.apply(listener,data); else {
					callback = Reflect.field(listener,"handleMessage");
					if(callback != null) {
						if(parameters == null) {
							parameters = [messageType];
							if(data != null) parameters = parameters.concat(data);
						}
						callback.apply(listener,parameters);
					} else {
						var msg = hex_log_Stringifier.stringify(this) + ".dispatch failed. " + " You must implement '" + messageType.name + "' or 'handleMessage' method in '" + hex_log_Stringifier.stringify(listener) + "' instance.";
						throw new js__$Boot_HaxeError(new hex_error_UnsupportedOperationException(msg,{ fileName : "Dispatcher.hx", lineNumber : 74, className : "hex.event.Dispatcher", methodName : "dispatch"}));
					}
				}
			}
		}
		this._seal(false);
	}
	,addHandler: function(messageType,scope,callback) {
		if(!this._isSealed) {
			if((function($this) {
				var $r;
				var key = scope;
				$r = $this._listeners.h.__keys__[key.__id__] != null;
				return $r;
			}(this))) {
				var m;
				var key1 = scope;
				m = this._listeners.h[key1.__id__];
				if(Lambda.count(m) == 0) {
					var msg = hex_log_Stringifier.stringify(this) + ".addHandler failed. " + hex_log_Stringifier.stringify(scope) + " is already registered for all message types.";
					throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(msg,{ fileName : "Dispatcher.hx", lineNumber : 95, className : "hex.event.Dispatcher", methodName : "addHandler"}));
				} else if(m.h.__keys__[messageType.__id__] != null) {
					var handler = m.h[messageType.__id__];
					return handler.add(callback);
				} else {
					var handler1 = new hex_event_CallbackHandler(scope,callback);
					m.set(messageType,handler1);
					return true;
				}
			} else {
				var m1 = new haxe_ds_ObjectMap();
				var handler2 = new hex_event_CallbackHandler(scope,callback);
				m1.set(messageType,handler2);
				var key2 = scope;
				this._listeners.set(key2,m1);
				return true;
			}
		} else {
			this._cachedMethodCalls.push((function(f,a1,a2,a3) {
				return function() {
					return f(a1,a2,a3);
				};
			})($bind(this,this.addHandler),messageType,scope,callback));
			return false;
		}
	}
	,removeHandler: function(messageType,scope,callback) {
		if(!this._isSealed) {
			if((function($this) {
				var $r;
				var key = scope;
				$r = $this._listeners.h.__keys__[key.__id__] != null;
				return $r;
			}(this))) {
				var m;
				var key1 = scope;
				m = this._listeners.h[key1.__id__];
				if(Lambda.count(m) == 0) {
					var msg = hex_log_Stringifier.stringify(this) + ".removeHandler failed. " + hex_log_Stringifier.stringify(scope) + " is registered for all message types." + " Use 'removeListener' to unsubscribe.";
					throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(msg,{ fileName : "Dispatcher.hx", lineNumber : 139, className : "hex.event.Dispatcher", methodName : "removeHandler"}));
				} else if(m.h.__keys__[messageType.__id__] != null) {
					var handler = m.h[messageType.__id__];
					var b = handler.remove(callback);
					if(handler.isEmpty()) {
						m.remove(messageType);
						if(Lambda.count(m) == 0) {
							var key2 = scope;
							this._listeners.remove(key2);
						}
					}
					return b;
				} else return false;
			} else return false;
		} else {
			this._cachedMethodCalls.push((function(f,a1,a2,a3) {
				return function() {
					return f(a1,a2,a3);
				};
			})($bind(this,this.removeHandler),messageType,scope,callback));
			return false;
		}
	}
	,addListener: function(listener) {
		if(!this._isSealed) {
			if(this._listeners.h.__keys__[listener.__id__] != null) {
				var m = this._listeners.h[listener.__id__];
				if(Lambda.count(m) > 0) {
					var msg = hex_log_Stringifier.stringify(this) + ".addListener failed. " + hex_log_Stringifier.stringify(listener) + " is already registered to ";
					var iterator = m.keys();
					while(iterator.hasNext()) msg += "'" + Std.string(iterator.next()) + "' ";
					msg += "message types.";
					throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(msg,{ fileName : "Dispatcher.hx", lineNumber : 192, className : "hex.event.Dispatcher", methodName : "addListener"}));
				} else return false;
			} else {
				var value = new haxe_ds_ObjectMap();
				this._listeners.set(listener,value);
				return true;
			}
		} else {
			this._cachedMethodCalls.push((function(f,a1) {
				return function() {
					return f(a1);
				};
			})($bind(this,this.addListener),listener));
			return false;
		}
	}
	,removeListener: function(listener) {
		if(!this._isSealed) {
			if(this._listeners.h.__keys__[listener.__id__] != null) {
				this._listeners.remove(listener);
				return true;
			} else return false;
		} else {
			this._cachedMethodCalls.push((function(f,a1) {
				return function() {
					return f(a1);
				};
			})($bind(this,this.removeListener),listener));
			return false;
		}
	}
	,removeAllListeners: function() {
		if(!this._isSealed) this._listeners = new haxe_ds_ObjectMap(); else this._cachedMethodCalls.push((function(f) {
			return function() {
				f();
			};
		})($bind(this,this.removeAllListeners)));
	}
	,isEmpty: function() {
		return Lambda.count(this._listeners) == 0;
	}
	,isRegistered: function(listener,messageType) {
		if(this._listeners.h.__keys__[listener.__id__] != null) {
			if(messageType == null) return true; else {
				var m = this._listeners.h[listener.__id__];
				return m.h.__keys__[messageType.__id__] != null;
			}
		} else return false;
	}
	,hasHandler: function(messageType,scope) {
		if(scope == null) {
			var iterator = this._listeners.keys();
			while(iterator.hasNext()) {
				var listener = iterator.next();
				var m = this._listeners.h[listener.__id__];
				if(Lambda.count(m) == 0) return true; else if(m.h.__keys__[messageType.__id__] != null) return true;
			}
			return false;
		} else if((function($this) {
			var $r;
			var key = scope;
			$r = $this._listeners.h.__keys__[key.__id__] != null;
			return $r;
		}(this))) {
			var m1;
			var key1 = scope;
			m1 = this._listeners.h[key1.__id__];
			if(Lambda.count(m1) == 0) return true; else if(m1.h.__keys__[messageType.__id__] != null) return true;
			return false;
		} else return false;
	}
	,_seal: function(isSealed) {
		if(isSealed != this._isSealed) {
			this._isSealed = isSealed;
			if(!this._isSealed && this._cachedMethodCalls.length > 0) {
				var _g = 0;
				var _g1 = this._cachedMethodCalls;
				while(_g < _g1.length) {
					var cachedMethodCall = _g1[_g];
					++_g;
					cachedMethodCall();
				}
				this._cachedMethodCalls = [];
			}
		}
	}
	,__class__: hex_event_Dispatcher
};
var hex_domain_ApplicationDomainDispatcher = function() {
	hex_domain_DomainDispatcher.call(this,hex_domain_TopLevelDomain.DOMAIN,hex_event_Dispatcher);
};
$hxClasses["hex.domain.ApplicationDomainDispatcher"] = hex_domain_ApplicationDomainDispatcher;
hex_domain_ApplicationDomainDispatcher.__name__ = ["hex","domain","ApplicationDomainDispatcher"];
hex_domain_ApplicationDomainDispatcher.__interfaces__ = [hex_domain_IApplicationDomainDispatcher];
hex_domain_ApplicationDomainDispatcher.getInstance = function() {
	return hex_domain_ApplicationDomainDispatcher._Instance;
};
hex_domain_ApplicationDomainDispatcher.__super__ = hex_domain_DomainDispatcher;
hex_domain_ApplicationDomainDispatcher.prototype = $extend(hex_domain_DomainDispatcher.prototype,{
	getDomainDispatcher: function(domain) {
		if(domain != hex_domain_NoDomain.DOMAIN) return hex_domain_DomainDispatcher.prototype.getDomainDispatcher.call(this,domain); else return null;
	}
	,__class__: hex_domain_ApplicationDomainDispatcher
});
var hex_domain_DefaultDomain = function(domainName) {
	hex_domain_Domain.call(this,domainName);
};
$hxClasses["hex.domain.DefaultDomain"] = hex_domain_DefaultDomain;
hex_domain_DefaultDomain.__name__ = ["hex","domain","DefaultDomain"];
hex_domain_DefaultDomain.__super__ = hex_domain_Domain;
hex_domain_DefaultDomain.prototype = $extend(hex_domain_Domain.prototype,{
	__class__: hex_domain_DefaultDomain
});
var hex_domain_DomainExpert = function() {
	this._registeredDomains = new haxe_ds_IntMap();
	this._subscribedModules = new haxe_ds_ObjectMap();
	this._removedModules = new haxe_ds_StringMap();
};
$hxClasses["hex.domain.DomainExpert"] = hex_domain_DomainExpert;
hex_domain_DomainExpert.__name__ = ["hex","domain","DomainExpert"];
hex_domain_DomainExpert.getInstance = function() {
	return hex_domain_DomainExpert._Instance;
};
hex_domain_DomainExpert.prototype = {
	getDomainFor: function(module) {
		if(!(this._subscribedModules.h.__keys__[module.__id__] != null)) {
			if(this._registeredDomains.h.hasOwnProperty(hex_domain_DomainExpert._DomainIndex)) {
				var moduleDomain = this._registeredDomains.h[hex_domain_DomainExpert._DomainIndex];
				this._registeredDomains.remove(hex_domain_DomainExpert._DomainIndex);
				hex_domain_DomainExpert._DomainIndex++;
				var key = moduleDomain.getName();
				this._removedModules.set(key,false);
				this._subscribedModules.set(module,moduleDomain);
				return moduleDomain;
			} else {
				var key1 = Type.getClassName(module == null?null:js_Boot.getClass(module)) + hex_core_HashCodeFactory.getKey(module);
				if(this._removedModules.exists(key1) && this._removedModules.get(key1)) return null; else {
					var domain = hex_domain_DomainUtil.getDomain(key1,hex_domain_Domain);
					this._removedModules.set(key1,false);
					this._subscribedModules.set(module,domain);
					return domain;
				}
			}
		} else return this._subscribedModules.h[module.__id__];
	}
	,registerDomain: function(domain) {
		this._registeredDomains.h[hex_domain_DomainExpert._DomainIndex] = domain;
	}
	,releaseDomain: function(module) {
		if(module.get_isReleased()) {
			var key = Type.getClassName(module == null?null:js_Boot.getClass(module)) + hex_core_HashCodeFactory.getKey(module);
			if(this._removedModules.exists(key)) this._removedModules.set(key,true); else {
				var key1 = module.getDomain().getName();
				this._removedModules.set(key1,true);
			}
			this._subscribedModules.remove(module);
		} else throw new js__$Boot_HaxeError(new hex_error_IllegalStateException("Illegal call, '" + Std.string(module) + "' is not released.",{ fileName : "DomainExpert.hx", lineNumber : 93, className : "hex.domain.DomainExpert", methodName : "releaseDomain"}));
	}
	,__class__: hex_domain_DomainExpert
};
var hex_domain_NoDomain = function(domainName) {
	hex_domain_Domain.call(this,domainName);
};
$hxClasses["hex.domain.NoDomain"] = hex_domain_NoDomain;
hex_domain_NoDomain.__name__ = ["hex","domain","NoDomain"];
hex_domain_NoDomain.__super__ = hex_domain_Domain;
hex_domain_NoDomain.prototype = $extend(hex_domain_Domain.prototype,{
	__class__: hex_domain_NoDomain
});
var hex_error_IllegalArgumentException = function(message,posInfos) {
	hex_error_Exception.call(this,message,posInfos);
};
$hxClasses["hex.error.IllegalArgumentException"] = hex_error_IllegalArgumentException;
hex_error_IllegalArgumentException.__name__ = ["hex","error","IllegalArgumentException"];
hex_error_IllegalArgumentException.__super__ = hex_error_Exception;
hex_error_IllegalArgumentException.prototype = $extend(hex_error_Exception.prototype,{
	__class__: hex_error_IllegalArgumentException
});
var hex_error_IllegalStateException = function(message,posInfos) {
	hex_error_Exception.call(this,message,posInfos);
};
$hxClasses["hex.error.IllegalStateException"] = hex_error_IllegalStateException;
hex_error_IllegalStateException.__name__ = ["hex","error","IllegalStateException"];
hex_error_IllegalStateException.__super__ = hex_error_Exception;
hex_error_IllegalStateException.prototype = $extend(hex_error_Exception.prototype,{
	__class__: hex_error_IllegalStateException
});
var hex_error_NoSuchElementException = function(message,posInfos) {
	hex_error_Exception.call(this,message,posInfos);
};
$hxClasses["hex.error.NoSuchElementException"] = hex_error_NoSuchElementException;
hex_error_NoSuchElementException.__name__ = ["hex","error","NoSuchElementException"];
hex_error_NoSuchElementException.__super__ = hex_error_Exception;
hex_error_NoSuchElementException.prototype = $extend(hex_error_Exception.prototype,{
	__class__: hex_error_NoSuchElementException
});
var hex_error_NullPointerException = function(message,posInfos) {
	hex_error_Exception.call(this,message,posInfos);
};
$hxClasses["hex.error.NullPointerException"] = hex_error_NullPointerException;
hex_error_NullPointerException.__name__ = ["hex","error","NullPointerException"];
hex_error_NullPointerException.__super__ = hex_error_Exception;
hex_error_NullPointerException.prototype = $extend(hex_error_Exception.prototype,{
	__class__: hex_error_NullPointerException
});
var hex_error_PrivateConstructorException = function(message,posInfos) {
	hex_error_Exception.call(this,message,posInfos);
};
$hxClasses["hex.error.PrivateConstructorException"] = hex_error_PrivateConstructorException;
hex_error_PrivateConstructorException.__name__ = ["hex","error","PrivateConstructorException"];
hex_error_PrivateConstructorException.__super__ = hex_error_Exception;
hex_error_PrivateConstructorException.prototype = $extend(hex_error_Exception.prototype,{
	__class__: hex_error_PrivateConstructorException
});
var hex_error_UnsupportedOperationException = function(message,posInfos) {
	hex_error_Exception.call(this,message,posInfos);
};
$hxClasses["hex.error.UnsupportedOperationException"] = hex_error_UnsupportedOperationException;
hex_error_UnsupportedOperationException.__name__ = ["hex","error","UnsupportedOperationException"];
hex_error_UnsupportedOperationException.__super__ = hex_error_Exception;
hex_error_UnsupportedOperationException.prototype = $extend(hex_error_Exception.prototype,{
	__class__: hex_error_UnsupportedOperationException
});
var hex_error_VirtualMethodException = function(message,posInfos) {
	hex_error_Exception.call(this,message,posInfos);
};
$hxClasses["hex.error.VirtualMethodException"] = hex_error_VirtualMethodException;
hex_error_VirtualMethodException.__name__ = ["hex","error","VirtualMethodException"];
hex_error_VirtualMethodException.__super__ = hex_error_Exception;
hex_error_VirtualMethodException.prototype = $extend(hex_error_Exception.prototype,{
	__class__: hex_error_VirtualMethodException
});
var hex_event_BasicHandler = function(scope,callback) {
	this.scope = scope;
	this.callback = callback;
};
$hxClasses["hex.event.BasicHandler"] = hex_event_BasicHandler;
hex_event_BasicHandler.__name__ = ["hex","event","BasicHandler"];
hex_event_BasicHandler.prototype = {
	__class__: hex_event_BasicHandler
};
var hex_event_CallbackHandler = function(scope,callback) {
	this.callbacks = [];
	this.scope = scope;
	this.callbacks.push(callback);
};
$hxClasses["hex.event.CallbackHandler"] = hex_event_CallbackHandler;
hex_event_CallbackHandler.__name__ = ["hex","event","CallbackHandler"];
hex_event_CallbackHandler.prototype = {
	call: function(data) {
		var _g = 0;
		var _g1 = this.callbacks;
		while(_g < _g1.length) {
			var callback = _g1[_g];
			++_g;
			Reflect.callMethod(this.scope,callback,data);
		}
	}
	,add: function(callback) {
		if((function($this) {
			var $r;
			var x = callback;
			$r = HxOverrides.indexOf($this.callbacks,x,0);
			return $r;
		}(this)) == -1) {
			this.callbacks.push(callback);
			return true;
		} else return false;
	}
	,remove: function(callback) {
		var index;
		var x = callback;
		index = HxOverrides.indexOf(this.callbacks,x,0);
		if(index != -1) {
			this.callbacks.splice(index,1);
			return true;
		} else return false;
	}
	,isEmpty: function() {
		return this.callbacks.length == 0;
	}
	,__class__: hex_event_CallbackHandler
};
var hex_event_ClassAdapter = function() {
};
$hxClasses["hex.event.ClassAdapter"] = hex_event_ClassAdapter;
hex_event_ClassAdapter.__name__ = ["hex","event","ClassAdapter"];
hex_event_ClassAdapter.prototype = {
	setCallBackMethod: function(callbackTarget,callbackMethod) {
		this._callbackTarget = callbackTarget;
		this._callbackMethod = callbackMethod;
	}
	,setAdapterClass: function(adapterClass) {
		this._adapterClass = adapterClass;
	}
	,setFactoryMethod: function(factoryTarget,factoryMethod) {
		this._factoryTarget = factoryTarget;
		this._factoryMethod = factoryMethod;
	}
	,setAnnotationProvider: function(annotationProvider) {
		this._annotationProvider = annotationProvider;
	}
	,getCallbackAdapter: function() {
		var annotationProvider = this._annotationProvider;
		var callbackTarget = this._callbackTarget;
		var callbackMethod = this._callbackMethod;
		var adapterInstance = null;
		var adapterClass = null;
		var factoryTarget = null;
		var factoryMethod = null;
		var isEventAdapterStrategyMacro = false;
		if(this._adapterClass != null) {
			adapterClass = this._adapterClass;
			factoryTarget = this._factoryTarget;
			factoryMethod = this._factoryMethod;
			isEventAdapterStrategyMacro = hex_util_ClassUtil.classExtendsOrImplements(this._adapterClass,hex_event_MacroAdapterStrategy);
			if(!isEventAdapterStrategyMacro) adapterInstance = this._factoryMethod != null?this._adapterInstance = this._factoryMethod(this._adapterClass):this._adapterInstance = Type.createInstance(this._adapterClass,[]);
		}
		var f = function(rest) {
			var result = null;
			if(isEventAdapterStrategyMacro) {
				var aSyncCommand;
				if(factoryTarget != null && factoryMethod != null) aSyncCommand = factoryMethod(adapterClass); else aSyncCommand = Type.createInstance(adapterClass,[]);
				if(js_Boot.__instanceof(aSyncCommand,hex_event_IAdapterStrategy) == false) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("adapterInstance class should extend AdapterStrategy. Check if you passed the correct class",{ fileName : "ClassAdapter.hx", lineNumber : 105, className : "hex.event.ClassAdapter", methodName : "getCallbackAdapter"}));
				if(js_Boot.__instanceof(aSyncCommand,hex_core_IAnnotationParsable)) annotationProvider.parse(aSyncCommand);
				adapterInstance = aSyncCommand;
				$bind(aSyncCommand,aSyncCommand.adapt).apply(aSyncCommand,rest);
				aSyncCommand.preExecute();
				var handler = new hex_event__$ClassAdapter_MacroAdapterStrategyHandler(callbackTarget,callbackMethod);
				aSyncCommand.addCompleteHandler(handler,$bind(handler,handler.onAsyncCommandComplete));
				aSyncCommand.execute();
				return;
			} else if(adapterInstance != null) {
				if(js_Boot.__instanceof(adapterInstance,hex_core_IAnnotationParsable)) annotationProvider.parse(adapterInstance);
				if(js_Boot.__instanceof(adapterInstance,hex_event_IAdapterStrategy) == false) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("adapterInstance class should extend AdapterStrategy. Check if you passed the correct class",{ fileName : "ClassAdapter.hx", lineNumber : 133, className : "hex.event.ClassAdapter", methodName : "getCallbackAdapter"}));
				result = $bind(adapterInstance,adapterInstance.adapt).apply(adapterInstance,[rest]);
			}
			Reflect.callMethod(callbackTarget,callbackMethod,(result instanceof Array) && result.__enum__ == null?result:[result]);
		};
		return Reflect.makeVarArgs(f);
	}
	,__class__: hex_event_ClassAdapter
};
var hex_event__$ClassAdapter_MacroAdapterStrategyHandler = function(scope,callback) {
	this.scope = scope;
	this.callback = callback;
};
$hxClasses["hex.event._ClassAdapter.MacroAdapterStrategyHandler"] = hex_event__$ClassAdapter_MacroAdapterStrategyHandler;
hex_event__$ClassAdapter_MacroAdapterStrategyHandler.__name__ = ["hex","event","_ClassAdapter","MacroAdapterStrategyHandler"];
hex_event__$ClassAdapter_MacroAdapterStrategyHandler.prototype = {
	onAsyncCommandComplete: function(command) {
		if(this.callback != null) Reflect.callMethod(this.scope,this.callback,[command.getResult()]);
	}
	,__class__: hex_event__$ClassAdapter_MacroAdapterStrategyHandler
};
var hex_event_CompositeDispatcher = function() {
	this._isSealed = false;
	this._cachedMethodCalls = [];
	this._dispatchers = [];
};
$hxClasses["hex.event.CompositeDispatcher"] = hex_event_CompositeDispatcher;
hex_event_CompositeDispatcher.__name__ = ["hex","event","CompositeDispatcher"];
hex_event_CompositeDispatcher.__interfaces__ = [hex_event_IDispatcher];
hex_event_CompositeDispatcher.prototype = {
	dispatch: function(messageType,data) {
		this._seal(true);
		var _g = 0;
		var _g1 = this._dispatchers;
		while(_g < _g1.length) {
			var dispatcher = _g1[_g];
			++_g;
			dispatcher.dispatch(messageType,data);
		}
		this._seal(false);
	}
	,addHandler: function(messageType,scope,callback) {
		if(!this._isSealed) {
			var b = false;
			var _g = 0;
			var _g1 = this._dispatchers;
			while(_g < _g1.length) {
				var dispatcher = _g1[_g];
				++_g;
				b = dispatcher.addHandler(messageType,scope,callback) || b;
			}
			return b;
		} else {
			this._cachedMethodCalls.push((function(f,a1,a2,a3) {
				return function() {
					return f(a1,a2,a3);
				};
			})($bind(this,this.addHandler),messageType,scope,callback));
			return false;
		}
	}
	,removeHandler: function(messageType,scope,callback) {
		if(!this._isSealed) {
			var b = false;
			var _g = 0;
			var _g1 = this._dispatchers;
			while(_g < _g1.length) {
				var dispatcher = _g1[_g];
				++_g;
				b = dispatcher.removeHandler(messageType,scope,callback) || b;
			}
			return b;
		} else {
			this._cachedMethodCalls.push((function(f,a1,a2,a3) {
				return function() {
					return f(a1,a2,a3);
				};
			})($bind(this,this.removeHandler),messageType,scope,callback));
			return false;
		}
	}
	,addListener: function(listener) {
		throw new js__$Boot_HaxeError(new hex_error_UnsupportedOperationException("'addListener' is not supported in '" + hex_log_Stringifier.stringify(this) + "'",{ fileName : "CompositeDispatcher.hx", lineNumber : 75, className : "hex.event.CompositeDispatcher", methodName : "addListener"}));
	}
	,removeListener: function(listener) {
		throw new js__$Boot_HaxeError(new hex_error_UnsupportedOperationException("'removeListener' is not supported in '" + hex_log_Stringifier.stringify(this) + "'",{ fileName : "CompositeDispatcher.hx", lineNumber : 80, className : "hex.event.CompositeDispatcher", methodName : "removeListener"}));
	}
	,removeAllListeners: function() {
		if(!this._isSealed) {
			var _g = 0;
			var _g1 = this._dispatchers;
			while(_g < _g1.length) {
				var dispatcher = _g1[_g];
				++_g;
				dispatcher.removeAllListeners();
			}
		} else this._cachedMethodCalls.push((function(f) {
			return function() {
				f();
			};
		})($bind(this,this.removeAllListeners)));
	}
	,isEmpty: function() {
		var _g = 0;
		var _g1 = this._dispatchers;
		while(_g < _g1.length) {
			var dispatcher = _g1[_g];
			++_g;
			if(!dispatcher.isEmpty()) return false;
		}
		return true;
	}
	,isRegistered: function(listener,messageType) {
		throw new js__$Boot_HaxeError(new hex_error_UnsupportedOperationException("'isRegistered' is not supported in '" + hex_log_Stringifier.stringify(this) + "'",{ fileName : "CompositeDispatcher.hx", lineNumber : 112, className : "hex.event.CompositeDispatcher", methodName : "isRegistered"}));
	}
	,hasHandler: function(messageType,scope) {
		var b = false;
		var _g = 0;
		var _g1 = this._dispatchers;
		while(_g < _g1.length) {
			var dispatcher = _g1[_g];
			++_g;
			b = dispatcher.hasHandler(messageType,scope) || b;
		}
		return b;
	}
	,add: function(dispatcher) {
		if(!this._isSealed) {
			if(HxOverrides.indexOf(this._dispatchers,dispatcher,0) == -1) {
				this._dispatchers.push(dispatcher);
				return true;
			} else return false;
		} else {
			this._cachedMethodCalls.push((function(f,a1) {
				return function() {
					return f(a1);
				};
			})($bind(this,this.add),dispatcher));
			return false;
		}
	}
	,remove: function(dispatcher) {
		if(!this._isSealed) {
			var index = HxOverrides.indexOf(this._dispatchers,dispatcher,0);
			if(index != -1) {
				this._dispatchers.splice(index,1);
				return true;
			} else return false;
		} else {
			this._cachedMethodCalls.push((function(f,a1) {
				return function() {
					return f(a1);
				};
			})($bind(this,this.remove),dispatcher));
			return false;
		}
	}
	,_seal: function(isSealed) {
		if(isSealed != this._isSealed) {
			this._isSealed = isSealed;
			if(!this._isSealed && this._cachedMethodCalls.length > 0) {
				var _g = 0;
				var _g1 = this._cachedMethodCalls;
				while(_g < _g1.length) {
					var cachedMethodCall = _g1[_g];
					++_g;
					cachedMethodCall();
				}
				this._cachedMethodCalls = [];
			}
		}
	}
	,__class__: hex_event_CompositeDispatcher
};
var hex_event_EventProxy = function(scope,method) {
	this.scope = scope;
	this.callback = method;
};
$hxClasses["hex.event.EventProxy"] = hex_event_EventProxy;
hex_event_EventProxy.__name__ = ["hex","event","EventProxy"];
hex_event_EventProxy.prototype = {
	handleCallback: function(args) {
		if(this.scope != null && this.callback != null) Reflect.callMethod(this.scope,this.callback,args); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("handleCallback call failed with method '" + Std.string(this.callback) + " and scope '" + Std.string(this.scope) + "'",{ fileName : "EventProxy.hx", lineNumber : 28, className : "hex.event.EventProxy", methodName : "handleCallback"}));
	}
	,__class__: hex_event_EventProxy
};
var hex_event_IAdapterStrategy = function() { };
$hxClasses["hex.event.IAdapterStrategy"] = hex_event_IAdapterStrategy;
hex_event_IAdapterStrategy.__name__ = ["hex","event","IAdapterStrategy"];
hex_event_IAdapterStrategy.prototype = {
	__class__: hex_event_IAdapterStrategy
};
var hex_event_IEventDispatcher = function() { };
$hxClasses["hex.event.IEventDispatcher"] = hex_event_IEventDispatcher;
hex_event_IEventDispatcher.__name__ = ["hex","event","IEventDispatcher"];
hex_event_IEventDispatcher.prototype = {
	__class__: hex_event_IEventDispatcher
};
var hex_event_IEventListener = function() { };
$hxClasses["hex.event.IEventListener"] = hex_event_IEventListener;
hex_event_IEventListener.__name__ = ["hex","event","IEventListener"];
hex_event_IEventListener.prototype = {
	__class__: hex_event_IEventListener
};
var hex_event_LightweightClosureDispatcher = function() {
	this._callbacks = new haxe_ds_StringMap();
	this._callbackSize = 0;
};
$hxClasses["hex.event.LightweightClosureDispatcher"] = hex_event_LightweightClosureDispatcher;
hex_event_LightweightClosureDispatcher.__name__ = ["hex","event","LightweightClosureDispatcher"];
hex_event_LightweightClosureDispatcher.__interfaces__ = [hex_event_IEventDispatcher];
hex_event_LightweightClosureDispatcher.prototype = {
	dispatchEvent: function(e) {
		var eventType = e.type;
		if(this._callbacks.exists(eventType)) {
			var callbacks;
			var _this = this._callbacks.get(eventType);
			callbacks = _this.slice();
			var _g = 0;
			while(_g < callbacks.length) {
				var f = callbacks[_g];
				++_g;
				f(e);
			}
		}
	}
	,addEventListener: function(eventType,callback) {
		if(!this._callbacks.exists(eventType)) this._callbacks.set(eventType,[]);
		var callbacks = this._callbacks.get(eventType);
		var index = HxOverrides.indexOf(callbacks,callback,0);
		if(index == -1) {
			callbacks.push(callback);
			this._callbackSize++;
			return true;
		} else return false;
	}
	,removeEventListener: function(eventType,callback) {
		if(!this._callbacks.exists(eventType)) return false;
		var callbacks = this._callbacks.get(eventType);
		var index = HxOverrides.indexOf(callbacks,callback,0);
		if(index == -1) return false; else {
			callbacks.splice(index,1);
			this._callbackSize--;
			if(callbacks.length == 0) this._callbacks.remove(eventType);
			return true;
		}
	}
	,addListener: function(listener) {
		throw new js__$Boot_HaxeError(new hex_error_UnsupportedOperationException("'addListener' is not supported in '" + hex_log_Stringifier.stringify(this) + "'",{ fileName : "LightweightClosureDispatcher.hx", lineNumber : 84, className : "hex.event.LightweightClosureDispatcher", methodName : "addListener"}));
	}
	,removeListener: function(listener) {
		throw new js__$Boot_HaxeError(new hex_error_UnsupportedOperationException("'removeListener' is not supported in '" + hex_log_Stringifier.stringify(this) + "'",{ fileName : "LightweightClosureDispatcher.hx", lineNumber : 89, className : "hex.event.LightweightClosureDispatcher", methodName : "removeListener"}));
	}
	,removeAllListeners: function() {
		this._callbacks = new haxe_ds_StringMap();
		this._callbackSize = 0;
	}
	,isEmpty: function() {
		return this._callbackSize == 0;
	}
	,isRegistered: function(listener,eventType) {
		throw new js__$Boot_HaxeError(new hex_error_UnsupportedOperationException("'isRegistered' is not supported in '" + hex_log_Stringifier.stringify(this) + "'",{ fileName : "LightweightClosureDispatcher.hx", lineNumber : 105, className : "hex.event.LightweightClosureDispatcher", methodName : "isRegistered"}));
	}
	,hasEventListener: function(eventType,callback) {
		if(!this._callbacks.exists(eventType)) return false;
		if(callback == null) return true; else return (function($this) {
			var $r;
			var _this = $this._callbacks.get(eventType);
			$r = HxOverrides.indexOf(_this,callback,0);
			return $r;
		}(this)) != -1;
	}
	,__class__: hex_event_LightweightClosureDispatcher
};
var hex_event_MacroAdapterStrategy = function(target,method) {
	this._target = target;
	this._method = method;
	hex_control_macro_Macro.call(this);
};
$hxClasses["hex.event.MacroAdapterStrategy"] = hex_event_MacroAdapterStrategy;
hex_event_MacroAdapterStrategy.__name__ = ["hex","event","MacroAdapterStrategy"];
hex_event_MacroAdapterStrategy.__interfaces__ = [hex_event_IAdapterStrategy];
hex_event_MacroAdapterStrategy.__super__ = hex_control_macro_Macro;
hex_event_MacroAdapterStrategy.prototype = $extend(hex_control_macro_Macro.prototype,{
	adapt: function(args) {
		return Reflect.callMethod(this._target,this._method,args);
	}
	,getResult: function() {
		return this._result;
	}
	,__class__: hex_event_MacroAdapterStrategy
});
var hex_ioc_assembler_AbstractApplicationContext = function(coreFactory,name) {
	this._coreFactory = coreFactory;
	this._name = name;
};
$hxClasses["hex.ioc.assembler.AbstractApplicationContext"] = hex_ioc_assembler_AbstractApplicationContext;
hex_ioc_assembler_AbstractApplicationContext.__name__ = ["hex","ioc","assembler","AbstractApplicationContext"];
hex_ioc_assembler_AbstractApplicationContext.__interfaces__ = [hex_di_IContextOwner];
hex_ioc_assembler_AbstractApplicationContext.prototype = {
	getName: function() {
		return this._name;
	}
	,resolve: function(field) {
		return this._coreFactory.locate(field);
	}
	,addChild: function(applicationContext) {
		try {
			return this._coreFactory.register(applicationContext.getName(),applicationContext);
		} catch( ex ) {
			if (ex instanceof js__$Boot_HaxeError) ex = ex.val;
			if( js_Boot.__instanceof(ex,hex_error_IllegalArgumentException) ) {
				hex_log_Logger.ERROR("addChild failed with applicationContext named '" + applicationContext.getName() + "'",null,{ fileName : "AbstractApplicationContext.hx", lineNumber : 45, className : "hex.ioc.assembler.AbstractApplicationContext", methodName : "addChild"});
				return false;
			} else throw(ex);
		}
	}
	,_dispatch: function(messageType,data) {
		throw new js__$Boot_HaxeError(new hex_error_VirtualMethodException(hex_log_Stringifier.stringify(this) + "._dispatch is not implemented",{ fileName : "AbstractApplicationContext.hx", lineNumber : 54, className : "hex.ioc.assembler.AbstractApplicationContext", methodName : "_dispatch"}));
	}
	,getCoreFactory: function() {
		return this._coreFactory;
	}
	,getBasicInjector: function() {
		return this._coreFactory.getBasicInjector();
	}
	,__class__: hex_ioc_assembler_AbstractApplicationContext
};
var hex_ioc_assembler_IApplicationAssembler = function() { };
$hxClasses["hex.ioc.assembler.IApplicationAssembler"] = hex_ioc_assembler_IApplicationAssembler;
hex_ioc_assembler_IApplicationAssembler.__name__ = ["hex","ioc","assembler","IApplicationAssembler"];
hex_ioc_assembler_IApplicationAssembler.prototype = {
	__class__: hex_ioc_assembler_IApplicationAssembler
};
var hex_ioc_assembler_ApplicationAssembler = function() {
	this._strictMode = true;
	this._conditionalProperties = new haxe_ds_StringMap();
	this._mBuilderFactories = new hex_collection_HashMap();
	this._mApplicationContext = new hex_collection_HashMap();
};
$hxClasses["hex.ioc.assembler.ApplicationAssembler"] = hex_ioc_assembler_ApplicationAssembler;
hex_ioc_assembler_ApplicationAssembler.__name__ = ["hex","ioc","assembler","ApplicationAssembler"];
hex_ioc_assembler_ApplicationAssembler.__interfaces__ = [hex_ioc_assembler_IApplicationAssembler];
hex_ioc_assembler_ApplicationAssembler.prototype = {
	setStrictMode: function(b) {
		this._strictMode = b;
	}
	,isInStrictMode: function() {
		return this._strictMode;
	}
	,addConditionalProperty: function(conditionalProperties) {
		var i = conditionalProperties.keys();
		var key;
		while(i.hasNext()) {
			key = i.next();
			if(!this._conditionalProperties.exists(key)) {
				var value;
				value = __map_reserved[key] != null?conditionalProperties.getReserved(key):conditionalProperties.h[key];
				this._conditionalProperties.set(key,value);
			} else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("addConditionalcontext fails with key'" + key + "', this key was already assigned",{ fileName : "ApplicationAssembler.hx", lineNumber : 59, className : "hex.ioc.assembler.ApplicationAssembler", methodName : "addConditionalProperty"}));
		}
	}
	,allowsIfList: function(ifList) {
		if(ifList != null) {
			var _g = 0;
			while(_g < ifList.length) {
				var ifItem = ifList[_g];
				++_g;
				if(this._conditionalProperties.exists(ifItem)) {
					if(this._conditionalProperties.get(ifItem)) return true;
				} else if(this._strictMode) throw new js__$Boot_HaxeError(new hex_ioc_error_BuildingException("'" + ifItem + "' was not found in application assembler",{ fileName : "ApplicationAssembler.hx", lineNumber : 79, className : "hex.ioc.assembler.ApplicationAssembler", methodName : "allowsIfList"}));
			}
		} else return true;
		return false;
	}
	,allowsIfNotList: function(ifNotList) {
		if(ifNotList != null) {
			var _g = 0;
			while(_g < ifNotList.length) {
				var ifNotItem = ifNotList[_g];
				++_g;
				if(this._conditionalProperties.exists(ifNotItem)) {
					if(this._conditionalProperties.get(ifNotItem)) return false;
				} else if(this._strictMode) throw new js__$Boot_HaxeError(new hex_ioc_error_BuildingException("'" + ifNotItem + "' was not found in application assembler",{ fileName : "ApplicationAssembler.hx", lineNumber : 106, className : "hex.ioc.assembler.ApplicationAssembler", methodName : "allowsIfNotList"}));
			}
		}
		return true;
	}
	,getBuilderFactory: function(applicationContext) {
		return this._mBuilderFactories.get(applicationContext);
	}
	,release: function() {
		var builderFactories = this._mBuilderFactories.getValues();
		var _g = 0;
		while(_g < builderFactories.length) {
			var builderFactory = builderFactories[_g];
			++_g;
			builderFactory.release();
		}
		this._mApplicationContext.clear();
		this._mBuilderFactories.clear();
	}
	,buildProperty: function(applicationContext,ownerID,name,value,type,ref,method,staticRef,ifList,ifNotList) {
		if(this.allowsIfList(ifList) && this.allowsIfNotList(ifNotList)) this.getBuilderFactory(applicationContext).registerPropertyVO(ownerID,new hex_ioc_vo_PropertyVO(ownerID,name,value,type,ref,method,staticRef));
	}
	,buildObject: function(applicationContext,ownerID,type,args,factory,singleton,injectInto,mapType,staticRef,ifList,ifNotList) {
		if(injectInto == null) injectInto = false;
		if(this.allowsIfList(ifList) && this.allowsIfNotList(ifNotList)) {
			this._registerID(applicationContext,ownerID);
			if(args != null) {
				var length = args.length;
				var index;
				var obj;
				if(type == "hex.collection.HashMap") {
					var _g = 0;
					while(_g < length) {
						var index1 = _g++;
						obj = args[index1];
						var keyDic = obj.key;
						var valueDic = obj.value;
						var pKeyDic = new hex_ioc_vo_PropertyVO(ownerID,keyDic.name,keyDic.value,keyDic.type,keyDic.ref,keyDic.method,keyDic.staticRef);
						var pValueDic = new hex_ioc_vo_PropertyVO(ownerID,valueDic.name,valueDic.value,valueDic.type,valueDic.ref,valueDic.method,valueDic.staticRef);
						args[index1] = new hex_ioc_vo_MapVO(pKeyDic,pValueDic);
					}
				} else if(type == "hex.config.stateful.ServiceLocator") {
					var _g1 = 0;
					while(_g1 < length) {
						var index2 = _g1++;
						obj = args[index2];
						var keySC = obj.key;
						var valueSC = obj.value;
						var pKeySC = new hex_ioc_vo_PropertyVO(ownerID,keySC.name,keySC.value,keySC.type,keySC.ref,keySC.method,keySC.staticRef);
						var pValueSC = new hex_ioc_vo_PropertyVO(ownerID,valueSC.name,valueSC.value,valueSC.type,valueSC.ref,valueSC.method,valueSC.staticRef);
						args[index2] = new hex_ioc_vo_ServiceLocatorVO(pKeySC,pValueSC,obj.mapName);
					}
				} else {
					var _g2 = 0;
					while(_g2 < length) {
						var index3 = _g2++;
						obj = args[index3];
						var propertyVO = new hex_ioc_vo_PropertyVO(ownerID,obj.name,obj.value,obj.type,obj.ref,obj.method,obj.staticRef);
						args[index3] = propertyVO;
					}
				}
			}
			var constructorVO = new hex_ioc_vo_ConstructorVO(ownerID,type,args,factory,singleton,injectInto,null,mapType,staticRef);
			this.getBuilderFactory(applicationContext).registerConstructorVO(ownerID,constructorVO);
		}
	}
	,buildMethodCall: function(applicationContext,ownerID,methodCallName,args,ifList,ifNotList) {
		if(this.allowsIfList(ifList) && this.allowsIfNotList(ifNotList)) {
			if(args != null) {
				var length = args.length;
				var _g = 0;
				while(_g < length) {
					var i = _g++;
					var obj = args[i];
					var prop = new hex_ioc_vo_PropertyVO(obj.id,obj.name,obj.value,obj.type,obj.ref,obj.method,obj.staticRef);
					args[i] = prop;
				}
			}
			this.getBuilderFactory(applicationContext).registerMethodCallVO(new hex_ioc_vo_MethodCallVO(ownerID,methodCallName,args));
		}
	}
	,buildDomainListener: function(applicationContext,ownerID,listenedDomainName,args,ifList,ifNotList) {
		if(this.allowsIfList(ifList) && this.allowsIfNotList(ifNotList)) this.getBuilderFactory(applicationContext).registerDomainListenerVO(new hex_ioc_vo_DomainListenerVO(ownerID,listenedDomainName,args));
	}
	,configureStateTransition: function(applicationContext,ownerID,staticReference,instanceReference,enterList,exitList,ifList,ifNotList) {
		if(this.allowsIfList(ifList) && this.allowsIfNotList(ifNotList)) {
			this._registerID(applicationContext,ownerID);
			var stateTransition = new hex_ioc_vo_StateTransitionVO(ownerID,staticReference,instanceReference,enterList,exitList);
			this.getBuilderFactory(applicationContext).registerStateTransitionVO(ownerID,stateTransition);
		}
	}
	,buildEverything: function() {
		var builderFactories = this._mBuilderFactories.getValues();
		var len = builderFactories.length;
		var i;
		var _g = 0;
		while(_g < len) {
			var i1 = _g++;
			builderFactories[i1].buildAllStateTransitions();
		}
		var applicationContexts = null;
		applicationContexts = this._mApplicationContext.getValues();
		var _g1 = 0;
		while(_g1 < applicationContexts.length) {
			var applicationcontext = applicationContexts[_g1];
			++_g1;
			applicationcontext._dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.ASSEMBLING_START);
		}
		var _g2 = 0;
		while(_g2 < len) {
			var i2 = _g2++;
			builderFactories[i2].buildAllObjects();
		}
		var _g3 = 0;
		while(_g3 < len) {
			var i3 = _g3++;
			builderFactories[i3].assignAllDomainListeners();
		}
		var _g4 = 0;
		while(_g4 < len) {
			var i4 = _g4++;
			builderFactories[i4].callAllMethods();
		}
		var _g5 = 0;
		while(_g5 < len) {
			var i5 = _g5++;
			builderFactories[i5].callModuleInitialisation();
		}
		applicationContexts = this._mApplicationContext.getValues();
		var _g6 = 0;
		while(_g6 < applicationContexts.length) {
			var applicationcontext1 = applicationContexts[_g6];
			++_g6;
			applicationcontext1._dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.ASSEMBLING_END);
		}
	}
	,getApplicationContext: function(applicationContextName,applicationContextClass) {
		var applicationContext;
		if(this._mApplicationContext.containsKey(applicationContextName)) applicationContext = this._mApplicationContext.get(applicationContextName); else {
			var builderFactory = new hex_ioc_core_ContextFactory(applicationContextName,applicationContextClass);
			applicationContext = builderFactory.getApplicationContext();
			this._mApplicationContext.put(applicationContextName,applicationContext);
			this._mBuilderFactories.put(applicationContext,builderFactory);
		}
		return applicationContext;
	}
	,_registerID: function(applicationContext,ID) {
		return this.getBuilderFactory(applicationContext).registerID(ID);
	}
	,__class__: hex_ioc_assembler_ApplicationAssembler
};
var hex_ioc_assembler_ApplicationAssemblerMessage = function() {
};
$hxClasses["hex.ioc.assembler.ApplicationAssemblerMessage"] = hex_ioc_assembler_ApplicationAssemblerMessage;
hex_ioc_assembler_ApplicationAssemblerMessage.__name__ = ["hex","ioc","assembler","ApplicationAssemblerMessage"];
hex_ioc_assembler_ApplicationAssemblerMessage.prototype = {
	__class__: hex_ioc_assembler_ApplicationAssemblerMessage
};
var hex_ioc_assembler_ApplicationContext = function(dispatcher,coreFactory,name) {
	hex_ioc_assembler_AbstractApplicationContext.call(this,coreFactory,name);
	this._dispatcher = dispatcher;
	this._initStateMachine();
};
$hxClasses["hex.ioc.assembler.ApplicationContext"] = hex_ioc_assembler_ApplicationContext;
hex_ioc_assembler_ApplicationContext.__name__ = ["hex","ioc","assembler","ApplicationContext"];
hex_ioc_assembler_ApplicationContext.__super__ = hex_ioc_assembler_AbstractApplicationContext;
hex_ioc_assembler_ApplicationContext.prototype = $extend(hex_ioc_assembler_AbstractApplicationContext.prototype,{
	_initStateList: function() {
		this.state = new hex_ioc_assembler_ApplicationContextStateList();
	}
	,_initStateMachine: function() {
		this._initStateList();
		this._stateMachine = new hex_state_StateMachine(this.state.CONTEXT_INITIALIZED);
		this._stateController = new hex_state_control_StateController(this.getBasicInjector(),this._stateMachine);
		this._dispatcher.addListener(this._stateController);
	}
	,_dispatch: function(messageType,data) {
		this._dispatcher.dispatch(messageType,data);
	}
	,getCurrentState: function() {
		return this._stateController.getCurrentState();
	}
	,__class__: hex_ioc_assembler_ApplicationContext
});
var hex_ioc_assembler_ApplicationContextStateList = function() {
	this.ASSEMBLING_END = new hex_state_State("onAssemblingEnd");
	this.MODULES_INITIALIZED = new hex_state_State("onModulesInitialized");
	this.METHODS_CALLED = new hex_state_State("onMethodsCalled");
	this.DOMAIN_LISTENERS_ASSIGNED = new hex_state_State("onDomainListenersAssigned");
	this.OBJECTS_BUILT = new hex_state_State("onObjectsBuilt");
	this.ASSEMBLING_START = new hex_state_State("onAssemblingStart");
	this.STATE_TRANSITIONS_BUILT = new hex_state_State("onStateTransitionsBuilt");
	this.CONTEXT_PARSED = new hex_state_State("onContextParsed");
	this.CONTEXT_INITIALIZED = new hex_state_State("onContextInitialized");
	this.CONTEXT_INITIALIZED.addTransition(hex_ioc_assembler_ApplicationAssemblerMessage.CONTEXT_PARSED,this.CONTEXT_PARSED);
	this.CONTEXT_PARSED.addTransition(hex_ioc_assembler_ApplicationAssemblerMessage.STATE_TRANSITIONS_BUILT,this.STATE_TRANSITIONS_BUILT);
	this.STATE_TRANSITIONS_BUILT.addTransition(hex_ioc_assembler_ApplicationAssemblerMessage.ASSEMBLING_START,this.ASSEMBLING_START);
	this.ASSEMBLING_START.addTransition(hex_ioc_assembler_ApplicationAssemblerMessage.OBJECTS_BUILT,this.OBJECTS_BUILT);
	this.OBJECTS_BUILT.addTransition(hex_ioc_assembler_ApplicationAssemblerMessage.DOMAIN_LISTENERS_ASSIGNED,this.DOMAIN_LISTENERS_ASSIGNED);
	this.DOMAIN_LISTENERS_ASSIGNED.addTransition(hex_ioc_assembler_ApplicationAssemblerMessage.METHODS_CALLED,this.METHODS_CALLED);
	this.METHODS_CALLED.addTransition(hex_ioc_assembler_ApplicationAssemblerMessage.MODULES_INITIALIZED,this.MODULES_INITIALIZED);
	this.MODULES_INITIALIZED.addTransition(hex_ioc_assembler_ApplicationAssemblerMessage.ASSEMBLING_END,this.ASSEMBLING_END);
	this.ASSEMBLING_END.addTransition(hex_ioc_assembler_ApplicationAssemblerMessage.STATE_TRANSITIONS_BUILT,this.STATE_TRANSITIONS_BUILT);
};
$hxClasses["hex.ioc.assembler.ApplicationContextStateList"] = hex_ioc_assembler_ApplicationContextStateList;
hex_ioc_assembler_ApplicationContextStateList.__name__ = ["hex","ioc","assembler","ApplicationContextStateList"];
hex_ioc_assembler_ApplicationContextStateList.prototype = {
	__class__: hex_ioc_assembler_ApplicationContextStateList
};
var hex_ioc_control_IBuildCommand = function() { };
$hxClasses["hex.ioc.control.IBuildCommand"] = hex_ioc_control_IBuildCommand;
hex_ioc_control_IBuildCommand.__name__ = ["hex","ioc","control","IBuildCommand"];
hex_ioc_control_IBuildCommand.prototype = {
	__class__: hex_ioc_control_IBuildCommand
};
var hex_ioc_control_BuildArrayCommand = function() {
};
$hxClasses["hex.ioc.control.BuildArrayCommand"] = hex_ioc_control_BuildArrayCommand;
hex_ioc_control_BuildArrayCommand.__name__ = ["hex","ioc","control","BuildArrayCommand"];
hex_ioc_control_BuildArrayCommand.__interfaces__ = [hex_ioc_control_IBuildCommand];
hex_ioc_control_BuildArrayCommand.prototype = {
	execute: function(buildHelperVO) {
		var constructorVO = buildHelperVO.constructorVO;
		var array = [];
		var args = constructorVO["arguments"];
		if(args != null) array = args.slice();
		constructorVO.result = array;
	}
	,__class__: hex_ioc_control_BuildArrayCommand
};
var hex_ioc_control_BuildBooleanCommand = function() {
};
$hxClasses["hex.ioc.control.BuildBooleanCommand"] = hex_ioc_control_BuildBooleanCommand;
hex_ioc_control_BuildBooleanCommand.__name__ = ["hex","ioc","control","BuildBooleanCommand"];
hex_ioc_control_BuildBooleanCommand.__interfaces__ = [hex_ioc_control_IBuildCommand];
hex_ioc_control_BuildBooleanCommand.prototype = {
	execute: function(buildHelperVO) {
		var constructorVO = buildHelperVO.constructorVO;
		var value = "";
		var args = constructorVO["arguments"];
		if(args != null && args.length > 0) value = args[0];
		if(value == "true") constructorVO.result = true; else if(value == "false") constructorVO.result = false; else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(Std.string(this) + ".build(" + value + ") failed.",{ fileName : "BuildBooleanCommand.hx", lineNumber : 40, className : "hex.ioc.control.BuildBooleanCommand", methodName : "execute"}));
	}
	,__class__: hex_ioc_control_BuildBooleanCommand
};
var hex_ioc_control_BuildClassCommand = function() {
};
$hxClasses["hex.ioc.control.BuildClassCommand"] = hex_ioc_control_BuildClassCommand;
hex_ioc_control_BuildClassCommand.__name__ = ["hex","ioc","control","BuildClassCommand"];
hex_ioc_control_BuildClassCommand.__interfaces__ = [hex_ioc_control_IBuildCommand];
hex_ioc_control_BuildClassCommand.prototype = {
	execute: function(buildHelperVO) {
		var constructorVO = buildHelperVO.constructorVO;
		var clazz;
		var qualifiedClassName = "";
		var args = constructorVO["arguments"];
		if(args != null && args.length > 0) qualifiedClassName = "" + Std.string(args[0]);
		try {
			clazz = Type.resolveClass(qualifiedClassName);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			clazz = null;
		}
		if(clazz == null) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("'" + qualifiedClassName + "' is not available",{ fileName : "BuildClassCommand.hx", lineNumber : 42, className : "hex.ioc.control.BuildClassCommand", methodName : "execute"}));
		constructorVO.result = clazz;
	}
	,__class__: hex_ioc_control_BuildClassCommand
};
var hex_ioc_control_BuildFloatCommand = function() {
};
$hxClasses["hex.ioc.control.BuildFloatCommand"] = hex_ioc_control_BuildFloatCommand;
hex_ioc_control_BuildFloatCommand.__name__ = ["hex","ioc","control","BuildFloatCommand"];
hex_ioc_control_BuildFloatCommand.__interfaces__ = [hex_ioc_control_IBuildCommand];
hex_ioc_control_BuildFloatCommand.prototype = {
	execute: function(buildHelperVO) {
		var constructorVO = buildHelperVO.constructorVO;
		var args = constructorVO["arguments"];
		var number = NaN;
		if(args != null && args.length > 0) number = Std.parseFloat(args[0]);
		if(!isNaN(number)) constructorVO.result = number; else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(Std.string(this) + ".execute(" + number + ") failed.",{ fileName : "BuildFloatCommand.hx", lineNumber : 36, className : "hex.ioc.control.BuildFloatCommand", methodName : "execute"}));
	}
	,__class__: hex_ioc_control_BuildFloatCommand
};
var hex_ioc_control_BuildFunctionCommand = function() {
};
$hxClasses["hex.ioc.control.BuildFunctionCommand"] = hex_ioc_control_BuildFunctionCommand;
hex_ioc_control_BuildFunctionCommand.__name__ = ["hex","ioc","control","BuildFunctionCommand"];
hex_ioc_control_BuildFunctionCommand.__interfaces__ = [hex_ioc_control_IBuildCommand];
hex_ioc_control_BuildFunctionCommand.prototype = {
	execute: function(buildHelperVO) {
		var constructorVO = buildHelperVO.constructorVO;
		var method;
		var msg;
		var args = constructorVO["arguments"][0].split(".");
		var targetID = args[0];
		var path = args.slice(1).join(".");
		if(!buildHelperVO.coreFactory.isRegisteredWithKey(targetID)) buildHelperVO.contextFactory.buildObject(targetID);
		var target = buildHelperVO.coreFactory.locate(targetID);
		try {
			method = buildHelperVO.coreFactory.fastEvalFromTarget(target,path);
		} catch( error ) {
			if (error instanceof js__$Boot_HaxeError) error = error.val;
			msg = " " + Std.string(this) + ".execute() failed on " + Std.string(target) + " with id '" + targetID + "'. ";
			msg += path + " method can't be found.";
			throw new js__$Boot_HaxeError(new hex_error_Exception(msg,{ fileName : "BuildFunctionCommand.hx", lineNumber : 44, className : "hex.ioc.control.BuildFunctionCommand", methodName : "execute"}));
		}
		constructorVO.result = method;
	}
	,__class__: hex_ioc_control_BuildFunctionCommand
};
var hex_ioc_control_BuildInstanceCommand = function() {
};
$hxClasses["hex.ioc.control.BuildInstanceCommand"] = hex_ioc_control_BuildInstanceCommand;
hex_ioc_control_BuildInstanceCommand.__name__ = ["hex","ioc","control","BuildInstanceCommand"];
hex_ioc_control_BuildInstanceCommand.__interfaces__ = [hex_ioc_control_IBuildCommand];
hex_ioc_control_BuildInstanceCommand.prototype = {
	execute: function(buildHelperVO) {
		var constructorVO = buildHelperVO.constructorVO;
		if(constructorVO.ref != null) {
			var key = constructorVO.ref;
			if(key.indexOf(".") != -1) key = Std.string(key.split(".").shift());
			if(!buildHelperVO.coreFactory.isRegisteredWithKey(key)) buildHelperVO.contextFactory.buildObject(key);
			constructorVO.result = buildHelperVO.coreFactory.locate(key);
			if(constructorVO.ref.indexOf(".") != -1) {
				var args = constructorVO.ref.split(".");
				args.shift();
				constructorVO.result = buildHelperVO.coreFactory.fastEvalFromTarget(constructorVO.result,args.join("."));
			}
		} else {
			if(constructorVO.staticRef != null) constructorVO.result = buildHelperVO.coreFactory.getStaticReference(constructorVO.staticRef); else {
				var classReference = buildHelperVO.coreFactory.getClassReference(constructorVO.type);
				var isModule = hex_util_ClassUtil.classExtendsOrImplements(classReference,hex_module_IModule);
				if(isModule && constructorVO.ID != null && constructorVO.ID.length > 0) {
					hex_domain_DomainExpert.getInstance().registerDomain(hex_domain_DomainUtil.getDomain(constructorVO.ID,hex_domain_Domain));
					hex_metadata_AnnotationProvider.registerToDomain(buildHelperVO.contextFactory.getAnnotationProvider(),hex_domain_DomainUtil.getDomain(constructorVO.ID,hex_domain_Domain));
				}
				constructorVO.result = buildHelperVO.coreFactory.buildInstance(constructorVO.type,constructorVO["arguments"],constructorVO.factory,constructorVO.singleton,constructorVO.injectInto);
			}
			if(js_Boot.__instanceof(constructorVO.result,hex_module_IModule)) buildHelperVO.moduleLocator.register(constructorVO.ID,constructorVO.result);
			if(constructorVO.mapType != null) {
				var classToMap = Type.resolveClass(constructorVO.mapType);
				buildHelperVO.contextFactory.getApplicationContext().getBasicInjector().mapToValue(classToMap,constructorVO.result,constructorVO.ID);
			}
		}
	}
	,__class__: hex_ioc_control_BuildInstanceCommand
};
var hex_ioc_control_BuildIntCommand = function() {
};
$hxClasses["hex.ioc.control.BuildIntCommand"] = hex_ioc_control_BuildIntCommand;
hex_ioc_control_BuildIntCommand.__name__ = ["hex","ioc","control","BuildIntCommand"];
hex_ioc_control_BuildIntCommand.__interfaces__ = [hex_ioc_control_IBuildCommand];
hex_ioc_control_BuildIntCommand.prototype = {
	execute: function(buildHelperVO) {
		var constructorVO = buildHelperVO.constructorVO;
		var args = constructorVO["arguments"];
		var number = 0;
		if(args != null && args.length > 0) number = Std.parseInt(Std.string(args[0])); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(Std.string(this) + ".execute(" + (args != null && args.length > 0?args[0]:"") + ") failed.",{ fileName : "BuildIntCommand.hx", lineNumber : 30, className : "hex.ioc.control.BuildIntCommand", methodName : "execute"}));
		if(number == null) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(Std.string(this) + ".execute(" + number + ") failed.",{ fileName : "BuildIntCommand.hx", lineNumber : 39, className : "hex.ioc.control.BuildIntCommand", methodName : "execute"})); else constructorVO.result = number;
	}
	,__class__: hex_ioc_control_BuildIntCommand
};
var hex_ioc_control_BuildMapCommand = function() {
};
$hxClasses["hex.ioc.control.BuildMapCommand"] = hex_ioc_control_BuildMapCommand;
hex_ioc_control_BuildMapCommand.__name__ = ["hex","ioc","control","BuildMapCommand"];
hex_ioc_control_BuildMapCommand.__interfaces__ = [hex_ioc_control_IBuildCommand];
hex_ioc_control_BuildMapCommand.prototype = {
	execute: function(buildHelperVO) {
		var constructorVO = buildHelperVO.constructorVO;
		var map = new hex_collection_HashMap();
		var args = constructorVO["arguments"];
		if(args.length == 0) hex_log_Logger.WARN(Std.string(this) + ".execute(" + Std.string(args) + ") returns an empty HashMap.",null,{ fileName : "BuildMapCommand.hx", lineNumber : 30, className : "hex.ioc.control.BuildMapCommand", methodName : "execute"}); else {
			var _g = 0;
			while(_g < args.length) {
				var item = args[_g];
				++_g;
				if(item.key != null) map.put(item.key,item.value); else console.log(Std.string(this) + ".execute() adds item with a 'null' key for '" + Std.string(item.value) + "' value.");
			}
		}
		constructorVO.result = map;
		if(constructorVO.mapType != null) buildHelperVO.contextFactory.getApplicationContext().getBasicInjector().mapToValue(hex_collection_HashMap,constructorVO.result,constructorVO.ID);
	}
	,__class__: hex_ioc_control_BuildMapCommand
};
var hex_ioc_control_BuildNullCommand = function() {
};
$hxClasses["hex.ioc.control.BuildNullCommand"] = hex_ioc_control_BuildNullCommand;
hex_ioc_control_BuildNullCommand.__name__ = ["hex","ioc","control","BuildNullCommand"];
hex_ioc_control_BuildNullCommand.__interfaces__ = [hex_ioc_control_IBuildCommand];
hex_ioc_control_BuildNullCommand.prototype = {
	execute: function(buildHelperVO) {
		var constructorVO = buildHelperVO.constructorVO;
		constructorVO.result = null;
	}
	,__class__: hex_ioc_control_BuildNullCommand
};
var hex_ioc_control_BuildObjectCommand = function() {
};
$hxClasses["hex.ioc.control.BuildObjectCommand"] = hex_ioc_control_BuildObjectCommand;
hex_ioc_control_BuildObjectCommand.__name__ = ["hex","ioc","control","BuildObjectCommand"];
hex_ioc_control_BuildObjectCommand.__interfaces__ = [hex_ioc_control_IBuildCommand];
hex_ioc_control_BuildObjectCommand.prototype = {
	execute: function(buildHelperVO) {
		buildHelperVO.constructorVO.result = { };
	}
	,__class__: hex_ioc_control_BuildObjectCommand
};
var hex_ioc_control_BuildServiceLocatorCommand = function() {
};
$hxClasses["hex.ioc.control.BuildServiceLocatorCommand"] = hex_ioc_control_BuildServiceLocatorCommand;
hex_ioc_control_BuildServiceLocatorCommand.__name__ = ["hex","ioc","control","BuildServiceLocatorCommand"];
hex_ioc_control_BuildServiceLocatorCommand.__interfaces__ = [hex_ioc_control_IBuildCommand];
hex_ioc_control_BuildServiceLocatorCommand.prototype = {
	execute: function(buildHelperVO) {
		var constructorVO = buildHelperVO.constructorVO;
		var serviceLocator = new hex_config_stateful_ServiceLocator();
		var args = constructorVO["arguments"];
		if(args.length <= 0) console.log(Std.string(this) + ".execute(" + Std.string(args) + ") returns an empty ServiceConfig."); else {
			var _g = 0;
			while(_g < args.length) {
				var item = args[_g];
				++_g;
				if(item.key != null) serviceLocator.addService(item.key,item.value,item.mapName); else console.log(Std.string(this) + ".execute() adds item with a 'null' key for '" + Std.string(item.value) + "' value.");
			}
		}
		constructorVO.result = serviceLocator;
	}
	,__class__: hex_ioc_control_BuildServiceLocatorCommand
};
var hex_ioc_control_BuildStringCommand = function() {
};
$hxClasses["hex.ioc.control.BuildStringCommand"] = hex_ioc_control_BuildStringCommand;
hex_ioc_control_BuildStringCommand.__name__ = ["hex","ioc","control","BuildStringCommand"];
hex_ioc_control_BuildStringCommand.__interfaces__ = [hex_ioc_control_IBuildCommand];
hex_ioc_control_BuildStringCommand.prototype = {
	execute: function(buildHelperVO) {
		var constructorVO = buildHelperVO.constructorVO;
		var value = null;
		var args = constructorVO["arguments"];
		if(args != null && args.length > 0 && args[0] != null) value = Std.string(args[0]); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(Std.string(this) + ".execute(" + value + ") returns empty String.",{ fileName : "BuildStringCommand.hx", lineNumber : 32, className : "hex.ioc.control.BuildStringCommand", methodName : "execute"}));
		if(value == null) {
			value = "";
			hex_log_Logger.WARN(Std.string(this) + ".execute(" + value + ") returns empty String.",null,{ fileName : "BuildStringCommand.hx", lineNumber : 39, className : "hex.ioc.control.BuildStringCommand", methodName : "execute"});
		}
		constructorVO.result = value;
	}
	,__class__: hex_ioc_control_BuildStringCommand
};
var hex_ioc_control_BuildUIntCommand = function() {
};
$hxClasses["hex.ioc.control.BuildUIntCommand"] = hex_ioc_control_BuildUIntCommand;
hex_ioc_control_BuildUIntCommand.__name__ = ["hex","ioc","control","BuildUIntCommand"];
hex_ioc_control_BuildUIntCommand.__interfaces__ = [hex_ioc_control_IBuildCommand];
hex_ioc_control_BuildUIntCommand.prototype = {
	execute: function(buildHelperVO) {
		var constructorVO = buildHelperVO.constructorVO;
		var args = constructorVO["arguments"];
		var number = 0;
		if(args != null && args.length > 0) number = Std.parseInt(Std.string(args[0])); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(Std.string(this) + ".execute(" + (args != null && args.length > 0?args[0]:"") + ") failed.",{ fileName : "BuildUIntCommand.hx", lineNumber : 31, className : "hex.ioc.control.BuildUIntCommand", methodName : "execute"}));
		if(number == null || _$UInt_UInt_$Impl_$.gt(0,number)) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(Std.string(this) + ".execute(" + Std.string(_$UInt_UInt_$Impl_$.toFloat(number)) + ") failed.",{ fileName : "BuildUIntCommand.hx", lineNumber : 40, className : "hex.ioc.control.BuildUIntCommand", methodName : "execute"})); else constructorVO.result = number;
	}
	,__class__: hex_ioc_control_BuildUIntCommand
};
var hex_ioc_control_BuildXMLCommand = function() {
};
$hxClasses["hex.ioc.control.BuildXMLCommand"] = hex_ioc_control_BuildXMLCommand;
hex_ioc_control_BuildXMLCommand.__name__ = ["hex","ioc","control","BuildXMLCommand"];
hex_ioc_control_BuildXMLCommand.__interfaces__ = [hex_ioc_control_IBuildCommand];
hex_ioc_control_BuildXMLCommand.prototype = {
	execute: function(buildHelperVO) {
		var constructorVO = buildHelperVO.constructorVO;
		var args = constructorVO["arguments"];
		var factory = constructorVO.factory;
		if(args != null || args.length > 0) {
			var source = args[0];
			if(source.length > 0) {
				if(factory == null) constructorVO.result = Xml.parse(source); else try {
					var parser = buildHelperVO.coreFactory.buildInstance(factory);
					constructorVO.result = parser.parse(Xml.parse(source));
				} catch( error ) {
					if (error instanceof js__$Boot_HaxeError) error = error.val;
					throw new js__$Boot_HaxeError(new hex_ioc_error_ParsingException(Std.string(this) + ".execute() failed to deserialize XML with '" + factory + "' deserializer class.",{ fileName : "BuildXMLCommand.hx", lineNumber : 45, className : "hex.ioc.control.BuildXMLCommand", methodName : "execute"}));
				}
			} else {
				console.log(Std.string(this) + ".execute() returns an empty XML.");
				constructorVO.result = Xml.parse("");
			}
		} else {
			console.log(Std.string(this) + ".execute() returns an empty XML.");
			constructorVO.result = Xml.parse("");
		}
	}
	,__class__: hex_ioc_control_BuildXMLCommand
};
var hex_ioc_core_ContextAttributeList = function() {
	throw new js__$Boot_HaxeError(new hex_error_PrivateConstructorException("'ContextAttributeList' class can't be instantiated.",{ fileName : "ContextAttributeList.hx", lineNumber : 35, className : "hex.ioc.core.ContextAttributeList", methodName : "new"}));
};
$hxClasses["hex.ioc.core.ContextAttributeList"] = hex_ioc_core_ContextAttributeList;
hex_ioc_core_ContextAttributeList.__name__ = ["hex","ioc","core","ContextAttributeList"];
hex_ioc_core_ContextAttributeList.prototype = {
	__class__: hex_ioc_core_ContextAttributeList
};
var hex_ioc_core_IContextFactory = function() { };
$hxClasses["hex.ioc.core.IContextFactory"] = hex_ioc_core_IContextFactory;
hex_ioc_core_IContextFactory.__name__ = ["hex","ioc","core","IContextFactory"];
hex_ioc_core_IContextFactory.prototype = {
	__class__: hex_ioc_core_IContextFactory
};
var hex_ioc_core_ContextFactory = function(applicationContextName,applicationContextClass) {
	var domain = hex_domain_DomainUtil.getDomain(applicationContextName,hex_domain_Domain);
	this._contextDispatcher = hex_domain_ApplicationDomainDispatcher.getInstance().getDomainDispatcher(domain);
	var injector = new hex_di_Injector();
	injector.mapToValue(hex_di_IBasicInjector,injector);
	injector.mapToValue(hex_di_IDependencyInjector,injector);
	injector.mapToType(hex_control_macro_IMacroExecutor,hex_control_macro_MacroExecutor);
	this._annotationProvider = new hex_metadata_AnnotationProvider();
	this._annotationProvider.registerInjector(injector);
	this._coreFactory = new hex_ioc_core_CoreFactory(injector,this._annotationProvider);
	if(applicationContextClass != null) this._applicationContext = Type.createInstance(applicationContextClass,[this._contextDispatcher,this._coreFactory,applicationContextName]); else this._applicationContext = new hex_ioc_assembler_ApplicationContext(this._contextDispatcher,this._coreFactory,applicationContextName);
	injector.mapToValue(hex_ioc_assembler_ApplicationContext,this._applicationContext);
	this._coreFactory.register(applicationContextName,this._applicationContext);
	this._contextDispatcher.dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.CONTEXT_PARSED);
	this._init();
};
$hxClasses["hex.ioc.core.ContextFactory"] = hex_ioc_core_ContextFactory;
hex_ioc_core_ContextFactory.__name__ = ["hex","ioc","core","ContextFactory"];
hex_ioc_core_ContextFactory.__interfaces__ = [hex_collection_ILocatorListener,hex_ioc_core_IContextFactory];
hex_ioc_core_ContextFactory.prototype = {
	registerID: function(id) {
		return this._IDExpert.register(id);
	}
	,registerStateTransitionVO: function(id,stateTransitionVO) {
		this._stateTransitionVOLocator.register(id,stateTransitionVO);
	}
	,buildStateTransition: function(key) {
		this._stateTransitionVOLocator.buildStateTransition(key);
	}
	,buildAllStateTransitions: function() {
		var keys = this._stateTransitionVOLocator.keys();
		var _g = 0;
		while(_g < keys.length) {
			var key = keys[_g];
			++_g;
			this._stateTransitionVOLocator.buildStateTransition(key);
		}
		this._contextDispatcher.dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.STATE_TRANSITIONS_BUILT);
	}
	,registerPropertyVO: function(id,propertyVO) {
		if(this._propertyVOLocator.isRegisteredWithKey(id)) this._propertyVOLocator.locate(id).push(propertyVO); else this._propertyVOLocator.register(id,[propertyVO]);
	}
	,_getPropertyValue: function(property) {
		if(property.method != null) return this._build(new hex_ioc_vo_ConstructorVO(null,"Function",[property.method])); else if(property.ref != null) return this._build(new hex_ioc_vo_ConstructorVO(null,"Instance",null,null,null,false,property.ref)); else if(property.staticRef != null) return this._coreFactory.getStaticReference(property.staticRef); else {
			var type;
			if(property.type != null) type = property.type; else type = "String";
			return this._build(new hex_ioc_vo_ConstructorVO(property.ownerID,type,[property.value]));
		}
	}
	,_setPropertyValue: function(property,target) {
		var propertyName = property.name;
		if(propertyName.indexOf(".") == -1) Reflect.setProperty(target,propertyName,this._getPropertyValue(property)); else {
			var props = propertyName.split(".");
			propertyName = props.pop();
			var target1 = this._coreFactory.fastEvalFromTarget(target,props.join("."));
			Reflect.setProperty(target1,propertyName,this._getPropertyValue(property));
		}
	}
	,deserializeArguments: function($arguments) {
		var result = null;
		var length = $arguments.length;
		if(length > 0) result = [];
		var _g = 0;
		while(_g < $arguments.length) {
			var obj = $arguments[_g];
			++_g;
			if(js_Boot.__instanceof(obj,hex_ioc_vo_PropertyVO)) result.push(this._getPropertyValue(obj)); else if(js_Boot.__instanceof(obj,hex_ioc_vo_MapVO)) {
				var mapVO = obj;
				mapVO.key = this._getPropertyValue(mapVO.getPropertyKey());
				mapVO.value = this._getPropertyValue(mapVO.getPropertyValue());
				result.push(mapVO);
			}
		}
		return result;
	}
	,onRegister: function(key,instance) {
		if(this._propertyVOLocator.isRegisteredWithKey(key)) {
			var properties = this._propertyVOLocator.locate(key);
			var _g = 0;
			while(_g < properties.length) {
				var p = properties[_g];
				++_g;
				this._setPropertyValue(p,instance);
			}
		}
	}
	,onUnregister: function(key) {
	}
	,handleEvent: function(e) {
	}
	,registerConstructorVO: function(id,constructorVO) {
		this._constructorVOLocator.register(id,constructorVO);
	}
	,buildObject: function(id) {
		if(this._constructorVOLocator.isRegisteredWithKey(id)) {
			var cons = this._constructorVOLocator.locate(id);
			if(cons["arguments"] != null) cons["arguments"] = this.deserializeArguments(cons["arguments"]);
			this._build(cons,id);
			this._constructorVOLocator.unregister(id);
		}
	}
	,buildAllObjects: function() {
		var keys = this._constructorVOLocator.keys();
		var _g = 0;
		while(_g < keys.length) {
			var key = keys[_g];
			++_g;
			this.buildObject(key);
		}
		this._contextDispatcher.dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.OBJECTS_BUILT);
	}
	,registerDomainListenerVO: function(domainListenerVO) {
		this._domainListenerVOLocator.register("" + hex_core_HashCodeFactory.getKey(domainListenerVO),domainListenerVO);
	}
	,assignAllDomainListeners: function() {
		var listeners = this._domainListenerVOLocator.keys();
		var _g = 0;
		while(_g < listeners.length) {
			var key = listeners[_g];
			++_g;
			this.assignDomainListener(key);
		}
		this._domainListenerVOLocator.clear();
		this._contextDispatcher.dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.DOMAIN_LISTENERS_ASSIGNED);
	}
	,assignDomainListener: function(id) {
		var domainListener = this._domainListenerVOLocator.locate(id);
		var listener = this._coreFactory.locate(domainListener.ownerID);
		var args = domainListener["arguments"];
		var service = null;
		if(this._coreFactory.isRegisteredWithKey(domainListener.listenedDomainName)) {
			var located = this._coreFactory.locate(domainListener.listenedDomainName);
			if(js_Boot.__instanceof(located,hex_service_IService)) service = located;
		}
		if(args != null && args.length > 0) {
			var _g = 0;
			while(_g < args.length) {
				var domainListenerArgument = args[_g];
				++_g;
				var method;
				if(js_Boot.__instanceof(listener,hex_event_EventProxy)) method = "handleCallback"; else method = domainListenerArgument.method;
				var messageType;
				if(domainListenerArgument.name != null) messageType = new hex_event_MessageType(domainListenerArgument.name); else messageType = this._coreFactory.getStaticReference(domainListenerArgument.staticRef);
				if(method != null && Reflect.isFunction(Reflect.field(listener,method)) || domainListenerArgument.strategy != null) {
					var callback;
					if(domainListenerArgument.strategy != null) callback = this._getStrategyCallback(listener,method,domainListenerArgument.strategy,domainListenerArgument.injectedInModule); else callback = Reflect.field(listener,method);
					if(service == null) {
						var domain = hex_domain_DomainUtil.getDomain(domainListener.listenedDomainName,hex_domain_Domain);
						this._applicationDomainHub.addHandler(messageType,listener,callback,domain);
					} else service.addHandler(messageType,listener,callback);
				} else if(method == null) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(Std.string(this) + ".assignDomainListener failed. Callback should be defined (use 'method' attribute) in instance of '" + hex_log_Stringifier.stringify(listener) + "' class with '" + domainListener.ownerID + "' id",{ fileName : "ContextFactory.hx", lineNumber : 332, className : "hex.ioc.core.ContextFactory", methodName : "assignDomainListener"})); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(Std.string(this) + ".assignDomainListener failed. Method named '" + method + "' can't be found in instance of '" + hex_log_Stringifier.stringify(listener) + "' class with '" + domainListener.ownerID + "' id",{ fileName : "ContextFactory.hx", lineNumber : 337, className : "hex.ioc.core.ContextFactory", methodName : "assignDomainListener"}));
			}
			return true;
		} else {
			var domain1 = hex_domain_DomainUtil.getDomain(domainListener.listenedDomainName,hex_domain_Domain);
			return this._applicationDomainHub.addListener(listener,domain1);
		}
	}
	,_getStrategyCallback: function(listener,method,strategyClassName,injectedInModule) {
		if(injectedInModule == null) injectedInModule = false;
		var callback = Reflect.field(listener,method);
		var strategyClass = this._coreFactory.getClassReference(strategyClassName);
		var adapter = new hex_event_ClassAdapter();
		adapter.setCallBackMethod(listener,callback);
		adapter.setAdapterClass(strategyClass);
		adapter.setAnnotationProvider(this._annotationProvider);
		if(injectedInModule && js_Boot.__instanceof(listener,hex_module_IModule)) {
			var basicInjector = listener.getBasicInjector();
			adapter.setFactoryMethod(basicInjector,$bind(basicInjector,basicInjector.instantiateUnmapped));
		} else adapter.setFactoryMethod(this._applicationContext.getBasicInjector(),($_=this._applicationContext.getBasicInjector(),$bind($_,$_.instantiateUnmapped)));
		var f = function(rest) {
			(adapter.getCallbackAdapter())(rest);
		};
		return Reflect.makeVarArgs(f);
	}
	,registerMethodCallVO: function(methodCallVO) {
		var index = this._methodCallVOLocator.keys().length + 1;
		this._methodCallVOLocator.register("" + index,methodCallVO);
	}
	,callMethod: function(id) {
		var method = this._methodCallVOLocator.locate(id);
		var cons = new hex_ioc_vo_ConstructorVO(null,"Function",[method.ownerID + "." + method.name]);
		var func = this._build(cons);
		var args = this.deserializeArguments(method["arguments"]);
		Reflect.callMethod(this._coreFactory.locate(method.ownerID),func,args);
	}
	,callAllMethods: function() {
		var keyList = this._methodCallVOLocator.keys();
		var _g = 0;
		while(_g < keyList.length) {
			var key = keyList[_g];
			++_g;
			this.callMethod(key);
		}
		this._methodCallVOLocator.clear();
		this._contextDispatcher.dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.METHODS_CALLED);
	}
	,callModuleInitialisation: function() {
		this._moduleLocator.callModuleInitialisation();
		this._contextDispatcher.dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.MODULES_INITIALIZED);
	}
	,getApplicationContext: function() {
		return this._applicationContext;
	}
	,getCoreFactory: function() {
		return this._coreFactory;
	}
	,getAnnotationProvider: function() {
		return this._annotationProvider;
	}
	,getStateTransitionVOLocator: function() {
		return this._stateTransitionVOLocator;
	}
	,release: function() {
		this._coreFactory.removeListener(this);
		this._coreFactory.clear();
		this._constructorVOLocator.release();
		this._propertyVOLocator.release();
		this._methodCallVOLocator.release();
		this._domainListenerVOLocator.release();
		this._stateTransitionVOLocator.release();
		this._moduleLocator.release();
		this._commandMap = new haxe_ds_StringMap();
		this._IDExpert.clear();
	}
	,_init: function() {
		this._commandMap = new haxe_ds_StringMap();
		this._applicationDomainHub = hex_domain_ApplicationDomainDispatcher.getInstance();
		this._IDExpert = new hex_ioc_core_IDExpert();
		this._constructorVOLocator = new hex_ioc_locator_ConstructorVOLocator();
		this._propertyVOLocator = new hex_ioc_locator_PropertyVOLocator();
		this._methodCallVOLocator = new hex_ioc_locator_MethodCallVOLocator();
		this._domainListenerVOLocator = new hex_ioc_locator_DomainListenerVOLocator();
		this._stateTransitionVOLocator = new hex_ioc_locator_StateTransitionVOLocator(this);
		this._moduleLocator = new hex_ioc_locator_ModuleLocator(this);
		var value = new hex_ioc_control_BuildArrayCommand();
		this._commandMap.set("Array",value);
		var value1 = new hex_ioc_control_BuildBooleanCommand();
		this._commandMap.set("Bool",value1);
		var value2 = new hex_ioc_control_BuildIntCommand();
		this._commandMap.set("Int",value2);
		var value3 = new hex_ioc_control_BuildNullCommand();
		this._commandMap.set("null",value3);
		var value4 = new hex_ioc_control_BuildFloatCommand();
		this._commandMap.set("Float",value4);
		var value5 = new hex_ioc_control_BuildObjectCommand();
		this._commandMap.set("Object",value5);
		var value6 = new hex_ioc_control_BuildStringCommand();
		this._commandMap.set("String",value6);
		var value7 = new hex_ioc_control_BuildUIntCommand();
		this._commandMap.set("UInt",value7);
		var value8 = new hex_ioc_control_BuildStringCommand();
		this._commandMap.set("Default",value8);
		var value9 = new hex_ioc_control_BuildMapCommand();
		this._commandMap.set("hex.collection.HashMap",value9);
		var value10 = new hex_ioc_control_BuildServiceLocatorCommand();
		this._commandMap.set("hex.config.stateful.ServiceLocator",value10);
		var value11 = new hex_ioc_control_BuildClassCommand();
		this._commandMap.set("Class",value11);
		var value12 = new hex_ioc_control_BuildXMLCommand();
		this._commandMap.set("XML",value12);
		var value13 = new hex_ioc_control_BuildFunctionCommand();
		this._commandMap.set("Function",value13);
		this._coreFactory.addListener(this);
	}
	,_addBuildCommand: function(type,build) {
		this._commandMap.set(type,build);
	}
	,_build: function(constructorVO,id) {
		var type = constructorVO.type;
		var buildCommand;
		if(this._commandMap.exists(type)) buildCommand = this._commandMap.get(type); else buildCommand = new hex_ioc_control_BuildInstanceCommand();
		var builderHelperVO = new hex_ioc_vo_BuildHelperVO();
		builderHelperVO.type = type;
		builderHelperVO.contextFactory = this;
		builderHelperVO.coreFactory = this._coreFactory;
		builderHelperVO.constructorVO = constructorVO;
		builderHelperVO.moduleLocator = this._moduleLocator;
		buildCommand.execute(builderHelperVO);
		if(id != null) this._coreFactory.register(id,constructorVO.result);
		return constructorVO.result;
	}
	,__class__: hex_ioc_core_ContextFactory
};
var hex_ioc_core_ContextNameList = function() {
	throw new js__$Boot_HaxeError(new hex_error_PrivateConstructorException("'ContextNameList' class can't be instantiated.",{ fileName : "ContextNameList.hx", lineNumber : 27, className : "hex.ioc.core.ContextNameList", methodName : "new"}));
};
$hxClasses["hex.ioc.core.ContextNameList"] = hex_ioc_core_ContextNameList;
hex_ioc_core_ContextNameList.__name__ = ["hex","ioc","core","ContextNameList"];
hex_ioc_core_ContextNameList.prototype = {
	__class__: hex_ioc_core_ContextNameList
};
var hex_ioc_core_ContextTypeList = function() { };
$hxClasses["hex.ioc.core.ContextTypeList"] = hex_ioc_core_ContextTypeList;
hex_ioc_core_ContextTypeList.__name__ = ["hex","ioc","core","ContextTypeList"];
var hex_ioc_core_ICoreFactory = function() { };
$hxClasses["hex.ioc.core.ICoreFactory"] = hex_ioc_core_ICoreFactory;
hex_ioc_core_ICoreFactory.__name__ = ["hex","ioc","core","ICoreFactory"];
hex_ioc_core_ICoreFactory.__interfaces__ = [hex_collection_ILocator];
hex_ioc_core_ICoreFactory.prototype = {
	__class__: hex_ioc_core_ICoreFactory
};
var hex_util_FastEval = function() {
};
$hxClasses["hex.util.FastEval"] = hex_util_FastEval;
hex_util_FastEval.__name__ = ["hex","util","FastEval"];
hex_util_FastEval.fromTarget = function(target,toEval,coreFactory) {
	var members = toEval.split(".");
	var result;
	while(members.length > 0) {
		var member = members.shift();
		result = Reflect.field(target,member);
		if(result == null) {
			if(js_Boot.__instanceof(target,hex_ioc_assembler_ApplicationContext) && coreFactory.isRegisteredWithKey(member)) result = coreFactory.locate(member); else if(js_Boot.__instanceof(target,HTMLElement)) result = (js_Boot.__cast(target , HTMLElement)).getElementsByClassName(member)[0]; else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("ObjectUtil.fastEvalFromTarget(" + Std.string(target) + ", " + toEval + ", " + Std.string(coreFactory) + ") failed.",{ fileName : "FastEval.hx", lineNumber : 42, className : "hex.util.FastEval", methodName : "fromTarget"}));
		}
		target = result;
	}
	return target;
};
hex_util_FastEval.prototype = {
	__class__: hex_util_FastEval
};
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var hex_log_Stringifier = function() {
	throw new js__$Boot_HaxeError(new hex_error_PrivateConstructorException("Stringifier class can't be instantiated.",{ fileName : "Stringifier.hx", lineNumber : 15, className : "hex.log.Stringifier", methodName : "new"}));
};
$hxClasses["hex.log.Stringifier"] = hex_log_Stringifier;
hex_log_Stringifier.__name__ = ["hex","log","Stringifier"];
hex_log_Stringifier.setStringifier = function(o) {
	hex_log_Stringifier._STRATEGY = o;
};
hex_log_Stringifier.getStringifier = function() {
	return hex_log_Stringifier._STRATEGY;
};
hex_log_Stringifier.stringify = function(target) {
	if(hex_log_Stringifier._STRATEGY == null) hex_log_Stringifier._STRATEGY = new hex_log_BasicStringifierStrategy();
	return hex_log_Stringifier._STRATEGY.stringify(target);
};
hex_log_Stringifier.getPosInfos = function(posInfos) {
	return posInfos;
};
hex_log_Stringifier.prototype = {
	__class__: hex_log_Stringifier
};
var hex_log_IStringifierStrategy = function() { };
$hxClasses["hex.log.IStringifierStrategy"] = hex_log_IStringifierStrategy;
hex_log_IStringifierStrategy.__name__ = ["hex","log","IStringifierStrategy"];
hex_log_IStringifierStrategy.prototype = {
	__class__: hex_log_IStringifierStrategy
};
var hex_log_BasicStringifierStrategy = function() {
};
$hxClasses["hex.log.BasicStringifierStrategy"] = hex_log_BasicStringifierStrategy;
hex_log_BasicStringifierStrategy.__name__ = ["hex","log","BasicStringifierStrategy"];
hex_log_BasicStringifierStrategy.__interfaces__ = [hex_log_IStringifierStrategy];
hex_log_BasicStringifierStrategy.prototype = {
	stringify: function(target) {
		var type = Type.getClass(target);
		if(type != null) return Type.getClassName(type); else return "Dynamic";
	}
	,toString: function() {
		return hex_log_Stringifier.stringify(this);
	}
	,__class__: hex_log_BasicStringifierStrategy
};
var hex_log_Logger = function() {
	this.setLevel(hex_log_LogLevel._ALL);
	this._dispatcher = new hex_domain_DomainDispatcher();
};
$hxClasses["hex.log.Logger"] = hex_log_Logger;
hex_log_Logger.__name__ = ["hex","log","Logger"];
hex_log_Logger.getInstance = function() {
	if(hex_log_Logger._Instance == null) hex_log_Logger._Instance = new hex_log_Logger();
	return hex_log_Logger._Instance;
};
hex_log_Logger.DEBUG = function(o,domain,posInfos) {
	hex_log_Logger.getInstance().log(o,hex_log_LogLevel._DEBUG,domain,posInfos);
};
hex_log_Logger.INFO = function(o,domain,posInfos) {
	hex_log_Logger.getInstance().log(o,hex_log_LogLevel._INFO,domain,posInfos);
};
hex_log_Logger.WARN = function(o,domain,posInfos) {
	hex_log_Logger.getInstance().log(o,hex_log_LogLevel._WARN,domain,posInfos);
};
hex_log_Logger.ERROR = function(o,domain,posInfos) {
	hex_log_Logger.getInstance().log(o,hex_log_LogLevel._ERROR,domain,posInfos);
};
hex_log_Logger.FATAL = function(o,domain,posInfos) {
	hex_log_Logger.getInstance().log(o,hex_log_LogLevel._FATAL,domain,posInfos);
};
hex_log_Logger.CLEAR = function(domain) {
	hex_log_Logger.getInstance().clear();
};
hex_log_Logger.prototype = {
	setLevel: function(level) {
		this._level = level;
	}
	,getLevel: function() {
		return this._level;
	}
	,clear: function() {
		this._dispatcher.dispatch(hex_log_LoggerMessage.CLEAR);
	}
	,log: function(o,level,domain,posInfos) {
		if(this._level.get_value() <= level.get_value()) this._dispatcher.dispatch(hex_log_LoggerMessage.LOG,domain,[new hex_log_LoggerMessage(o,level,domain == null?hex_domain_NoDomain.DOMAIN:domain,posInfos)]);
	}
	,addListener: function(listener,domain) {
		this._dispatcher.addHandler(hex_log_LoggerMessage.LOG,listener,$bind(listener,listener.onLog),domain);
		return this._dispatcher.addHandler(hex_log_LoggerMessage.CLEAR,listener,$bind(listener,listener.onClear),domain);
	}
	,removeListener: function(listener,domain) {
		this._dispatcher.removeHandler(hex_log_LoggerMessage.LOG,listener,$bind(listener,listener.onLog),domain);
		return this._dispatcher.removeHandler(hex_log_LoggerMessage.CLEAR,listener,$bind(listener,listener.onClear),domain);
	}
	,isRegistered: function(listener,domain) {
		return this._dispatcher.isRegistered(listener,hex_log_LoggerMessage.LOG,domain);
	}
	,removeAllListeners: function() {
		this._dispatcher.removeAllListeners();
	}
	,toString: function() {
		return hex_log_Stringifier.stringify(this);
	}
	,__class__: hex_log_Logger
};
var hex_log_LogLevel = function(value) {
	this.value = value;
};
$hxClasses["hex.log.LogLevel"] = hex_log_LogLevel;
hex_log_LogLevel.__name__ = ["hex","log","LogLevel"];
hex_log_LogLevel.__properties__ = {get_OFF:"get_OFF",get_FATAL:"get_FATAL",get_ERROR:"get_ERROR",get_WARN:"get_WARN",get_INFO:"get_INFO",get_DEBUG:"get_DEBUG",get_ALL:"get_ALL",get_LEVELS:"get_LEVELS"}
hex_log_LogLevel.get_LEVELS = function() {
	return [hex_log_LogLevel._ALL,hex_log_LogLevel._DEBUG,hex_log_LogLevel._INFO,hex_log_LogLevel._WARN,hex_log_LogLevel._ERROR,hex_log_LogLevel._FATAL,hex_log_LogLevel._OFF];
};
hex_log_LogLevel.get_ALL = function() {
	return hex_log_LogLevel._ALL;
};
hex_log_LogLevel.get_DEBUG = function() {
	return hex_log_LogLevel._DEBUG;
};
hex_log_LogLevel.get_INFO = function() {
	return hex_log_LogLevel._INFO;
};
hex_log_LogLevel.get_WARN = function() {
	return hex_log_LogLevel._WARN;
};
hex_log_LogLevel.get_ERROR = function() {
	return hex_log_LogLevel._ERROR;
};
hex_log_LogLevel.get_FATAL = function() {
	return hex_log_LogLevel._FATAL;
};
hex_log_LogLevel.get_OFF = function() {
	return hex_log_LogLevel._OFF;
};
hex_log_LogLevel.prototype = {
	get_value: function() {
		return this.value;
	}
	,toString: function() {
		var _g = this.get_value();
		switch(_g) {
		case 0:
			return "ALL";
		case 10000:
			return "DEBUG";
		case 20000:
			return "INFO";
		case 30000:
			return "WARN";
		case 40000:
			return "ERROR";
		case 50000:
			return "FATAL";
		case 60000:
			return "OFF";
		}
		return "";
	}
	,__class__: hex_log_LogLevel
	,__properties__: {get_value:"get_value"}
};
var hex_ioc_core_CoreFactory = function(injector,annotationProvider) {
	this._injector = injector;
	this._annotationProvider = annotationProvider;
	this._dispatcher = new hex_event_Dispatcher();
	this._map = new hex_collection_HashMap();
};
$hxClasses["hex.ioc.core.CoreFactory"] = hex_ioc_core_CoreFactory;
hex_ioc_core_CoreFactory.__name__ = ["hex","ioc","core","CoreFactory"];
hex_ioc_core_CoreFactory.__interfaces__ = [hex_ioc_core_ICoreFactory];
hex_ioc_core_CoreFactory.setFastEvalMethod = function(method) {
	hex_ioc_core_CoreFactory._fastEvalMethod = method;
};
hex_ioc_core_CoreFactory.prototype = {
	addListener: function(listener) {
		return this._dispatcher.addListener(listener);
	}
	,removeListener: function(listener) {
		return this._dispatcher.removeListener(listener);
	}
	,keys: function() {
		return this._map.getKeys();
	}
	,values: function() {
		return this._map.getValues();
	}
	,locate: function(key) {
		if(this._map.containsKey(key)) return this._map.get(key); else if(key.indexOf(".") != -1) {
			var props = key.split(".");
			var baseKey = props.shift();
			if(this._map.containsKey(baseKey)) {
				var target = this._map.get(baseKey);
				return this.fastEvalFromTarget(target,props.join("."));
			}
		}
		throw new js__$Boot_HaxeError(new hex_error_NoSuchElementException("Can't find item with '" + key + "' key in " + hex_log_Stringifier.stringify(this),{ fileName : "CoreFactory.hx", lineNumber : 75, className : "hex.ioc.core.CoreFactory", methodName : "locate"}));
	}
	,isRegisteredWithKey: function(key) {
		return this._map.containsKey(key);
	}
	,isInstanceRegistered: function(instance) {
		return this._map.containsValue(instance);
	}
	,register: function(key,element) {
		if(!this._map.containsKey(key)) {
			this._map.put(key,element);
			this._dispatcher.dispatch(hex_collection_LocatorMessage.REGISTER,[key,element]);
			return true;
		} else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("register(" + key + ", " + Std.string(element) + ") fails, key is already registered.",{ fileName : "CoreFactory.hx", lineNumber : 98, className : "hex.ioc.core.CoreFactory", methodName : "register"}));
	}
	,unregisterWithKey: function(key) {
		if(this._map.containsKey(key)) {
			var instance = this._map.get(key);
			this._map.remove(key);
			this._dispatcher.dispatch(hex_collection_LocatorMessage.UNREGISTER,[key]);
			return true;
		} else return false;
	}
	,unregister: function(instance) {
		var key = this.getKeyOfInstance(instance);
		if(key != null) return this.unregisterWithKey(key); else return false;
	}
	,getKeyOfInstance: function(instance) {
		var key;
		if(this._map.containsValue(instance)) {
			var keys = this._map.getKeys();
			var _g = 0;
			while(_g < keys.length) {
				var key1 = keys[_g];
				++_g;
				if(this._map.get(key1) == instance) return key1;
			}
		}
		return null;
	}
	,add: function(map) {
		var iterator = map.keys();
		while(iterator.hasNext()) {
			var key = iterator.next();
			try {
				this.register(key,__map_reserved[key] != null?map.getReserved(key):map.h[key]);
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				if( js_Boot.__instanceof(e,hex_error_IllegalArgumentException) ) {
					e.message = Std.string(this) + ".add() fails. " + e.message;
					throw new js__$Boot_HaxeError(e);
				} else throw(e);
			}
		}
	}
	,getClassReference: function(qualifiedClassName) {
		var classReference = Type.resolveClass(qualifiedClassName);
		if(classReference == null) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(hex_log_Stringifier.stringify(this) + ".getClassReference fails with class named '" + qualifiedClassName + "'",{ fileName : "CoreFactory.hx", lineNumber : 166, className : "hex.ioc.core.CoreFactory", methodName : "getClassReference"}));
		return classReference;
	}
	,getStaticReference: function(qualifiedClassName) {
		var a = qualifiedClassName.split(".");
		var type = a[a.length - 1];
		a.splice(a.length - 1,1);
		var classReference = this.getClassReference(a.join("."));
		var staticRef = Reflect.field(classReference,type);
		if(staticRef == null) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(hex_log_Stringifier.stringify(this) + ".getStaticReference fails with '" + qualifiedClassName + "'",{ fileName : "CoreFactory.hx", lineNumber : 182, className : "hex.ioc.core.CoreFactory", methodName : "getStaticReference"}));
		return staticRef;
	}
	,buildInstance: function(qualifiedClassName,args,factoryMethod,singletonAccess,instantiateUnmapped) {
		if(instantiateUnmapped == null) instantiateUnmapped = false;
		var classReference;
		try {
			classReference = this.getClassReference(qualifiedClassName);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			if( js_Boot.__instanceof(e,hex_error_IllegalArgumentException) ) {
				throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("'" + qualifiedClassName + "' class is not available in current domain",{ fileName : "CoreFactory.hx", lineNumber : 198, className : "hex.ioc.core.CoreFactory", methodName : "buildInstance"}));
			} else throw(e);
		}
		var obj = null;
		if(instantiateUnmapped) obj = this._injector.instantiateUnmapped(classReference); else if(factoryMethod != null) {
			if(singletonAccess != null) {
				var inst = null;
				var singletonCall = Reflect.field(classReference,singletonAccess);
				if(singletonCall != null) inst = singletonCall(); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(qualifiedClassName + "." + singletonAccess + "()' singleton access failed.",{ fileName : "CoreFactory.hx", lineNumber : 220, className : "hex.ioc.core.CoreFactory", methodName : "buildInstance"}));
				var methodReference = Reflect.field(inst,factoryMethod);
				if(methodReference != null) obj = Reflect.callMethod(inst,methodReference,args); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(qualifiedClassName + "." + singletonAccess + "()." + factoryMethod + "()' factory method call failed.",{ fileName : "CoreFactory.hx", lineNumber : 230, className : "hex.ioc.core.CoreFactory", methodName : "buildInstance"}));
			} else {
				var methodReference1 = Reflect.field(classReference,factoryMethod);
				if(methodReference1 != null) obj = Reflect.callMethod(classReference,methodReference1,args); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(qualifiedClassName + "." + factoryMethod + "()' factory method call failed.",{ fileName : "CoreFactory.hx", lineNumber : 243, className : "hex.ioc.core.CoreFactory", methodName : "buildInstance"}));
			}
		} else if(singletonAccess != null) {
			var singletonCall1 = Reflect.field(classReference,singletonAccess);
			if(singletonCall1 != null) obj = singletonCall1(); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(qualifiedClassName + "." + singletonAccess + "()' singleton call failed.",{ fileName : "CoreFactory.hx", lineNumber : 256, className : "hex.ioc.core.CoreFactory", methodName : "buildInstance"}));
		} else {
			try {
				obj = Type.createInstance(classReference,args != null?args:[]);
			} catch( e1 ) {
				if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
				throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("Instantiation of class '" + qualifiedClassName + "' failed with arguments: " + Std.string(args) + " : " + Std.string(e1),{ fileName : "CoreFactory.hx", lineNumber : 267, className : "hex.ioc.core.CoreFactory", methodName : "buildInstance"}));
			}
			if(js_Boot.__instanceof(obj,hex_core_IAnnotationParsable)) this._annotationProvider.parse(obj);
			if(js_Boot.__instanceof(obj,hex_service_IService)) obj.createConfiguration();
		}
		return obj;
	}
	,clear: function() {
		this._map.clear();
	}
	,getBasicInjector: function() {
		return this._injector;
	}
	,fastEvalFromTarget: function(target,toEval) {
		return hex_ioc_core_CoreFactory._fastEvalMethod(target,toEval,this);
	}
	,__class__: hex_ioc_core_CoreFactory
};
var hex_ioc_core_IDExpert = function() {
	this._map = new haxe_ds_StringMap();
};
$hxClasses["hex.ioc.core.IDExpert"] = hex_ioc_core_IDExpert;
hex_ioc_core_IDExpert.__name__ = ["hex","ioc","core","IDExpert"];
hex_ioc_core_IDExpert.prototype = {
	isRegistered: function(id) {
		return this._map.exists(id);
	}
	,clear: function() {
		this._map = new haxe_ds_StringMap();
	}
	,register: function(id) {
		if(this._map.exists(id)) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(Std.string(this) + ".register(" + id + ") failed. This id was already registered, check conflicts in your config file.",{ fileName : "IDExpert.hx", lineNumber : 32, className : "hex.ioc.core.IDExpert", methodName : "register"})); else {
			this._map.set(id,true);
			return true;
		}
		return false;
	}
	,unregister: function(id) {
		if(this.isRegistered(id)) {
			this._map.remove(id);
			return true;
		} else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(Std.string(this) + ".unregister(" + id + ") failed.",{ fileName : "IDExpert.hx", lineNumber : 52, className : "hex.ioc.core.IDExpert", methodName : "unregister"}));
		return false;
	}
	,__class__: hex_ioc_core_IDExpert
};
var hex_ioc_di_ContextOwnerWrapper = function(coreFactory,id) {
	this._coreFactory = coreFactory;
	this._id = id;
};
$hxClasses["hex.ioc.di.ContextOwnerWrapper"] = hex_ioc_di_ContextOwnerWrapper;
hex_ioc_di_ContextOwnerWrapper.__name__ = ["hex","ioc","di","ContextOwnerWrapper"];
hex_ioc_di_ContextOwnerWrapper.__interfaces__ = [hex_di_IContextOwner];
hex_ioc_di_ContextOwnerWrapper.prototype = {
	getBasicInjector: function() {
		return this._coreFactory.locate(this._id).getBasicInjector();
	}
	,__class__: hex_ioc_di_ContextOwnerWrapper
};
var hex_ioc_error_BuildingException = function(message,posInfos) {
	hex_error_Exception.call(this,message,posInfos);
};
$hxClasses["hex.ioc.error.BuildingException"] = hex_ioc_error_BuildingException;
hex_ioc_error_BuildingException.__name__ = ["hex","ioc","error","BuildingException"];
hex_ioc_error_BuildingException.__super__ = hex_error_Exception;
hex_ioc_error_BuildingException.prototype = $extend(hex_error_Exception.prototype,{
	__class__: hex_ioc_error_BuildingException
});
var hex_ioc_error_ParsingException = function(message,posInfos) {
	hex_error_Exception.call(this,message,posInfos);
};
$hxClasses["hex.ioc.error.ParsingException"] = hex_ioc_error_ParsingException;
hex_ioc_error_ParsingException.__name__ = ["hex","ioc","error","ParsingException"];
hex_ioc_error_ParsingException.__super__ = hex_error_Exception;
hex_ioc_error_ParsingException.prototype = $extend(hex_error_Exception.prototype,{
	__class__: hex_ioc_error_ParsingException
});
var hex_ioc_locator_ConstructorVOLocator = function() {
	hex_collection_Locator.call(this);
};
$hxClasses["hex.ioc.locator.ConstructorVOLocator"] = hex_ioc_locator_ConstructorVOLocator;
hex_ioc_locator_ConstructorVOLocator.__name__ = ["hex","ioc","locator","ConstructorVOLocator"];
hex_ioc_locator_ConstructorVOLocator.__super__ = hex_collection_Locator;
hex_ioc_locator_ConstructorVOLocator.prototype = $extend(hex_collection_Locator.prototype,{
	_dispatchRegisterEvent: function(key,element) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.REGISTER,[key,element]);
	}
	,_dispatchUnregisterEvent: function(key) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.UNREGISTER,[key]);
	}
	,__class__: hex_ioc_locator_ConstructorVOLocator
});
var hex_ioc_locator_DomainListenerVOLocator = function() {
	hex_collection_Locator.call(this);
};
$hxClasses["hex.ioc.locator.DomainListenerVOLocator"] = hex_ioc_locator_DomainListenerVOLocator;
hex_ioc_locator_DomainListenerVOLocator.__name__ = ["hex","ioc","locator","DomainListenerVOLocator"];
hex_ioc_locator_DomainListenerVOLocator.__super__ = hex_collection_Locator;
hex_ioc_locator_DomainListenerVOLocator.prototype = $extend(hex_collection_Locator.prototype,{
	_dispatchRegisterEvent: function(key,element) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.REGISTER,[key,element]);
	}
	,_dispatchUnregisterEvent: function(key) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.UNREGISTER,[key]);
	}
	,__class__: hex_ioc_locator_DomainListenerVOLocator
});
var hex_ioc_locator_MethodCallVOLocator = function() {
	hex_collection_Locator.call(this);
};
$hxClasses["hex.ioc.locator.MethodCallVOLocator"] = hex_ioc_locator_MethodCallVOLocator;
hex_ioc_locator_MethodCallVOLocator.__name__ = ["hex","ioc","locator","MethodCallVOLocator"];
hex_ioc_locator_MethodCallVOLocator.__super__ = hex_collection_Locator;
hex_ioc_locator_MethodCallVOLocator.prototype = $extend(hex_collection_Locator.prototype,{
	_dispatchRegisterEvent: function(key,element) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.REGISTER,[key,element]);
	}
	,_dispatchUnregisterEvent: function(key) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.UNREGISTER,[key]);
	}
	,__class__: hex_ioc_locator_MethodCallVOLocator
});
var hex_ioc_locator_ModuleLocator = function(builderFactory) {
	hex_collection_Locator.call(this);
	this._builderFactory = builderFactory;
};
$hxClasses["hex.ioc.locator.ModuleLocator"] = hex_ioc_locator_ModuleLocator;
hex_ioc_locator_ModuleLocator.__name__ = ["hex","ioc","locator","ModuleLocator"];
hex_ioc_locator_ModuleLocator.__super__ = hex_collection_Locator;
hex_ioc_locator_ModuleLocator.prototype = $extend(hex_collection_Locator.prototype,{
	callModuleInitialisation: function() {
		var modules = this.values();
		var _g = 0;
		while(_g < modules.length) {
			var module = modules[_g];
			++_g;
			module.initialize();
		}
		this.clear();
	}
	,_dispatchRegisterEvent: function(key,element) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.REGISTER,[key,element]);
	}
	,_dispatchUnregisterEvent: function(key) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.UNREGISTER,[key]);
	}
	,__class__: hex_ioc_locator_ModuleLocator
});
var hex_ioc_locator_PropertyVOLocator = function() {
	hex_collection_Locator.call(this);
};
$hxClasses["hex.ioc.locator.PropertyVOLocator"] = hex_ioc_locator_PropertyVOLocator;
hex_ioc_locator_PropertyVOLocator.__name__ = ["hex","ioc","locator","PropertyVOLocator"];
hex_ioc_locator_PropertyVOLocator.__super__ = hex_collection_Locator;
hex_ioc_locator_PropertyVOLocator.prototype = $extend(hex_collection_Locator.prototype,{
	__class__: hex_ioc_locator_PropertyVOLocator
});
var hex_ioc_locator_StateTransitionVOLocator = function(builderFactory) {
	hex_collection_Locator.call(this);
	this._builderFactory = builderFactory;
	this._stateUnmapper = new hex_collection_HashMap();
};
$hxClasses["hex.ioc.locator.StateTransitionVOLocator"] = hex_ioc_locator_StateTransitionVOLocator;
hex_ioc_locator_StateTransitionVOLocator.__name__ = ["hex","ioc","locator","StateTransitionVOLocator"];
hex_ioc_locator_StateTransitionVOLocator.__super__ = hex_collection_Locator;
hex_ioc_locator_StateTransitionVOLocator.prototype = $extend(hex_collection_Locator.prototype,{
	buildStateTransition: function(key) {
		if(this.isRegisteredWithKey(key)) {
			var vo = this.locate(key);
			var coreFactory = this._builderFactory.getCoreFactory();
			var state = null;
			if(vo.staticReference != null) state = coreFactory.getStaticReference(vo.staticReference); else if(vo.instanceReference != null) state = coreFactory.locate(vo.instanceReference); else throw new js__$Boot_HaxeError(new hex_ioc_error_BuildingException(Std.string(this) + ".buildStateTransition failed with id '" + key + "'",{ fileName : "StateTransitionVOLocator.hx", lineNumber : 54, className : "hex.ioc.locator.StateTransitionVOLocator", methodName : "buildStateTransition"}));
			var stateUnmapper = null;
			if(!this._stateUnmapper.containsKey(state)) {
				stateUnmapper = new hex_ioc_locator__$StateTransitionVOLocator_StateUnmapper(state);
				this._stateUnmapper.put(state,stateUnmapper);
			} else stateUnmapper = this._stateUnmapper.get(state);
			if(state == null) throw new js__$Boot_HaxeError(new hex_ioc_error_BuildingException(Std.string(this) + ".buildStateTransition failed with '" + Std.string(vo) + "'",{ fileName : "StateTransitionVOLocator.hx", lineNumber : 70, className : "hex.ioc.locator.StateTransitionVOLocator", methodName : "buildStateTransition"}));
			var enterList = vo.enterList;
			var _g = 0;
			while(_g < enterList.length) {
				var enterVO = enterList[_g];
				++_g;
				var enterCommandClass = coreFactory.getClassReference(enterVO.commandClassName);
				var enterMapping = new hex_control_command_CommandMapping(enterCommandClass);
				var enterContextOwner = null;
				if(enterVO.contextOwner != null) enterContextOwner = new hex_ioc_di_ContextOwnerWrapper(coreFactory,enterVO.contextOwner);
				enterMapping.setContextOwner(enterContextOwner != null?enterContextOwner:this._builderFactory.getApplicationContext());
				if(enterVO.fireOnce) enterMapping.once();
				state.addEnterCommandMapping(enterMapping);
				stateUnmapper.addEnterMapping(enterMapping);
			}
			var exitList = vo.exitList;
			var _g1 = 0;
			while(_g1 < exitList.length) {
				var exitVO = exitList[_g1];
				++_g1;
				var exitCommandClass = coreFactory.getClassReference(exitVO.commandClassName);
				var exitMapping = new hex_control_command_CommandMapping(exitCommandClass);
				var exitContextOwner = null;
				if(exitVO.contextOwner != null) exitContextOwner = new hex_ioc_di_ContextOwnerWrapper(coreFactory,exitVO.contextOwner);
				exitMapping.setContextOwner(exitContextOwner != null?exitContextOwner:this._builderFactory.getApplicationContext());
				if(exitVO.fireOnce) exitMapping.once();
				state.addExitCommandMapping(exitMapping);
				stateUnmapper.addExitMapping(exitMapping);
			}
			this.unregister(key);
		}
	}
	,release: function() {
		var stateUnmappers = this._stateUnmapper.getValues();
		var _g = 0;
		while(_g < stateUnmappers.length) {
			var unmapper = stateUnmappers[_g];
			++_g;
			unmapper.unmap();
		}
		hex_collection_Locator.prototype.release.call(this);
	}
	,_dispatchRegisterEvent: function(key,element) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.REGISTER,[key,element]);
	}
	,_dispatchUnregisterEvent: function(key) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.UNREGISTER,[key]);
	}
	,__class__: hex_ioc_locator_StateTransitionVOLocator
});
var hex_ioc_locator__$StateTransitionVOLocator_StateUnmapper = function(state) {
	this._exitMappings = [];
	this._enterMappings = [];
	this._state = state;
};
$hxClasses["hex.ioc.locator._StateTransitionVOLocator.StateUnmapper"] = hex_ioc_locator__$StateTransitionVOLocator_StateUnmapper;
hex_ioc_locator__$StateTransitionVOLocator_StateUnmapper.__name__ = ["hex","ioc","locator","_StateTransitionVOLocator","StateUnmapper"];
hex_ioc_locator__$StateTransitionVOLocator_StateUnmapper.prototype = {
	unmap: function() {
		var _g = 0;
		var _g1 = this._enterMappings;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			this._state.removeEnterCommandMapping(m);
		}
		var _g2 = 0;
		var _g11 = this._exitMappings;
		while(_g2 < _g11.length) {
			var m1 = _g11[_g2];
			++_g2;
			this._state.removeEnterCommandMapping(m1);
		}
		this._state = null;
		this._enterMappings = null;
		this._exitMappings = null;
	}
	,addEnterMapping: function(mapping) {
		this._enterMappings.push(mapping);
	}
	,addExitMapping: function(mapping) {
		this._exitMappings.push(mapping);
	}
	,__class__: hex_ioc_locator__$StateTransitionVOLocator_StateUnmapper
};
var hex_ioc_parser_IParserCollection = function() { };
$hxClasses["hex.ioc.parser.IParserCollection"] = hex_ioc_parser_IParserCollection;
hex_ioc_parser_IParserCollection.__name__ = ["hex","ioc","parser","IParserCollection"];
hex_ioc_parser_IParserCollection.prototype = {
	__class__: hex_ioc_parser_IParserCollection
};
var hex_ioc_parser_AbstractParserCollection = function() {
	this._index = -1;
	this._parserCommandCollection = [];
	this._buildParserList();
};
$hxClasses["hex.ioc.parser.AbstractParserCollection"] = hex_ioc_parser_AbstractParserCollection;
hex_ioc_parser_AbstractParserCollection.__name__ = ["hex","ioc","parser","AbstractParserCollection"];
hex_ioc_parser_AbstractParserCollection.__interfaces__ = [hex_ioc_parser_IParserCollection];
hex_ioc_parser_AbstractParserCollection.prototype = {
	_buildParserList: function() {
		throw new js__$Boot_HaxeError(new hex_error_VirtualMethodException(Std.string(this) + ".setParserList() must be implemented in concrete class.",{ fileName : "AbstractParserCollection.hx", lineNumber : 23, className : "hex.ioc.parser.AbstractParserCollection", methodName : "_buildParserList"}));
	}
	,next: function() {
		return this._parserCommandCollection[++this._index];
	}
	,hasNext: function() {
		return this._parserCommandCollection.length > this._index + 1;
	}
	,reset: function() {
		this._index = -1;
	}
	,__class__: hex_ioc_parser_AbstractParserCollection
};
var hex_ioc_parser_IParserCommand = function() { };
$hxClasses["hex.ioc.parser.IParserCommand"] = hex_ioc_parser_IParserCommand;
hex_ioc_parser_IParserCommand.__name__ = ["hex","ioc","parser","IParserCommand"];
hex_ioc_parser_IParserCommand.prototype = {
	__class__: hex_ioc_parser_IParserCommand
};
var hex_ioc_parser_AbstractParserCommand = function() {
	hex_control_async_AsyncCommand.call(this);
};
$hxClasses["hex.ioc.parser.AbstractParserCommand"] = hex_ioc_parser_AbstractParserCommand;
hex_ioc_parser_AbstractParserCommand.__name__ = ["hex","ioc","parser","AbstractParserCommand"];
hex_ioc_parser_AbstractParserCommand.__interfaces__ = [hex_ioc_parser_IParserCommand];
hex_ioc_parser_AbstractParserCommand.__super__ = hex_control_async_AsyncCommand;
hex_ioc_parser_AbstractParserCommand.prototype = $extend(hex_control_async_AsyncCommand.prototype,{
	execute: function(request) {
		if(this._contextData != null) this.parse(); else throw new js__$Boot_HaxeError(new hex_error_NullPointerException(Std.string(this) + ".execute() failed. Context data was null.",{ fileName : "AbstractParserCommand.hx", lineNumber : 33, className : "hex.ioc.parser.AbstractParserCommand", methodName : "execute"}));
	}
	,setApplicationAssembler: function(applicationAssembler) {
		this._applicationAssembler = applicationAssembler;
	}
	,getApplicationAssembler: function() {
		return this._applicationAssembler;
	}
	,getContextData: function() {
		return this._contextData;
	}
	,parse: function() {
		throw new js__$Boot_HaxeError(new hex_error_VirtualMethodException(Std.string(this) + ".parse must be implemented in concrete class.",{ fileName : "AbstractParserCommand.hx", lineNumber : 57, className : "hex.ioc.parser.AbstractParserCommand", methodName : "parse"}));
	}
	,setContextData: function(data) {
		throw new js__$Boot_HaxeError(new hex_error_VirtualMethodException(Std.string(this) + ".setContextData must be implemented in concrete class.",{ fileName : "AbstractParserCommand.hx", lineNumber : 62, className : "hex.ioc.parser.AbstractParserCommand", methodName : "setContextData"}));
	}
	,getApplicationContext: function(applicationContextClass) {
		throw new js__$Boot_HaxeError(new hex_error_VirtualMethodException(Std.string(this) + ".getApplicationContext must be implemented in concrete class.",{ fileName : "AbstractParserCommand.hx", lineNumber : 67, className : "hex.ioc.parser.AbstractParserCommand", methodName : "getApplicationContext"}));
	}
	,__class__: hex_ioc_parser_AbstractParserCommand
});
var hex_ioc_parser_preprocess_MacroPreprocessor = function() {
};
$hxClasses["hex.ioc.parser.preprocess.MacroPreprocessor"] = hex_ioc_parser_preprocess_MacroPreprocessor;
hex_ioc_parser_preprocess_MacroPreprocessor.__name__ = ["hex","ioc","parser","preprocess","MacroPreprocessor"];
hex_ioc_parser_preprocess_MacroPreprocessor.prototype = {
	__class__: hex_ioc_parser_preprocess_MacroPreprocessor
};
var hex_ioc_parser_preprocess_Preprocessor = function() {
	this._separator = new EReg("\\$\\{.*\\}","");
	this._property = new haxe_ds_StringMap();
};
$hxClasses["hex.ioc.parser.preprocess.Preprocessor"] = hex_ioc_parser_preprocess_Preprocessor;
hex_ioc_parser_preprocess_Preprocessor.__name__ = ["hex","ioc","parser","preprocess","Preprocessor"];
hex_ioc_parser_preprocess_Preprocessor.__interfaces__ = [hex_data_IParser];
hex_ioc_parser_preprocess_Preprocessor.prototype = {
	addProperty: function(name,value) {
		if(!this._property.exists(name)) this._property.set(name,value); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("addProperty failed with property name '" + name + "' and value '" + value + "'. This name is already registered.",{ fileName : "Preprocessor.hx", lineNumber : 24, className : "hex.ioc.parser.preprocess.Preprocessor", methodName : "addProperty"}));
	}
	,parse: function(serializedContent,target) {
		var context = serializedContent;
		var i = this._property.keys();
		while(i.hasNext()) {
			var name = i.next();
			var value = this._property.get(name);
			var a = context.split("$" + "{" + name + "}");
			if(a.length > 1) {
				var _g = 0;
				while(_g < a.length) {
					var element = a[_g];
					++_g;
					this.parse(element);
				}
			}
			context = a.join(value);
		}
		if(this._separator.match(context)) return this.parse(context); else return context;
	}
	,__class__: hex_ioc_parser_preprocess_Preprocessor
};
var hex_ioc_parser_xml_AbstractXMLParser = function() {
	hex_ioc_parser_AbstractParserCommand.call(this);
};
$hxClasses["hex.ioc.parser.xml.AbstractXMLParser"] = hex_ioc_parser_xml_AbstractXMLParser;
hex_ioc_parser_xml_AbstractXMLParser.__name__ = ["hex","ioc","parser","xml","AbstractXMLParser"];
hex_ioc_parser_xml_AbstractXMLParser.__super__ = hex_ioc_parser_AbstractParserCommand;
hex_ioc_parser_xml_AbstractXMLParser.prototype = $extend(hex_ioc_parser_AbstractParserCommand.prototype,{
	getApplicationContext: function(applicationContextClass) {
		var applicationContextName = this.getXMLContext().firstElement().get("name");
		if(applicationContextName == null) throw new js__$Boot_HaxeError(new hex_ioc_error_ParsingException(Std.string(this) + " failed to retrieve applicationContext name. You should add 'name' attribute to the root of your xml context",{ fileName : "AbstractXMLParser.hx", lineNumber : 26, className : "hex.ioc.parser.xml.AbstractXMLParser", methodName : "getApplicationContext"}));
		return this._applicationAssembler.getApplicationContext(applicationContextName,applicationContextClass);
	}
	,setContextData: function(data) {
		if(data != null) {
			if(js_Boot.__instanceof(data,Xml)) this._contextData = data; else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(Std.string(this) + ".setContext() failed. Data should be an instance of Xml.",{ fileName : "AbstractXMLParser.hx", lineNumber : 44, className : "hex.ioc.parser.xml.AbstractXMLParser", methodName : "setContextData"}));
		} else throw new js__$Boot_HaxeError(new hex_error_NullPointerException(Std.string(this) + ".setContext() failed. Data was null.",{ fileName : "AbstractXMLParser.hx", lineNumber : 49, className : "hex.ioc.parser.xml.AbstractXMLParser", methodName : "setContextData"}));
	}
	,getXMLContext: function() {
		return this.getContextData();
	}
	,__class__: hex_ioc_parser_xml_AbstractXMLParser
});
var hex_ioc_parser_xml_ApplicationContextXMLParser = function() {
	hex_ioc_parser_xml_AbstractXMLParser.call(this);
};
$hxClasses["hex.ioc.parser.xml.ApplicationContextXMLParser"] = hex_ioc_parser_xml_ApplicationContextXMLParser;
hex_ioc_parser_xml_ApplicationContextXMLParser.__name__ = ["hex","ioc","parser","xml","ApplicationContextXMLParser"];
hex_ioc_parser_xml_ApplicationContextXMLParser.__super__ = hex_ioc_parser_xml_AbstractXMLParser;
hex_ioc_parser_xml_ApplicationContextXMLParser.prototype = $extend(hex_ioc_parser_xml_AbstractXMLParser.prototype,{
	parse: function() {
		var applicationContextClassName = this.getXMLContext().firstElement().get("type");
		if(applicationContextClassName != null) try {
			var applicationContextClass = Type.resolveClass(applicationContextClassName);
			this.getApplicationContext(applicationContextClass);
		} catch( error ) {
			if (error instanceof js__$Boot_HaxeError) error = error.val;
			throw new js__$Boot_HaxeError(new hex_ioc_error_ParsingException(Std.string(this) + " failed to instantiate applicationContext class named '" + applicationContextClassName + "'",{ fileName : "ApplicationContextXMLParser.hx", lineNumber : 32, className : "hex.ioc.parser.xml.ApplicationContextXMLParser", methodName : "parse"}));
		} else this.getApplicationContext();
		this._handleComplete();
	}
	,__class__: hex_ioc_parser_xml_ApplicationContextXMLParser
});
var hex_ioc_parser_xml_ApplicationXMLParser = function(parserCollection) {
	if(parserCollection != null) this._parserCollection = parserCollection; else this._parserCollection = new hex_ioc_parser_xml_XMLParserCollection();
};
$hxClasses["hex.ioc.parser.xml.ApplicationXMLParser"] = hex_ioc_parser_xml_ApplicationXMLParser;
hex_ioc_parser_xml_ApplicationXMLParser.__name__ = ["hex","ioc","parser","xml","ApplicationXMLParser"];
hex_ioc_parser_xml_ApplicationXMLParser.prototype = {
	setApplicationAssembler: function(applicationAssembler) {
		this._assembler = applicationAssembler;
	}
	,getApplicationAssembler: function() {
		return this._contextData;
	}
	,setContextData: function(context) {
		this._contextData = context;
	}
	,getContextData: function() {
		return this._contextData;
	}
	,parse: function(applicationAssembler,context) {
		if(applicationAssembler != null) this.setApplicationAssembler(applicationAssembler); else throw new js__$Boot_HaxeError(new hex_error_NullPointerException(Std.string(this) + ".parse() can't retrieve instance of ApplicationAssembler",{ fileName : "ApplicationXMLParser.hx", lineNumber : 57, className : "hex.ioc.parser.xml.ApplicationXMLParser", methodName : "parse"}));
		if(context != null) this.setContextData(context); else throw new js__$Boot_HaxeError(new hex_error_NullPointerException(Std.string(this) + ".parse() can't retrieve IoC context data",{ fileName : "ApplicationXMLParser.hx", lineNumber : 66, className : "hex.ioc.parser.xml.ApplicationXMLParser", methodName : "parse"}));
		if(this._parserCollection == null) this._parserCollection = new hex_ioc_parser_xml_XMLParserCollection();
		while(this._parserCollection.hasNext()) {
			var parser = this._parserCollection.next();
			parser.setContextData(this._contextData);
			parser.setApplicationAssembler(this._assembler);
			parser.parse();
			this._contextData = parser.getContextData();
		}
		this._parserCollection.reset();
	}
	,__class__: hex_ioc_parser_xml_ApplicationXMLParser
};
var hex_ioc_parser_xml_ObjectXMLParser = function() {
	hex_ioc_parser_xml_AbstractXMLParser.call(this);
};
$hxClasses["hex.ioc.parser.xml.ObjectXMLParser"] = hex_ioc_parser_xml_ObjectXMLParser;
hex_ioc_parser_xml_ObjectXMLParser.__name__ = ["hex","ioc","parser","xml","ObjectXMLParser"];
hex_ioc_parser_xml_ObjectXMLParser.__super__ = hex_ioc_parser_xml_AbstractXMLParser;
hex_ioc_parser_xml_ObjectXMLParser.prototype = $extend(hex_ioc_parser_xml_AbstractXMLParser.prototype,{
	parse: function() {
		var iterator = this.getXMLContext().firstElement().elements();
		while(iterator.hasNext()) this._parseNode(iterator.next());
		this._handleComplete();
	}
	,_parseNode: function(xml) {
		var applicationContext = this.getApplicationContext();
		var identifier = hex_ioc_parser_xml_XMLAttributeUtil.getID(xml);
		if(identifier == null) throw new js__$Boot_HaxeError(new hex_ioc_error_ParsingException(Std.string(this) + " encounters parsing error with '" + (function($this) {
			var $r;
			if(xml.nodeType != Xml.Element) throw "Bad node type, expected Element but found " + xml.nodeType;
			$r = xml.nodeName;
			return $r;
		}(this)) + "' node. You must set an id attribute.",{ fileName : "ObjectXMLParser.hx", lineNumber : 39, className : "hex.ioc.parser.xml.ObjectXMLParser", methodName : "_parseNode"}));
		var type;
		var args;
		var factory;
		var singleton;
		var injectInto;
		var mapType;
		var staticRef;
		var ifList;
		var ifNotList;
		type = hex_ioc_parser_xml_XMLAttributeUtil.getType(xml);
		if(type == "XML") {
			args = [];
			args.push({ ownerID : identifier, value : xml.firstElement().toString()});
			factory = hex_ioc_parser_xml_XMLAttributeUtil.getParserClass(xml);
			this.getApplicationAssembler().buildObject(applicationContext,identifier,type,args,factory);
		} else {
			if(type == "hex.collection.HashMap" || type == "hex.config.stateful.ServiceLocator") args = hex_ioc_parser_xml_XMLParserUtil.getItems(xml); else args = hex_ioc_parser_xml_XMLParserUtil.getArguments(xml,type);
			factory = hex_ioc_parser_xml_XMLAttributeUtil.getFactoryMethod(xml);
			singleton = hex_ioc_parser_xml_XMLAttributeUtil.getSingletonAccess(xml);
			injectInto = hex_ioc_parser_xml_XMLAttributeUtil.getInjectInto(xml);
			mapType = hex_ioc_parser_xml_XMLAttributeUtil.getMapType(xml);
			staticRef = hex_ioc_parser_xml_XMLAttributeUtil.getStaticRef(xml);
			ifList = hex_ioc_parser_xml_XMLParserUtil.getIfList(xml);
			ifNotList = hex_ioc_parser_xml_XMLParserUtil.getIfNotList(xml);
			if(type == null) if(staticRef != null) type = "Instance"; else type = "String";
			this.getApplicationAssembler().buildObject(applicationContext,identifier,type,args,factory,singleton,injectInto,mapType,staticRef,ifList,ifNotList);
			var propertyIterator = xml.elementsNamed("property");
			while(propertyIterator.hasNext()) {
				var property = propertyIterator.next();
				this.getApplicationAssembler().buildProperty(applicationContext,identifier,hex_ioc_parser_xml_XMLAttributeUtil.getName(property),hex_ioc_parser_xml_XMLAttributeUtil.getValue(property),hex_ioc_parser_xml_XMLAttributeUtil.getType(property),hex_ioc_parser_xml_XMLAttributeUtil.getRef(property),hex_ioc_parser_xml_XMLAttributeUtil.getMethod(property),hex_ioc_parser_xml_XMLAttributeUtil.getStaticRef(property),hex_ioc_parser_xml_XMLParserUtil.getIfList(xml),hex_ioc_parser_xml_XMLParserUtil.getIfNotList(xml));
			}
			var methodCallIterator = xml.elementsNamed("method-call");
			while(methodCallIterator.hasNext()) {
				var methodCallItem = methodCallIterator.next();
				this.getApplicationAssembler().buildMethodCall(applicationContext,identifier,hex_ioc_parser_xml_XMLAttributeUtil.getName(methodCallItem),hex_ioc_parser_xml_XMLParserUtil.getMethodCallArguments(methodCallItem),hex_ioc_parser_xml_XMLParserUtil.getIfList(methodCallItem),hex_ioc_parser_xml_XMLParserUtil.getIfNotList(methodCallItem));
			}
			var listenIterator = xml.elementsNamed("listen");
			while(listenIterator.hasNext()) {
				var listener = listenIterator.next();
				var channelName = hex_ioc_parser_xml_XMLAttributeUtil.getRef(listener);
				if(channelName != null) {
					var listenerArgs = hex_ioc_parser_xml_XMLParserUtil.getEventArguments(listener);
					this.getApplicationAssembler().buildDomainListener(applicationContext,identifier,channelName,listenerArgs,hex_ioc_parser_xml_XMLParserUtil.getIfList(listener),hex_ioc_parser_xml_XMLParserUtil.getIfNotList(listener));
				} else throw new js__$Boot_HaxeError(new hex_error_Exception(Std.string(this) + " encounters parsing error with '" + (function($this) {
					var $r;
					if(xml.nodeType != Xml.Element) throw "Bad node type, expected Element but found " + xml.nodeType;
					$r = xml.nodeName;
					return $r;
				}(this)) + "' node, 'ref' attribute is mandatory in a 'listen' node.",{ fileName : "ObjectXMLParser.hx", lineNumber : 122, className : "hex.ioc.parser.xml.ObjectXMLParser", methodName : "_parseNode"}));
			}
		}
	}
	,__class__: hex_ioc_parser_xml_ObjectXMLParser
});
var hex_ioc_parser_xml_StateXMLParser = function() {
	hex_ioc_parser_xml_AbstractXMLParser.call(this);
};
$hxClasses["hex.ioc.parser.xml.StateXMLParser"] = hex_ioc_parser_xml_StateXMLParser;
hex_ioc_parser_xml_StateXMLParser.__name__ = ["hex","ioc","parser","xml","StateXMLParser"];
hex_ioc_parser_xml_StateXMLParser.__super__ = hex_ioc_parser_xml_AbstractXMLParser;
hex_ioc_parser_xml_StateXMLParser.prototype = $extend(hex_ioc_parser_xml_AbstractXMLParser.prototype,{
	parse: function() {
		var iterator = this.getXMLContext().firstElement().elementsNamed("state");
		while(iterator.hasNext()) {
			var node = iterator.next();
			this._parseNode(node);
			this.getXMLContext().firstElement().removeChild(node);
		}
		this._handleComplete();
	}
	,_parseNode: function(xml) {
		var applicationContext = this.getApplicationContext();
		var applicationAssembler = this.getApplicationAssembler();
		var identifier = hex_ioc_parser_xml_XMLAttributeUtil.getID(xml);
		if(identifier == null) throw new js__$Boot_HaxeError(new hex_ioc_error_ParsingException(Std.string(this) + " encounters parsing error with '" + (function($this) {
			var $r;
			if(xml.nodeType != Xml.Element) throw "Bad node type, expected Element but found " + xml.nodeType;
			$r = xml.nodeName;
			return $r;
		}(this)) + "' node. You must set an id attribute.",{ fileName : "StateXMLParser.hx", lineNumber : 41, className : "hex.ioc.parser.xml.StateXMLParser", methodName : "_parseNode"}));
		var staticReference = hex_ioc_parser_xml_XMLAttributeUtil.getStaticRef(xml);
		var instanceReference = hex_ioc_parser_xml_XMLAttributeUtil.getRef(xml);
		var enterListIterator = xml.elementsNamed("enter");
		var enterList = [];
		while(enterListIterator.hasNext()) {
			var enterListItem = enterListIterator.next();
			enterList.push(new hex_ioc_vo_CommandMappingVO(hex_ioc_parser_xml_XMLAttributeUtil.getCommandClass(enterListItem),hex_ioc_parser_xml_XMLAttributeUtil.getFireOnce(enterListItem),hex_ioc_parser_xml_XMLAttributeUtil.getContextOwner(enterListItem)));
		}
		var exitListIterator = xml.elementsNamed("exit");
		var exitList = [];
		while(exitListIterator.hasNext()) {
			var exitListItem = exitListIterator.next();
			exitList.push(new hex_ioc_vo_CommandMappingVO(hex_ioc_parser_xml_XMLAttributeUtil.getCommandClass(exitListItem),hex_ioc_parser_xml_XMLAttributeUtil.getFireOnce(exitListItem),hex_ioc_parser_xml_XMLAttributeUtil.getContextOwner(exitListItem)));
		}
		applicationAssembler.configureStateTransition(applicationContext,identifier,staticReference,instanceReference,enterList,exitList);
	}
	,__class__: hex_ioc_parser_xml_StateXMLParser
});
var hex_ioc_parser_xml_XMLAttributeUtil = function() {
	throw new js__$Boot_HaxeError(new hex_error_PrivateConstructorException("'XMLAttributeUtil' class can't be instantiated.",{ fileName : "XMLAttributeUtil.hx", lineNumber : 14, className : "hex.ioc.parser.xml.XMLAttributeUtil", methodName : "new"}));
};
$hxClasses["hex.ioc.parser.xml.XMLAttributeUtil"] = hex_ioc_parser_xml_XMLAttributeUtil;
hex_ioc_parser_xml_XMLAttributeUtil.__name__ = ["hex","ioc","parser","xml","XMLAttributeUtil"];
hex_ioc_parser_xml_XMLAttributeUtil.getID = function(xml) {
	return xml.get("id");
};
hex_ioc_parser_xml_XMLAttributeUtil.getType = function(xml) {
	return xml.get("type");
};
hex_ioc_parser_xml_XMLAttributeUtil.getName = function(xml) {
	return xml.get("name");
};
hex_ioc_parser_xml_XMLAttributeUtil.getRef = function(xml) {
	return xml.get("ref");
};
hex_ioc_parser_xml_XMLAttributeUtil.getValue = function(xml) {
	return xml.get("value");
};
hex_ioc_parser_xml_XMLAttributeUtil.getFactoryMethod = function(xml) {
	return xml.get("factory");
};
hex_ioc_parser_xml_XMLAttributeUtil.getSingletonAccess = function(xml) {
	return xml.get("singleton-access");
};
hex_ioc_parser_xml_XMLAttributeUtil.getInjectInto = function(xml) {
	return xml.get("inject-into") == "true";
};
hex_ioc_parser_xml_XMLAttributeUtil.getMethod = function(xml) {
	return xml.get("method");
};
hex_ioc_parser_xml_XMLAttributeUtil.getParserClass = function(xml) {
	return xml.get("parser-class");
};
hex_ioc_parser_xml_XMLAttributeUtil.getLocator = function(xml) {
	return xml.get("locator");
};
hex_ioc_parser_xml_XMLAttributeUtil.getAttribute = function(xml,attName) {
	return xml.get(attName);
};
hex_ioc_parser_xml_XMLAttributeUtil.getMapType = function(xml) {
	return xml.get("map-type");
};
hex_ioc_parser_xml_XMLAttributeUtil.getMapName = function(xml) {
	return xml.get("map-name");
};
hex_ioc_parser_xml_XMLAttributeUtil.getStaticRef = function(xml) {
	return xml.get("static-ref");
};
hex_ioc_parser_xml_XMLAttributeUtil.getCommandClass = function(xml) {
	return xml.get("command-class");
};
hex_ioc_parser_xml_XMLAttributeUtil.getFireOnce = function(xml) {
	return xml.get("fire-once") == "true";
};
hex_ioc_parser_xml_XMLAttributeUtil.getContextOwner = function(xml) {
	return xml.get("context-owner");
};
hex_ioc_parser_xml_XMLAttributeUtil.getIf = function(xml) {
	return xml.get("if");
};
hex_ioc_parser_xml_XMLAttributeUtil.getIfNot = function(xml) {
	return xml.get("if-not");
};
hex_ioc_parser_xml_XMLAttributeUtil.prototype = {
	__class__: hex_ioc_parser_xml_XMLAttributeUtil
};
var hex_ioc_parser_xml_XMLFileReader = function() { };
$hxClasses["hex.ioc.parser.xml.XMLFileReader"] = hex_ioc_parser_xml_XMLFileReader;
hex_ioc_parser_xml_XMLFileReader.__name__ = ["hex","ioc","parser","xml","XMLFileReader"];
var hex_ioc_parser_xml_XMLParserCollection = function() {
	hex_ioc_parser_AbstractParserCollection.call(this);
};
$hxClasses["hex.ioc.parser.xml.XMLParserCollection"] = hex_ioc_parser_xml_XMLParserCollection;
hex_ioc_parser_xml_XMLParserCollection.__name__ = ["hex","ioc","parser","xml","XMLParserCollection"];
hex_ioc_parser_xml_XMLParserCollection.__super__ = hex_ioc_parser_AbstractParserCollection;
hex_ioc_parser_xml_XMLParserCollection.prototype = $extend(hex_ioc_parser_AbstractParserCollection.prototype,{
	_buildParserList: function() {
		this._parserCommandCollection.push(new hex_ioc_parser_xml_ApplicationContextXMLParser());
		this._parserCommandCollection.push(new hex_ioc_parser_xml_StateXMLParser());
		this._parserCommandCollection.push(new hex_ioc_parser_xml_ObjectXMLParser());
	}
	,__class__: hex_ioc_parser_xml_XMLParserCollection
});
var hex_ioc_parser_xml_XMLParserUtil = function() {
};
$hxClasses["hex.ioc.parser.xml.XMLParserUtil"] = hex_ioc_parser_xml_XMLParserUtil;
hex_ioc_parser_xml_XMLParserUtil.__name__ = ["hex","ioc","parser","xml","XMLParserUtil"];
hex_ioc_parser_xml_XMLParserUtil.getArguments = function(xml,type) {
	var args = [];
	var iterator = xml.elementsNamed("argument");
	if(iterator.hasNext()) while(iterator.hasNext()) {
		var item = iterator.next();
		var argItem = { };
		argItem.staticRef = item.get("static-ref");
		argItem.ref = item.get("ref");
		argItem.type = item.get("type");
		argItem.value = item.get("value");
		args.push(argItem);
	} else {
		var value = hex_ioc_parser_xml_XMLAttributeUtil.getValue(xml);
		if(value != null) args.push({ type : "String", value : xml.get("value")});
	}
	return args;
};
hex_ioc_parser_xml_XMLParserUtil.getMethodCallArguments = function(xml) {
	var args = [];
	var iterator = xml.elementsNamed("argument");
	while(iterator.hasNext()) {
		var item = iterator.next();
		var argItem = { };
		argItem.id = item.get("id");
		argItem.staticRef = item.get("static-ref");
		argItem.ref = item.get("ref");
		argItem.type = item.get("type");
		argItem.value = item.get("value");
		args.push(argItem);
	}
	return args;
};
hex_ioc_parser_xml_XMLParserUtil.getEventArguments = function(xml) {
	var args = [];
	var iterator = xml.elementsNamed("event");
	while(iterator.hasNext()) {
		var item = iterator.next();
		var domainListenerVOArguments = new hex_ioc_vo_DomainListenerVOArguments();
		domainListenerVOArguments.name = item.get("name");
		domainListenerVOArguments.staticRef = item.get("static-ref");
		domainListenerVOArguments.method = item.get("method");
		domainListenerVOArguments.strategy = item.get("strategy");
		domainListenerVOArguments.injectedInModule = item.get("injectedInModule") == "true";
		args.push(domainListenerVOArguments);
	}
	return args;
};
hex_ioc_parser_xml_XMLParserUtil.getItems = function(xml) {
	var args = [];
	var iterator = xml.elementsNamed("item");
	while(iterator.hasNext()) {
		var item = iterator.next();
		var keyList = item.elementsNamed("key");
		var valueList = item.elementsNamed("value");
		if(keyList.hasNext()) args.push({ mapName : hex_ioc_parser_xml_XMLAttributeUtil.getMapName(item), key : hex_ioc_parser_xml_XMLParserUtil._getAttributes(keyList.next()), value : hex_ioc_parser_xml_XMLParserUtil._getAttributes(valueList.next())});
	}
	return args;
};
hex_ioc_parser_xml_XMLParserUtil._getAttributes = function(xml) {
	var obj = { };
	var iterator = xml.attributes();
	while(iterator.hasNext()) {
		var attribute = iterator.next();
		Reflect.setField(obj,attribute,xml.get(attribute));
	}
	return obj;
};
hex_ioc_parser_xml_XMLParserUtil.concatXmlList = function(configList,name) {
	var result = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><root name=\"" + name + "\">";
	var l = configList.length;
	var matcher = new EReg("<\\?xml[^>]+>\\s*<\\s*(\\w+)\\s*>([\\s\\S]*)<\\s*/\\s*\\1\\s*>","");
	var _g = 0;
	while(_g < l) {
		var i = _g++;
		if(matcher.match(configList[i])) result += matcher.matched(2);
	}
	result += "</root>";
	return result;
};
hex_ioc_parser_xml_XMLParserUtil.getConfigList = function(list) {
	var result = [];
	var l = list.length;
	var _g = 0;
	while(_g < l) {
		var i = _g++;
		result.push(haxe_Resource.getString(list[i]));
	}
	return result;
};
hex_ioc_parser_xml_XMLParserUtil.getConcatenatedConfig = function(configKeyList,name) {
	return hex_ioc_parser_xml_XMLParserUtil.concatXmlList(hex_ioc_parser_xml_XMLParserUtil.getConfigList(configKeyList),name);
};
hex_ioc_parser_xml_XMLParserUtil.getIfList = function(xml) {
	var s = hex_ioc_parser_xml_XMLAttributeUtil.getIf(xml);
	if(s != null) return s.split(","); else return null;
};
hex_ioc_parser_xml_XMLParserUtil.getIfNotList = function(xml) {
	var s = hex_ioc_parser_xml_XMLAttributeUtil.getIfNot(xml);
	if(s != null) return s.split(","); else return null;
};
hex_ioc_parser_xml_XMLParserUtil.prototype = {
	__class__: hex_ioc_parser_xml_XMLParserUtil
};
var hex_ioc_vo_BuildHelperVO = function() {
};
$hxClasses["hex.ioc.vo.BuildHelperVO"] = hex_ioc_vo_BuildHelperVO;
hex_ioc_vo_BuildHelperVO.__name__ = ["hex","ioc","vo","BuildHelperVO"];
hex_ioc_vo_BuildHelperVO.prototype = {
	__class__: hex_ioc_vo_BuildHelperVO
};
var hex_ioc_vo_CommandMappingVO = function(commandClassName,fireOnce,contextOwner) {
	if(fireOnce == null) fireOnce = false;
	this.commandClassName = commandClassName;
	this.fireOnce = fireOnce;
	this.contextOwner = contextOwner;
};
$hxClasses["hex.ioc.vo.CommandMappingVO"] = hex_ioc_vo_CommandMappingVO;
hex_ioc_vo_CommandMappingVO.__name__ = ["hex","ioc","vo","CommandMappingVO"];
hex_ioc_vo_CommandMappingVO.prototype = {
	__class__: hex_ioc_vo_CommandMappingVO
};
var hex_ioc_vo_ConstructorVO = function(id,type,args,factory,singleton,injectInto,ref,mapType,staticRef) {
	if(injectInto == null) injectInto = false;
	this.ID = id;
	this.type = type;
	this["arguments"] = args;
	this.factory = factory;
	this.singleton = singleton;
	this.injectInto = injectInto;
	this.ref = ref;
	this.mapType = mapType;
	this.staticRef = staticRef;
};
$hxClasses["hex.ioc.vo.ConstructorVO"] = hex_ioc_vo_ConstructorVO;
hex_ioc_vo_ConstructorVO.__name__ = ["hex","ioc","vo","ConstructorVO"];
hex_ioc_vo_ConstructorVO.prototype = {
	toString: function() {
		return "(" + "id:" + this.ID + ", " + "type:" + this.type + ", " + "arguments:[" + Std.string(this["arguments"]) + "], " + "factory:" + this.factory + ", " + "singleton:" + this.singleton + ", " + "injectInto:" + Std.string(this.injectInto) + ", " + "ref:" + this.ref + ", " + "mapType:" + this.mapType + ", " + "staticRef:" + this.staticRef + ")";
	}
	,__class__: hex_ioc_vo_ConstructorVO
};
var hex_ioc_vo_DomainListenerVO = function(ownerID,listenedDomainName,$arguments) {
	this.ownerID = ownerID;
	this.listenedDomainName = listenedDomainName;
	this["arguments"] = $arguments;
};
$hxClasses["hex.ioc.vo.DomainListenerVO"] = hex_ioc_vo_DomainListenerVO;
hex_ioc_vo_DomainListenerVO.__name__ = ["hex","ioc","vo","DomainListenerVO"];
hex_ioc_vo_DomainListenerVO.prototype = {
	__class__: hex_ioc_vo_DomainListenerVO
};
var hex_ioc_vo_DomainListenerVOArguments = function(name,staticRef,method,strategy,injectedInModule) {
	if(injectedInModule == null) injectedInModule = false;
	this.injectedInModule = false;
	this.name = name;
	this.staticRef = staticRef;
	this.method = method;
	this.strategy = strategy;
	this.injectedInModule = injectedInModule;
};
$hxClasses["hex.ioc.vo.DomainListenerVOArguments"] = hex_ioc_vo_DomainListenerVOArguments;
hex_ioc_vo_DomainListenerVOArguments.__name__ = ["hex","ioc","vo","DomainListenerVOArguments"];
hex_ioc_vo_DomainListenerVOArguments.prototype = {
	__class__: hex_ioc_vo_DomainListenerVOArguments
};
var hex_ioc_vo_MapVO = function(key,value) {
	this._key = key;
	this._value = value;
};
$hxClasses["hex.ioc.vo.MapVO"] = hex_ioc_vo_MapVO;
hex_ioc_vo_MapVO.__name__ = ["hex","ioc","vo","MapVO"];
hex_ioc_vo_MapVO.prototype = {
	getPropertyKey: function() {
		return this._key;
	}
	,getPropertyValue: function() {
		return this._value;
	}
	,__class__: hex_ioc_vo_MapVO
};
var hex_ioc_vo_MethodCallVO = function(ownerID,name,args) {
	this.ownerID = ownerID;
	this.name = name;
	this["arguments"] = args;
};
$hxClasses["hex.ioc.vo.MethodCallVO"] = hex_ioc_vo_MethodCallVO;
hex_ioc_vo_MethodCallVO.__name__ = ["hex","ioc","vo","MethodCallVO"];
hex_ioc_vo_MethodCallVO.prototype = {
	__class__: hex_ioc_vo_MethodCallVO
};
var hex_ioc_vo_PropertyVO = function(ownerID,name,value,type,ref,method,staticRef) {
	this.ownerID = ownerID;
	this.name = name;
	this.value = value;
	this.type = type;
	this.ref = ref;
	this.method = method;
	this.staticRef = staticRef;
};
$hxClasses["hex.ioc.vo.PropertyVO"] = hex_ioc_vo_PropertyVO;
hex_ioc_vo_PropertyVO.__name__ = ["hex","ioc","vo","PropertyVO"];
hex_ioc_vo_PropertyVO.prototype = {
	__class__: hex_ioc_vo_PropertyVO
};
var hex_ioc_vo_ServiceLocatorVO = function(key,value,mapName) {
	hex_ioc_vo_MapVO.call(this,key,value);
	this.mapName = mapName;
};
$hxClasses["hex.ioc.vo.ServiceLocatorVO"] = hex_ioc_vo_ServiceLocatorVO;
hex_ioc_vo_ServiceLocatorVO.__name__ = ["hex","ioc","vo","ServiceLocatorVO"];
hex_ioc_vo_ServiceLocatorVO.__super__ = hex_ioc_vo_MapVO;
hex_ioc_vo_ServiceLocatorVO.prototype = $extend(hex_ioc_vo_MapVO.prototype,{
	__class__: hex_ioc_vo_ServiceLocatorVO
});
var hex_ioc_vo_StateTransitionVO = function(ID,staticReference,instanceReference,enterList,exitList) {
	this.ID = ID;
	this.staticReference = staticReference;
	this.instanceReference = instanceReference;
	this.enterList = enterList;
	this.exitList = exitList;
};
$hxClasses["hex.ioc.vo.StateTransitionVO"] = hex_ioc_vo_StateTransitionVO;
hex_ioc_vo_StateTransitionVO.__name__ = ["hex","ioc","vo","StateTransitionVO"];
hex_ioc_vo_StateTransitionVO.prototype = {
	__class__: hex_ioc_vo_StateTransitionVO
};
var hex_log_ILogger = function() { };
$hxClasses["hex.log.ILogger"] = hex_log_ILogger;
hex_log_ILogger.__name__ = ["hex","log","ILogger"];
hex_log_ILogger.prototype = {
	__class__: hex_log_ILogger
};
var hex_log_DomainLogger = function(domain) {
	if(domain == null) throw new js__$Boot_HaxeError(new hex_error_NullPointerException("Domain should be specified for contructor call",{ fileName : "DomainLogger.hx", lineNumber : 21, className : "hex.log.DomainLogger", methodName : "new"}));
	this._domain = domain;
	this._logger = hex_log_Logger.getInstance();
};
$hxClasses["hex.log.DomainLogger"] = hex_log_DomainLogger;
hex_log_DomainLogger.__name__ = ["hex","log","DomainLogger"];
hex_log_DomainLogger.__interfaces__ = [hex_log_ILogger];
hex_log_DomainLogger.prototype = {
	clear: function() {
		this._logger.clear();
	}
	,debug: function(o,posInfos) {
		this._logger.log(o,hex_log_LogLevel._DEBUG,this._domain,posInfos);
	}
	,info: function(o,posInfos) {
		this._logger.log(o,hex_log_LogLevel._INFO,this._domain,posInfos);
	}
	,warn: function(o,posInfos) {
		this._logger.log(o,hex_log_LogLevel._WARN,this._domain,posInfos);
	}
	,error: function(o,posInfos) {
		this._logger.log(o,hex_log_LogLevel._ERROR,this._domain,posInfos);
	}
	,fatal: function(o,posInfos) {
		this._logger.log(o,hex_log_LogLevel._FATAL,this._domain,posInfos);
	}
	,getDomain: function() {
		return this._domain;
	}
	,__class__: hex_log_DomainLogger
};
var hex_log_ILogListener = function() { };
$hxClasses["hex.log.ILogListener"] = hex_log_ILogListener;
hex_log_ILogListener.__name__ = ["hex","log","ILogListener"];
hex_log_ILogListener.prototype = {
	__class__: hex_log_ILogListener
};
var hex_log_LoggerMessage = function(message,level,domain,posInfos) {
	this.message = message;
	this.level = level;
	this.domain = domain;
	this.posInfos = posInfos;
};
$hxClasses["hex.log.LoggerMessage"] = hex_log_LoggerMessage;
hex_log_LoggerMessage.__name__ = ["hex","log","LoggerMessage"];
hex_log_LoggerMessage.prototype = {
	__class__: hex_log_LoggerMessage
};
var hex_log_layout_JavaScriptConsoleLayout = function() {
};
$hxClasses["hex.log.layout.JavaScriptConsoleLayout"] = hex_log_layout_JavaScriptConsoleLayout;
hex_log_layout_JavaScriptConsoleLayout.__name__ = ["hex","log","layout","JavaScriptConsoleLayout"];
hex_log_layout_JavaScriptConsoleLayout.__interfaces__ = [hex_log_ILogListener];
hex_log_layout_JavaScriptConsoleLayout.prototype = {
	onLog: function(message) {
		var posInfos = message.posInfos;
		var info;
		if(posInfos != null) info = " at " + posInfos.className + "::" + posInfos.methodName + " line " + posInfos.lineNumber + " in file " + posInfos.fileName; else info = "";
		var m;
		if(message.level.get_value() == hex_log_LogLevel._DEBUG.get_value()) m = ($_=window.console,$bind($_,$_.debug)); else if(message.level.get_value() == hex_log_LogLevel._INFO.get_value()) m = ($_=window.console,$bind($_,$_.info)); else if(message.level.get_value() == hex_log_LogLevel._WARN.get_value()) m = ($_=window.console,$bind($_,$_.warn)); else if(message.level.get_value() == hex_log_LogLevel._FATAL.get_value() || message.level.get_value() == hex_log_LogLevel._ERROR.get_value()) m = ($_=window.console,$bind($_,$_.error)); else m = ($_=window.console,$bind($_,$_.log));
		m(message.message,"[" + message.domain.getName() + "]" + info);
	}
	,onClear: function() {
		window.console.clear();
	}
	,__class__: hex_log_layout_JavaScriptConsoleLayout
};
var hex_log_layout_LogLayoutHTMLView = function(proxy,wrapperSelector) {
	if(wrapperSelector == null) wrapperSelector = "body";
	this.consoleWrapperTaget = ".debug-console-list-wrapper";
	this._searchIndex = 0;
	this._searchLength = 0;
	this._levels = new haxe_ds_StringMap();
	this._swipeHorizontalVO = new hex_log_layout_SwipeHorizontalVO();
	this._changePosition = [0,0];
	this._transformPosition = [0,0];
	this._toggleStartPosition = [0,0];
	this._proxy = proxy;
	this._debugWrapperSelector = wrapperSelector;
	this._init();
};
$hxClasses["hex.log.layout.LogLayoutHTMLView"] = hex_log_layout_LogLayoutHTMLView;
hex_log_layout_LogLayoutHTMLView.__name__ = ["hex","log","layout","LogLayoutHTMLView"];
hex_log_layout_LogLayoutHTMLView.prototype = {
	_init: function() {
		this._buildView();
		this._leftArrowButton.addEventListener("click",$bind(this,this._onPreviousSearchButtonClick));
		this._rightArrowButton.addEventListener("click",$bind(this,this._onNextSearchButtonClick));
		this._toggleButton.addEventListener("click",$bind(this,this._toggleDebugConsole));
		this._toggleButton.addEventListener("touchstart",$bind(this,this._onToggleButtonTouchStart));
		this._toggleButton.addEventListener("touchmove",$bind(this,this._onToggleButtonTouchMove));
		this._toggleButton.addEventListener("touchend",$bind(this,this._onToggleButtonTouchEnd));
		this._wrapper.addEventListener("touchstart",$bind(this,this._onWrapperTouchStart));
		this._wrapper.addEventListener("touchmove",$bind(this,this._onWrapperTouchMove));
		this._wrapper.addEventListener("touchend",$bind(this,this._onWrapperTouchEnd));
		this._searchInput.addEventListener("input",$bind(this,this._onSearchStart));
		this._searchInput.addEventListener("keypress",$bind(this,this._onSearchKeyPress));
		this._domainInput.addEventListener("input",$bind(this,this._onSetDomain));
		this._levelSelector.addEventListener("change",$bind(this,this._onChangeLevel));
	}
	,_buildView: function() {
		var document = window.document;
		var container = document.querySelector(this._debugWrapperSelector);
		var debugWrapper = document.createElement("div");
		debugWrapper.style.position = "fixed";
		debugWrapper.innerHTML = hex_log_layout_ConsoleStyle.template;
		container.appendChild(debugWrapper);
		var debugStyle = document.createElement("style");
		debugStyle.innerHTML = hex_log_layout_ConsoleStyle.style;
		container.appendChild(debugStyle);
		this._debugConsole = document.querySelector(".debug-console");
		this._list = document.querySelector(".debug-console-list");
		this._wrapper = document.querySelector(".debug-console-list-wrapper");
		this._toggleButton = document.querySelector(".debug-console-toggle");
		this._leftArrowButton = document.querySelector(".debug-console-control-caret--left");
		this._rightArrowButton = document.querySelector(".debug-console-control-caret--right");
		this._searchInput = document.querySelector(".debug-console-control-item--search input");
		this._domainInput = document.querySelector(".debug-console-control-item--domain input");
		this._levelSelector = document.querySelector(".debug-console-control-item--level select");
		var _g = 0;
		var _g1 = hex_log_LogLevel.get_LEVELS();
		while(_g < _g1.length) {
			var level = _g1[_g];
			++_g;
			var option = document.createElement("option");
			option.innerHTML = level.toString();
			option.value = level.toString();
			var key = level.toString();
			this._levels.set(key,level);
			this._levelSelector.appendChild(option);
		}
		this._toggleButtonRect = this._toggleButton.getBoundingClientRect();
		this._toggleBtnCenter = [this._toggleButtonRect.width / 2,this._toggleButtonRect.height / 2];
	}
	,_buildBehavior: function() {
		this._leftArrowButton.addEventListener("click",$bind(this,this._onPreviousSearchButtonClick));
		this._rightArrowButton.addEventListener("click",$bind(this,this._onNextSearchButtonClick));
		this._toggleButton.addEventListener("click",$bind(this,this._toggleDebugConsole));
		this._toggleButton.addEventListener("touchstart",$bind(this,this._onToggleButtonTouchStart));
		this._toggleButton.addEventListener("touchmove",$bind(this,this._onToggleButtonTouchMove));
		this._toggleButton.addEventListener("touchend",$bind(this,this._onToggleButtonTouchEnd));
		this._wrapper.addEventListener("touchstart",$bind(this,this._onWrapperTouchStart));
		this._wrapper.addEventListener("touchmove",$bind(this,this._onWrapperTouchMove));
		this._wrapper.addEventListener("touchend",$bind(this,this._onWrapperTouchEnd));
		this._searchInput.addEventListener("input",$bind(this,this._onSearchStart));
		this._searchInput.addEventListener("keypress",$bind(this,this._onSearchKeyPress));
		this._domainInput.addEventListener("input",$bind(this,this._onSetDomain));
		this._levelSelector.addEventListener("change",$bind(this,this._onChangeLevel));
	}
	,_onSearchStart: function(e) {
		this._searchIndex = 0;
		this._searchLength = 0;
		if(this._searchInput.value.length < 2) return;
		this._searchLength = this._proxy.searchFor(this._searchInput.value,"<span class=\"highlight-word\">","</span>");
		if(this._searchLength > 0) window.document.getElementById("searchedWord" + this._searchIndex).scrollIntoView();
	}
	,_onSearchKeyPress: function(e) {
		if(e.shiftKey && e.keyCode == 13) this._onPreviousSearchButtonClick(e); else if(e.keyCode == 13) this._onNextSearchButtonClick(e);
	}
	,_onSetDomain: function(e) {
		if(this._levelSelector.value.length < 2) return;
		this._proxy.filter(this._levels.get(this._levelSelector.value),hex_domain_Domain.getDomain(this._domainInput.value));
	}
	,_onChangeLevel: function(e) {
		this._proxy.filter(this._levels.get(this._levelSelector.value),hex_domain_Domain.getDomain(this._domainInput.value));
	}
	,_onToggleButtonTouchStart: function(e) {
		e.preventDefault();
		this._toggleStartPosition = [e.touches[0].pageX,e.touches[0].pageY];
		this._changePosition = this._transformPosition;
		this._tapStartTime = new Date().getTime();
	}
	,_onToggleButtonTouchMove: function(e) {
		e.stopPropagation();
		e.preventDefault();
		var touchList = e.touches[0];
		this._changePosition = [this._transformPosition[0] + touchList.pageX - this._toggleStartPosition[0],this._transformPosition[1] + touchList.pageY - this._toggleStartPosition[1]];
		this._toggleButton.style.transform = "translate(" + this._changePosition[0] + "px, " + this._changePosition[1] + "px)";
	}
	,_onToggleButtonTouchEnd: function(e) {
		this._transformPosition[0] = this._changePosition[0];
		this._transformPosition[1] = this._changePosition[1];
		if((function($this) {
			var $r;
			var a = new Date().getTime() - $this._tapStartTime;
			$r = a < _$UInt_UInt_$Impl_$.toFloat(hex_log_layout_LogLayoutHTMLView.TAP_THRESHOLD);
			return $r;
		}(this))) this._toggleDebugConsole();
	}
	,_onWrapperTouchStart: function(e) {
		var t = e.touches.item(0);
		this._swipeHorizontalVO.startX = t.screenX;
		this._swipeHorizontalVO.startY = t.screenY;
	}
	,_onWrapperTouchMove: function(e) {
		var t = e.touches.item(0);
		this._swipeHorizontalVO.endX = t.screenX;
		this._swipeHorizontalVO.endY = t.screenY;
	}
	,_onWrapperTouchEnd: function(e) {
		if((this._swipeHorizontalVO.endX - hex_log_layout_SwipeHorizontalVO.MIN_X > this._swipeHorizontalVO.startX || this._swipeHorizontalVO.endX + hex_log_layout_SwipeHorizontalVO.MIN_X < this._swipeHorizontalVO.startX) && (this._swipeHorizontalVO.endY < this._swipeHorizontalVO.startY + hex_log_layout_SwipeHorizontalVO.MAX_Y && this._swipeHorizontalVO.startY > this._swipeHorizontalVO.endY - hex_log_layout_SwipeHorizontalVO.MAX_Y && this._swipeHorizontalVO.endX > 0)) {
			if(this._swipeHorizontalVO.endX > this._swipeHorizontalVO.startX) this._onNextSearchButtonClick(e); else this._onPreviousSearchButtonClick(e);
		}
		this._swipeHorizontalVO.startX = this._swipeHorizontalVO.startY = this._swipeHorizontalVO.endX = this._swipeHorizontalVO.endY = 0;
	}
	,_toggleDebugConsole: function() {
		this._debugConsole.classList.toggle("hidden");
	}
	,_onPreviousSearchButtonClick: function(e) {
		e.stopPropagation();
		e.preventDefault();
		if(this._searchLength > 0) {
			this._removeSelectedClass();
			if(this._searchIndex > 0) this._searchIndex = this._searchIndex - 1; else this._searchIndex = this._searchLength - 1;
			this._refreshSelectedItem();
		}
	}
	,_onNextSearchButtonClick: function(e) {
		e.stopPropagation();
		e.preventDefault();
		if(this._searchLength > 0) {
			this._removeSelectedClass();
			if(this._searchIndex < this._searchLength - 1) this._searchIndex = this._searchIndex + 1; else this._searchIndex = 0;
			this._refreshSelectedItem();
		}
	}
	,_removeSelectedClass: function() {
		var item = window.document.getElementById("searchedWord" + this._searchIndex);
		item.parentElement.parentElement.classList.remove("selected");
	}
	,_refreshSelectedItem: function() {
		var item = window.document.getElementById("searchedWord" + this._searchIndex);
		item.scrollIntoView();
		item.parentElement.parentElement.classList.add("selected");
	}
	,__class__: hex_log_layout_LogLayoutHTMLView
};
var hex_log_layout_SwipeHorizontalVO = function() {
	this.endY = 0;
	this.endX = 0;
	this.startY = 0;
	this.startX = 0;
};
$hxClasses["hex.log.layout.SwipeHorizontalVO"] = hex_log_layout_SwipeHorizontalVO;
hex_log_layout_SwipeHorizontalVO.__name__ = ["hex","log","layout","SwipeHorizontalVO"];
hex_log_layout_SwipeHorizontalVO.prototype = {
	__class__: hex_log_layout_SwipeHorizontalVO
};
var hex_log_layout_ConsoleStyle = function() { };
$hxClasses["hex.log.layout.ConsoleStyle"] = hex_log_layout_ConsoleStyle;
hex_log_layout_ConsoleStyle.__name__ = ["hex","log","layout","ConsoleStyle"];
var hex_log_layout_LogProxyLayout = function() {
	this._searchedWord = "";
	this._dispatcher = new hex_log_layout_LogProxyLayoutDispatcher();
	this._messages = [];
	this._filteredLevel = hex_log_LogLevel._ALL;
	this._filteredDomain = hex_log_layout_AllDomain.DOMAIN;
	hex_log_Logger.getInstance().addListener(this);
};
$hxClasses["hex.log.layout.LogProxyLayout"] = hex_log_layout_LogProxyLayout;
hex_log_layout_LogProxyLayout.__name__ = ["hex","log","layout","LogProxyLayout"];
hex_log_layout_LogProxyLayout.__interfaces__ = [hex_log_ILogListener];
hex_log_layout_LogProxyLayout.prototype = {
	onClear: function() {
		this._dispatcher.onClear();
	}
	,onLog: function(message) {
		this._messages.push(message);
		if((this._filteredDomain == hex_log_layout_AllDomain.DOMAIN || this._filteredDomain == message.domain) && (this._filteredLevel == hex_log_LogLevel._ALL || this._filteredLevel == message.level)) this._dispatcher.onLog(message);
	}
	,addListener: function(listener) {
		return this._dispatcher.addListener(listener);
	}
	,removeListener: function(listener) {
		return this._dispatcher.removeListener(listener);
	}
	,filter: function(level,domain) {
		if(level == null) this._filteredLevel = hex_log_LogLevel._ALL; else this._filteredLevel = level;
		if(domain == null) this._filteredDomain = hex_log_layout_AllDomain.DOMAIN; else this._filteredDomain = domain;
		this._dispatcher.onClear();
		this._render();
	}
	,searchFor: function(word,leftSearchSeparator,rightSearchSeparator) {
		if(word == null) word = "";
		this._searchedWord = word;
		this._leftSearchSeparator = leftSearchSeparator;
		this._rightSearchSeparator = rightSearchSeparator;
		this._dispatcher.onClear();
		return this._render();
	}
	,_render: function() {
		var searchLength = 0;
		var _g = 0;
		var _g1 = this._messages;
		while(_g < _g1.length) {
			var message = _g1[_g];
			++_g;
			if((this._filteredDomain == hex_log_layout_AllDomain.DOMAIN || this._filteredDomain == message.domain) && (this._filteredLevel == hex_log_LogLevel._ALL || this._filteredLevel == message.level)) {
				var messageContent = "" + Std.string(message.message);
				if(this._searchedWord.length > 0 && messageContent.indexOf(this._searchedWord) != -1) {
					messageContent = messageContent.split(this._searchedWord).join(this._getLeftSeparator(searchLength,this._leftSearchSeparator) + this._searchedWord + this._rightSearchSeparator);
					searchLength++;
				}
				this._dispatcher.onLog(new hex_log_LoggerMessage(messageContent,message.level,message.domain,message.posInfos));
			}
		}
		return searchLength;
	}
	,_getLeftSeparator: function(index,separator) {
		return separator.split(">").join(" id='searchedWord" + index) + "'>";
	}
	,__class__: hex_log_layout_LogProxyLayout
};
var hex_log_layout_AllDomain = function(domainName) {
	hex_domain_Domain.call(this,domainName);
};
$hxClasses["hex.log.layout.AllDomain"] = hex_log_layout_AllDomain;
hex_log_layout_AllDomain.__name__ = ["hex","log","layout","AllDomain"];
hex_log_layout_AllDomain.__super__ = hex_domain_Domain;
hex_log_layout_AllDomain.prototype = $extend(hex_domain_Domain.prototype,{
	__class__: hex_log_layout_AllDomain
});
var hex_model_IModelDispatcher = function() { };
$hxClasses["hex.model.IModelDispatcher"] = hex_model_IModelDispatcher;
hex_model_IModelDispatcher.__name__ = ["hex","model","IModelDispatcher"];
hex_model_IModelDispatcher.prototype = {
	__class__: hex_model_IModelDispatcher
};
var hex_model_ModelDispatcher = function() {
	this._listeners = [];
};
$hxClasses["hex.model.ModelDispatcher"] = hex_model_ModelDispatcher;
hex_model_ModelDispatcher.__name__ = ["hex","model","ModelDispatcher"];
hex_model_ModelDispatcher.__interfaces__ = [hex_model_IModelDispatcher];
hex_model_ModelDispatcher.prototype = {
	addListener: function(listener) {
		if(HxOverrides.indexOf(this._listeners,listener,0) == -1) {
			this._listeners.push(listener);
			return true;
		} else return false;
	}
	,removeListener: function(listener) {
		var index = HxOverrides.indexOf(this._listeners,listener,0);
		if(index > -1) {
			this._listeners.splice(index,1);
			return true;
		} else return false;
	}
	,__class__: hex_model_ModelDispatcher
};
var hex_log_layout_LogProxyLayoutDispatcher = function() {
	hex_model_ModelDispatcher.call(this);
};
$hxClasses["hex.log.layout.LogProxyLayoutDispatcher"] = hex_log_layout_LogProxyLayoutDispatcher;
hex_log_layout_LogProxyLayoutDispatcher.__name__ = ["hex","log","layout","LogProxyLayoutDispatcher"];
hex_log_layout_LogProxyLayoutDispatcher.__interfaces__ = [hex_log_ILogListener];
hex_log_layout_LogProxyLayoutDispatcher.__super__ = hex_model_ModelDispatcher;
hex_log_layout_LogProxyLayoutDispatcher.prototype = $extend(hex_model_ModelDispatcher.prototype,{
	onClear: function() {
		var _g = 0;
		var _g1 = this._listeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener.onClear();
		}
	}
	,onLog: function(message) {
		var _g = 0;
		var _g1 = this._listeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener.onLog(message);
		}
	}
	,__class__: hex_log_layout_LogProxyLayoutDispatcher
});
var hex_log_layout_SimpleBrowserLayout = function(targetID,leveldisplay,domainDisplay,timeDisplay) {
	if(timeDisplay == null) timeDisplay = true;
	if(domainDisplay == null) domainDisplay = true;
	if(leveldisplay == null) leveldisplay = true;
	if(targetID == null) targetID = "console";
	this._timeDisplay = true;
	this._domainDisplay = true;
	this._levelDisplay = true;
	this._setConsole(targetID);
	this.setDomainDisplay(domainDisplay);
	this.setLevelDisplay(leveldisplay);
	this.setDisplayTime(timeDisplay);
	this._createLevelStyle();
};
$hxClasses["hex.log.layout.SimpleBrowserLayout"] = hex_log_layout_SimpleBrowserLayout;
hex_log_layout_SimpleBrowserLayout.__name__ = ["hex","log","layout","SimpleBrowserLayout"];
hex_log_layout_SimpleBrowserLayout.__interfaces__ = [hex_log_ILogListener];
hex_log_layout_SimpleBrowserLayout.prototype = {
	setLevelDisplay: function(b) {
		this._levelDisplay = b;
	}
	,setDomainDisplay: function(b) {
		this._domainDisplay = b;
	}
	,setDisplayTime: function(b) {
		this._timeDisplay = b;
	}
	,_createLevelStyle: function() {
		this._levelStyle = new haxe_ds_ObjectMap();
		this._levelStyle.set(hex_log_LogLevel._DEBUG,"lightgrey");
		this._levelStyle.set(hex_log_LogLevel._INFO,"green");
		this._levelStyle.set(hex_log_LogLevel._WARN,"yellow");
		this._levelStyle.set(hex_log_LogLevel._ERROR,"orange");
		this._levelStyle.set(hex_log_LogLevel._FATAL,"red");
	}
	,_setConsole: function(targetId) {
		this._console = window.document.querySelector(targetId);
		if(this._console == null) throw new js__$Boot_HaxeError(new hex_error_NullPointerException("Div named '" + targetId + "' was not found in '" + hex_log_Stringifier.stringify(this) + "'",{ fileName : "SimpleBrowserLayout.hx", lineNumber : 67, className : "hex.log.layout.SimpleBrowserLayout", methodName : "_setConsole"}));
		this._console.style.whiteSpace = "pre";
		this._console.style.fontFamily = "Lucida Console";
		this._console.style.fontSize = "11px";
	}
	,onLog: function(loggerMessage) {
		var message = loggerMessage.message;
		var level = loggerMessage.level;
		var domain = loggerMessage.domain;
		var posInfos = loggerMessage.posInfos;
		var leftBracket = this._createElement("[",this._getStyle(level));
		var rightBracket = this._createElement("]",this._getStyle(level));
		var time = this._createElement(this._getTime(),this._getStyle(level));
		var levelName = this._createElement(level.toString(),this._getStyle(level) + "+bold");
		var domainName;
		if(domain != null && domain.getName() != null) domainName = "@" + domain.getName(); else domainName = "";
		var domain1 = this._createElement(domainName,this._getStyle(level));
		var message1 = this._createElement("\t\t" + Std.string(message),this._getStyle(level));
		var info = this._createElement(posInfos != null?" at " + posInfos.className + "::" + posInfos.methodName + " line " + posInfos.lineNumber + " in file " + posInfos.fileName:"",this._getStyle(level));
		this._log(this._getEncapsulateElements([leftBracket,levelName,domain1,rightBracket,message1,info]));
	}
	,onClear: function() {
		this._console.innerHTML = "";
	}
	,_getTime: function() {
		return "" + new Date().getTime();
	}
	,_getStyle: function(level) {
		return this._levelStyle.h[level.__id__];
	}
	,_log: function(element) {
		element.style.marginLeft = "10px";
		element.appendChild(window.document.createTextNode("\n"));
		this._console.appendChild(element);
		this._console.scrollTop = this._console.scrollHeight;
	}
	,_createElement: function(message,color) {
		var span;
		var _this = window.document;
		span = _this.createElement("span");
		span.innerHTML = message;
		if(color != null) this._setAttributes(span,color);
		return span;
	}
	,_getEncapsulateElements: function(elementList) {
		var container;
		var _this = window.document;
		container = _this.createElement("span");
		var _g = 0;
		while(_g < elementList.length) {
			var element = elementList[_g];
			++_g;
			container.appendChild(element);
		}
		return container;
	}
	,_setAttributes: function(element,color) {
		var colorAttributes = color.split("+");
		var _g = 0;
		while(_g < colorAttributes.length) {
			var attr = colorAttributes[_g];
			++_g;
			this._setAttribute(element,attr);
		}
	}
	,_setAttribute: function(element,attr) {
		switch(attr) {
		case "bold":
			element.style.fontWeight = "bold";
			break;
		case "red":
			element.style.color = "#e62323";
			break;
		case "orange":
			element.style.color = "#FF8000";
			break;
		case "yellow":
			element.style.color = "#ffcf18";
			break;
		case "lightgrey":
			element.style.color = "#d9d9d9";
			break;
		case "green":
			element.style.color = "#27fe11";
			break;
		}
	}
	,__class__: hex_log_layout_SimpleBrowserLayout
};
var hex_metadata_IAnnotationProvider = function() { };
$hxClasses["hex.metadata.IAnnotationProvider"] = hex_metadata_IAnnotationProvider;
hex_metadata_IAnnotationProvider.__name__ = ["hex","metadata","IAnnotationProvider"];
hex_metadata_IAnnotationProvider.prototype = {
	__class__: hex_metadata_IAnnotationProvider
};
var hex_metadata_AnnotationProvider = function() {
	this._metadata = new haxe_ds_StringMap();
	this._instances = new haxe_ds_StringMap();
};
$hxClasses["hex.metadata.AnnotationProvider"] = hex_metadata_AnnotationProvider;
hex_metadata_AnnotationProvider.__name__ = ["hex","metadata","AnnotationProvider"];
hex_metadata_AnnotationProvider.__interfaces__ = [hex_metadata_IAnnotationProvider];
hex_metadata_AnnotationProvider.registerToDomain = function(annotationProvider,domain) {
	if(hex_metadata_AnnotationProvider._Domains.h.__keys__[domain.__id__] != null) return false; else {
		hex_metadata_AnnotationProvider._Domains.set(domain,annotationProvider);
		return true;
	}
};
hex_metadata_AnnotationProvider.getAnnotationProvider = function(domain) {
	if(hex_metadata_AnnotationProvider._Domains.h.__keys__[domain.__id__] != null) return hex_metadata_AnnotationProvider._Domains.h[domain.__id__]; else return hex_metadata_AnnotationProvider._Instance;
};
hex_metadata_AnnotationProvider.prototype = {
	registerMetaData: function(metaDataName,scope,providerMethod) {
		if(!this._metadata.exists(metaDataName)) {
			var providerHandler = new hex_metadata__$AnnotationProvider_ProviderHandler(scope,providerMethod);
			this._metadata.set(metaDataName,providerHandler);
			var voCollection = this._instances.get(metaDataName);
			if(voCollection != null) {
				var _g = 0;
				while(_g < voCollection.length) {
					var vo = voCollection[_g];
					++_g;
					if(vo.metaDataName == metaDataName) Reflect.setProperty(vo.owner,vo.propertyName,providerHandler.call(vo.metaDataValue));
				}
			}
		} else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("registerMetaData failed. '" + metaDataName + "' is already registered in '" + hex_log_Stringifier.stringify(this) + "'",{ fileName : "AnnotationProvider.hx", lineNumber : 72, className : "hex.metadata.AnnotationProvider", methodName : "registerMetaData"}));
	}
	,clear: function() {
		this._metadata = new haxe_ds_StringMap();
		this._instances = new haxe_ds_StringMap();
	}
	,parse: function(instance) {
		var classMetaDataVO = this._parse(instance);
		if(classMetaDataVO != null) {
			var properties = classMetaDataVO.properties;
			var _g = 0;
			while(_g < properties.length) {
				var property = properties[_g];
				++_g;
				var metaDataName = property.metaDataName;
				if(this._metadata.exists(metaDataName)) {
					var providerHandler = this._metadata.get(metaDataName);
					Reflect.setProperty(instance,property.propertyName,providerHandler.call(property.metaDataValue));
				} else {
					var instanceVO = new hex_metadata__$AnnotationProvider_InstanceVO(instance,property.propertyName,property.metaDataName,property.metaDataValue);
					if(this._instances.exists(metaDataName)) this._instances.get(metaDataName).push(instanceVO); else this._instances.set(metaDataName,[instanceVO]);
				}
			}
		}
	}
	,_parse: function(object) {
		var classMetaDataVO = null;
		var classReference;
		if(object == null) classReference = null; else classReference = js_Boot.getClass(object);
		if(classReference != null) {
			if(hex_metadata_AnnotationProvider._META_DATA.containsKey(classReference)) classMetaDataVO = hex_metadata_AnnotationProvider._META_DATA.get(classReference); else {
				classMetaDataVO = new hex_metadata__$AnnotationProvider_ClassMetaDataVO();
				var properties = classMetaDataVO.properties;
				var metadata = haxe_rtti_Meta.getFields(classReference);
				var fields = Reflect.fields(metadata);
				var _g = 0;
				while(_g < fields.length) {
					var propertyName = fields[_g];
					++_g;
					var o = Reflect.field(metadata,propertyName);
					var f = Reflect.fields(o);
					if(f != null) {
						var metaDataName = f[0];
						if(metaDataName != null) {
							var field = Reflect.field(o,metaDataName);
							if(field != null) {
								var metaDataValue = field[0];
								properties.push(new hex_metadata__$AnnotationProvider_PropertyMetaDataVO(propertyName,metaDataName,metaDataValue));
							}
						}
					}
				}
				hex_metadata_AnnotationProvider._META_DATA.put(classReference,classMetaDataVO);
			}
		}
		return classMetaDataVO;
	}
	,registerInjector: function(injector) {
		injector.addEventListener("onPreConstruct",$bind(this,this._onPostconstruct));
	}
	,unregisterInjector: function(injector) {
		injector.removeEventListener("onPreConstruct",$bind(this,this._onPostconstruct));
	}
	,_onPostconstruct: function(event) {
		if(js_Boot.__instanceof(event.instance,hex_core_IAnnotationParsable)) this.parse(event.instance);
	}
	,__class__: hex_metadata_AnnotationProvider
};
var hex_metadata__$AnnotationProvider_ProviderHandler = function(scope,callback) {
	this.scope = scope;
	this.callback = callback;
};
$hxClasses["hex.metadata._AnnotationProvider.ProviderHandler"] = hex_metadata__$AnnotationProvider_ProviderHandler;
hex_metadata__$AnnotationProvider_ProviderHandler.__name__ = ["hex","metadata","_AnnotationProvider","ProviderHandler"];
hex_metadata__$AnnotationProvider_ProviderHandler.prototype = {
	call: function(metaDataValue) {
		return this.callback.apply(this.scope,[metaDataValue]);
	}
	,__class__: hex_metadata__$AnnotationProvider_ProviderHandler
};
var hex_metadata__$AnnotationProvider_ClassMetaDataVO = function() {
	this.properties = [];
};
$hxClasses["hex.metadata._AnnotationProvider.ClassMetaDataVO"] = hex_metadata__$AnnotationProvider_ClassMetaDataVO;
hex_metadata__$AnnotationProvider_ClassMetaDataVO.__name__ = ["hex","metadata","_AnnotationProvider","ClassMetaDataVO"];
hex_metadata__$AnnotationProvider_ClassMetaDataVO.prototype = {
	__class__: hex_metadata__$AnnotationProvider_ClassMetaDataVO
};
var hex_metadata__$AnnotationProvider_PropertyMetaDataVO = function(propertyName,metaDataName,metaDataValue) {
	this.propertyName = propertyName;
	this.metaDataName = metaDataName;
	this.metaDataValue = metaDataValue;
};
$hxClasses["hex.metadata._AnnotationProvider.PropertyMetaDataVO"] = hex_metadata__$AnnotationProvider_PropertyMetaDataVO;
hex_metadata__$AnnotationProvider_PropertyMetaDataVO.__name__ = ["hex","metadata","_AnnotationProvider","PropertyMetaDataVO"];
hex_metadata__$AnnotationProvider_PropertyMetaDataVO.prototype = {
	__class__: hex_metadata__$AnnotationProvider_PropertyMetaDataVO
};
var hex_metadata__$AnnotationProvider_InstanceVO = function(owner,propertyName,metaDataName,metaDataValue) {
	this.owner = owner;
	this.propertyName = propertyName;
	this.metaDataName = metaDataName;
	this.metaDataValue = metaDataValue;
};
$hxClasses["hex.metadata._AnnotationProvider.InstanceVO"] = hex_metadata__$AnnotationProvider_InstanceVO;
hex_metadata__$AnnotationProvider_InstanceVO.__name__ = ["hex","metadata","_AnnotationProvider","InstanceVO"];
hex_metadata__$AnnotationProvider_InstanceVO.prototype = {
	__class__: hex_metadata__$AnnotationProvider_InstanceVO
};
var hex_model_IModelListener = function() { };
$hxClasses["hex.model.IModelListener"] = hex_model_IModelListener;
hex_model_IModelListener.__name__ = ["hex","model","IModelListener"];
var hex_model_IModelRO = function() { };
$hxClasses["hex.model.IModelRO"] = hex_model_IModelRO;
hex_model_IModelRO.__name__ = ["hex","model","IModelRO"];
hex_model_IModelRO.prototype = {
	__class__: hex_model_IModelRO
};
var hex_model_Model = function() {
};
$hxClasses["hex.model.Model"] = hex_model_Model;
hex_model_Model.__name__ = ["hex","model","Model"];
hex_model_Model.__interfaces__ = [hex_model_IModelRO];
hex_model_Model.prototype = {
	addListener: function(listener) {
		this.dispatcher.addListener(listener);
	}
	,removeListener: function(listener) {
		this.dispatcher.removeListener(listener);
	}
	,__class__: hex_model_Model
};
var hex_module_IModule = function() { };
$hxClasses["hex.module.IModule"] = hex_module_IModule;
hex_module_IModule.__name__ = ["hex","module","IModule"];
hex_module_IModule.__interfaces__ = [hex_di_IContextOwner];
hex_module_IModule.prototype = {
	__class__: hex_module_IModule
	,__properties__: {get_isReleased:"get_isReleased",get_isInitialized:"get_isInitialized"}
};
var hex_module_Module = function() {
	this._injector = new hex_di_Injector();
	this._injector.mapToValue(hex_di_IBasicInjector,this._injector);
	this._injector.mapToValue(hex_di_IDependencyInjector,this._injector);
	this._domainDispatcher = hex_domain_ApplicationDomainDispatcher.getInstance().getDomainDispatcher(this.getDomain());
	this._annotationProvider = hex_metadata_AnnotationProvider.getAnnotationProvider(this.getDomain());
	this._annotationProvider.registerInjector(this._injector);
	this._internalDispatcher = new hex_event_Dispatcher();
	this._injector.mapToValue(hex_control_IFrontController,new hex_control_FrontController(this._internalDispatcher,this._injector,this));
	this._injector.mapToValue(hex_event_IDispatcher,this._internalDispatcher);
	this._injector.mapToType(hex_control_macro_IMacroExecutor,hex_control_macro_MacroExecutor);
	this._injector.mapToValue(hex_module_IModule,this);
	this._logger = new hex_log_DomainLogger(this.getDomain());
};
$hxClasses["hex.module.Module"] = hex_module_Module;
hex_module_Module.__name__ = ["hex","module","Module"];
hex_module_Module.__interfaces__ = [hex_module_IModule];
hex_module_Module.prototype = {
	initialize: function() {
		if(!this.get_isInitialized()) {
			this._onInitialisation();
			this._checkRuntimeDependencies(this._getRuntimeDependencies());
			this.isInitialized = true;
			this._fireInitialisationEvent();
		} else throw new js__$Boot_HaxeError(new hex_error_IllegalStateException(Std.string(this) + ".initialize can't be called more than once. Check your code.",{ fileName : "Module.hx", lineNumber : 78, className : "hex.module.Module", methodName : "initialize"}));
	}
	,get_isInitialized: function() {
		return this.isInitialized;
	}
	,get_isReleased: function() {
		return this.isReleased;
	}
	,getDomain: function() {
		return hex_domain_DomainExpert.getInstance().getDomainFor(this);
	}
	,dispatchPublicMessage: function(messageType,data) {
		if(this._domainDispatcher != null) this._domainDispatcher.dispatch(messageType,data); else throw new js__$Boot_HaxeError(new hex_error_IllegalStateException("Domain dispatcher is null. Try to use 'Module.registerInternalDomain' before calling super constructor to fix the problem",{ fileName : "Module.hx", lineNumber : 125, className : "hex.module.Module", methodName : "dispatchPublicMessage"}));
	}
	,addHandler: function(messageType,scope,callback) {
		if(this._domainDispatcher != null) this._domainDispatcher.addHandler(messageType,scope,callback); else throw new js__$Boot_HaxeError(new hex_error_IllegalStateException("Domain dispatcher is null. Try to use 'Module.registerInternalDomain' before calling super constructor to fix the problem",{ fileName : "Module.hx", lineNumber : 140, className : "hex.module.Module", methodName : "addHandler"}));
	}
	,removeHandler: function(messageType,scope,callback) {
		if(this._domainDispatcher != null) this._domainDispatcher.removeHandler(messageType,scope,callback); else throw new js__$Boot_HaxeError(new hex_error_IllegalStateException("Domain dispatcher is null. Try to use 'Module.registerInternalDomain' before calling super constructor to fix the problem",{ fileName : "Module.hx", lineNumber : 155, className : "hex.module.Module", methodName : "removeHandler"}));
	}
	,_dispatchPrivateMessage: function(messageType,data) {
		this._internalDispatcher.dispatch(messageType,data);
	}
	,buildViewHelper: function(type,view) {
		return hex_view_viewhelper_ViewHelperManager.getInstance(this).buildViewHelper(this._injector,type,view);
	}
	,release: function() {
		if(!this.get_isReleased()) {
			this.isReleased = true;
			this._onRelease();
			this._fireReleaseEvent();
			hex_view_viewhelper_ViewHelperManager.release(this);
			if(this._domainDispatcher != null) this._domainDispatcher.removeAllListeners();
			this._internalDispatcher.removeAllListeners();
			hex_domain_DomainExpert.getInstance().releaseDomain(this);
			this._annotationProvider.unregisterInjector(this._injector);
			this._injector.destroyInstance(this);
			this._injector.teardown();
			this._logger = null;
		} else throw new js__$Boot_HaxeError(new hex_error_IllegalStateException(Std.string(this) + ".release can't be called more than once. Check your code.",{ fileName : "Module.hx", lineNumber : 199, className : "hex.module.Module", methodName : "release"}));
	}
	,getBasicInjector: function() {
		return this._injector;
	}
	,getLogger: function() {
		return this._logger;
	}
	,_fireInitialisationEvent: function() {
		if(this.get_isInitialized()) this.dispatchPublicMessage(hex_module_ModuleMessage.INITIALIZED,[this]); else throw new js__$Boot_HaxeError(new hex_error_IllegalStateException(Std.string(this) + ".fireModuleInitialisationNote can't be called with previous initialize call.",{ fileName : "Module.hx", lineNumber : 225, className : "hex.module.Module", methodName : "_fireInitialisationEvent"}));
	}
	,_fireReleaseEvent: function() {
		if(this.get_isReleased()) this.dispatchPublicMessage(hex_module_ModuleMessage.RELEASED,[this]); else throw new js__$Boot_HaxeError(new hex_error_IllegalStateException(Std.string(this) + ".fireModuleReleaseNote can't be called with previous release call.",{ fileName : "Module.hx", lineNumber : 241, className : "hex.module.Module", methodName : "_fireReleaseEvent"}));
	}
	,_onInitialisation: function() {
	}
	,_onRelease: function() {
	}
	,_getDependencyInjector: function() {
		return this._injector;
	}
	,_getRuntimeDependencies: function() {
		throw new js__$Boot_HaxeError(new hex_error_VirtualMethodException(hex_log_Stringifier.stringify(this) + ".checkDependencies is not implemented",{ fileName : "Module.hx", lineNumber : 277, className : "hex.module.Module", methodName : "_getRuntimeDependencies"}));
	}
	,_checkRuntimeDependencies: function(dependencies) {
		hex_module_dependency_RuntimeDependencyChecker.check(this,this._injector,dependencies);
	}
	,_addStatelessConfigClasses: function(configurations) {
		var _g = 0;
		while(_g < configurations.length) {
			var configurationClass = configurations[_g];
			++_g;
			var config = this._injector.instantiateUnmapped(configurationClass);
			config.configure();
		}
	}
	,_addStatefulConfigs: function(configurations) {
		var _g = 0;
		while(_g < configurations.length) {
			var configuration = configurations[_g];
			++_g;
			configuration.configure(this._injector,this._internalDispatcher,this);
		}
	}
	,__class__: hex_module_Module
	,__properties__: {get_isReleased:"get_isReleased",get_isInitialized:"get_isInitialized"}
};
var hex_module_ModuleMessage = function() {
};
$hxClasses["hex.module.ModuleMessage"] = hex_module_ModuleMessage;
hex_module_ModuleMessage.__name__ = ["hex","module","ModuleMessage"];
hex_module_ModuleMessage.prototype = {
	__class__: hex_module_ModuleMessage
};
var hex_module_dependency_IRuntimeDependencies = function() { };
$hxClasses["hex.module.dependency.IRuntimeDependencies"] = hex_module_dependency_IRuntimeDependencies;
hex_module_dependency_IRuntimeDependencies.__name__ = ["hex","module","dependency","IRuntimeDependencies"];
hex_module_dependency_IRuntimeDependencies.prototype = {
	__class__: hex_module_dependency_IRuntimeDependencies
};
var hex_module_dependency_RuntimeDependencies = function() {
};
$hxClasses["hex.module.dependency.RuntimeDependencies"] = hex_module_dependency_RuntimeDependencies;
hex_module_dependency_RuntimeDependencies.__name__ = ["hex","module","dependency","RuntimeDependencies"];
hex_module_dependency_RuntimeDependencies.__interfaces__ = [hex_module_dependency_IRuntimeDependencies];
hex_module_dependency_RuntimeDependencies.prototype = {
	addServiceDependencies: function(serviceDependencies) {
		if(this._serviceDependencies == null) this._serviceDependencies = [];
		this._serviceDependencies = this._serviceDependencies.concat(serviceDependencies);
	}
	,getServiceDependencies: function() {
		return this._serviceDependencies;
	}
	,hasServiceDependencies: function() {
		return this._serviceDependencies != null;
	}
	,__class__: hex_module_dependency_RuntimeDependencies
};
var hex_module_dependency_RuntimeDependencyChecker = function() {
	throw new js__$Boot_HaxeError(new hex_error_PrivateConstructorException("'RuntimeDependecyChecker' class can't be instantiated.",{ fileName : "RuntimeDependencyChecker.hx", lineNumber : 17, className : "hex.module.dependency.RuntimeDependencyChecker", methodName : "new"}));
};
$hxClasses["hex.module.dependency.RuntimeDependencyChecker"] = hex_module_dependency_RuntimeDependencyChecker;
hex_module_dependency_RuntimeDependencyChecker.__name__ = ["hex","module","dependency","RuntimeDependencyChecker"];
hex_module_dependency_RuntimeDependencyChecker.check = function(module,injector,dependencies) {
	if(dependencies.hasServiceDependencies()) {
		var serviceDependencies = dependencies.getServiceDependencies();
		var _g = 0;
		while(_g < serviceDependencies.length) {
			var dependency = serviceDependencies[_g];
			++_g;
			if(!injector.hasMapping(dependency)) throw new js__$Boot_HaxeError(new hex_module_dependency_RuntimeDependencyException("'" + Std.string(dependency) + "' class dependency is not available during '" + hex_log_Stringifier.stringify(module) + "' initialisation.",{ fileName : "RuntimeDependencyChecker.hx", lineNumber : 30, className : "hex.module.dependency.RuntimeDependencyChecker", methodName : "check"}));
		}
	}
};
hex_module_dependency_RuntimeDependencyChecker.prototype = {
	__class__: hex_module_dependency_RuntimeDependencyChecker
};
var hex_module_dependency_RuntimeDependencyException = function(message,posInfos) {
	hex_error_Exception.call(this,message,posInfos);
};
$hxClasses["hex.module.dependency.RuntimeDependencyException"] = hex_module_dependency_RuntimeDependencyException;
hex_module_dependency_RuntimeDependencyException.__name__ = ["hex","module","dependency","RuntimeDependencyException"];
hex_module_dependency_RuntimeDependencyException.__super__ = hex_error_Exception;
hex_module_dependency_RuntimeDependencyException.prototype = $extend(hex_error_Exception.prototype,{
	__class__: hex_module_dependency_RuntimeDependencyException
});
var hex_service_IService = function() { };
$hxClasses["hex.service.IService"] = hex_service_IService;
hex_service_IService.__name__ = ["hex","service","IService"];
hex_service_IService.prototype = {
	__class__: hex_service_IService
};
var hex_service_ServiceConfiguration = function(timeout) {
	if(timeout == null) timeout = 5000;
	this.serviceTimeout = timeout;
};
$hxClasses["hex.service.ServiceConfiguration"] = hex_service_ServiceConfiguration;
hex_service_ServiceConfiguration.__name__ = ["hex","service","ServiceConfiguration"];
hex_service_ServiceConfiguration.prototype = {
	__class__: hex_service_ServiceConfiguration
};
var hex_service_stateful_IStatefulService = function() { };
$hxClasses["hex.service.stateful.IStatefulService"] = hex_service_stateful_IStatefulService;
hex_service_stateful_IStatefulService.__name__ = ["hex","service","stateful","IStatefulService"];
hex_service_stateful_IStatefulService.__interfaces__ = [hex_service_IService];
hex_service_stateful_IStatefulService.prototype = {
	__class__: hex_service_stateful_IStatefulService
};
var hex_state_State = function(stateName) {
	this._exitHandlers = [];
	this._enterHandlers = [];
	this._exitCommandMappings = [];
	this._enterCommandMappings = [];
	this._transitions = new hex_collection_HashMap();
	this._stateName = stateName;
};
$hxClasses["hex.state.State"] = hex_state_State;
hex_state_State.__name__ = ["hex","state","State"];
hex_state_State.prototype = {
	clearEnterHandler: function() {
		this._enterHandlers = [];
	}
	,clearExitHandler: function() {
		this._exitHandlers = [];
	}
	,getEnterHandlerList: function() {
		return this._enterHandlers;
	}
	,getExitHandlerList: function() {
		return this._exitHandlers;
	}
	,addEnterHandler: function(scope,callback) {
		return this._addHandler(this._enterHandlers,new hex_event_BasicHandler(scope,callback));
	}
	,addExitHandler: function(scope,callback) {
		return this._addHandler(this._exitHandlers,new hex_event_BasicHandler(scope,callback));
	}
	,removeEnterHandler: function(handler) {
		return this._removeHandler(this._enterHandlers,handler);
	}
	,removeExitHandler: function(handler) {
		return this._removeHandler(this._exitHandlers,handler);
	}
	,addEnterCommandMapping: function(mapping) {
		if(HxOverrides.indexOf(this._enterCommandMappings,mapping,0) == -1) this._enterCommandMappings.push(mapping);
	}
	,addExitCommandMapping: function(mapping) {
		if(HxOverrides.indexOf(this._exitCommandMappings,mapping,0) == -1) this._exitCommandMappings.push(mapping);
	}
	,removeEnterCommandMapping: function(mapping) {
		var i = HxOverrides.indexOf(this._enterCommandMappings,mapping,0);
		if(i != -1) this._enterCommandMappings.splice(i,1);
	}
	,removeExitCommandMapping: function(mapping) {
		var i = HxOverrides.indexOf(this._exitCommandMappings,mapping,0);
		if(i != -1) this._exitCommandMappings.splice(i,1);
	}
	,addEnterCommand: function(commandClass,contextOwner) {
		var mapping = new hex_control_command_CommandMapping(commandClass);
		mapping.setContextOwner(contextOwner);
		this._enterCommandMappings.push(mapping);
		return mapping;
	}
	,addExitCommand: function(commandClass,contextOwner) {
		var mapping = new hex_control_command_CommandMapping(commandClass);
		mapping.setContextOwner(contextOwner);
		this._exitCommandMappings.push(mapping);
		return mapping;
	}
	,addTransition: function(messageType,targetState) {
		this._transitions.put(messageType,new hex_state_Transition(this,messageType,targetState));
	}
	,getMachine: function() {
		return this._stateMachine;
	}
	,getEvents: function() {
		var transitions = this._transitions.getValues();
		var result = [];
		var _g = 0;
		while(_g < transitions.length) {
			var transition = transitions[_g];
			++_g;
			result[result.length] = transition.getMessageType();
		}
		return result;
	}
	,getAllTargets: function() {
		var transitions = this._transitions.getValues();
		var result = [];
		var _g = 0;
		while(_g < transitions.length) {
			var transition = transitions[_g];
			++_g;
			result.push(transition.getTarget());
		}
		return result;
	}
	,getTransitions: function() {
		return this._transitions.getValues();
	}
	,hasTransition: function(messageType) {
		return this._transitions.containsKey(messageType);
	}
	,targetState: function(messageType) {
		return this._transitions.get(messageType).getTarget();
	}
	,getEnterCommandMapping: function() {
		return this._enterCommandMappings;
	}
	,getExitCommandMapping: function() {
		return this._exitCommandMappings;
	}
	,toString: function() {
		return hex_log_Stringifier.stringify(this) + "::" + this._stateName;
	}
	,_addHandler: function(handlers,handler) {
		if(HxOverrides.indexOf(handlers,handler,0) == -1) {
			handlers.push(handler);
			return true;
		} else return false;
	}
	,_removeHandler: function(handlers,handler) {
		var id = HxOverrides.indexOf(handlers,handler,0);
		if(id != -1) {
			handlers.splice(id,1);
			return true;
		} else return false;
	}
	,__class__: hex_state_State
};
var hex_state_StateMachine = function(start) {
	this._start = start;
};
$hxClasses["hex.state.StateMachine"] = hex_state_StateMachine;
hex_state_StateMachine.__name__ = ["hex","state","StateMachine"];
hex_state_StateMachine.prototype = {
	addResetMessageType: function(messageTypes) {
		var _g = 0;
		while(_g < messageTypes.length) {
			var messageType = messageTypes[_g];
			++_g;
			if(messageType != null) this._addResetMessageType_byAddingTransition(messageType);
		}
	}
	,_addResetMessageType_byAddingTransition: function(messageType) {
		var states = this.getStates();
		var _g = 0;
		while(_g < states.length) {
			var state = states[_g];
			++_g;
			if(state.hasTransition(messageType)) state.addTransition(messageType,this._start);
		}
	}
	,getStates: function() {
		var result = [];
		this._collectStates(result,this._start);
		return result;
	}
	,_collectStates: function(result,state) {
		if(this._start == null || HxOverrides.indexOf(result,state,0) != -1) return; else {
			result.push(state);
			var targets = state.getAllTargets();
			var _g = 0;
			while(_g < targets.length) {
				var target = targets[_g];
				++_g;
				this._collectStates(result,target);
			}
		}
	}
	,getStart: function() {
		return this._start;
	}
	,isResetMessageType: function(messageType) {
		var states = this.getStates();
		var _g = 0;
		while(_g < states.length) {
			var state = states[_g];
			++_g;
			if(state.hasTransition(messageType) && state.targetState(messageType) == this._start) return true;
		}
		return false;
	}
	,__class__: hex_state_StateMachine
};
var hex_state_Transition = function(source,messageType,target) {
	this._source = source;
	this._target = target;
	this._messageType = messageType;
};
$hxClasses["hex.state.Transition"] = hex_state_Transition;
hex_state_Transition.__name__ = ["hex","state","Transition"];
hex_state_Transition.prototype = {
	getSource: function() {
		return this._source;
	}
	,getTarget: function() {
		return this._target;
	}
	,getMessageType: function() {
		return this._messageType;
	}
	,__class__: hex_state_Transition
};
var hex_state_control_StateChangeMacro = function() {
	hex_control_macro_Macro.call(this);
};
$hxClasses["hex.state.control.StateChangeMacro"] = hex_state_control_StateChangeMacro;
hex_state_control_StateChangeMacro.__name__ = ["hex","state","control","StateChangeMacro"];
hex_state_control_StateChangeMacro.__super__ = hex_control_macro_Macro;
hex_state_control_StateChangeMacro.prototype = $extend(hex_control_macro_Macro.prototype,{
	_prepare: function() {
	}
	,__class__: hex_state_control_StateChangeMacro
});
var hex_state_control_StateController = function(injector,stateMachine) {
	this._injector = injector;
	this._stateMachine = stateMachine;
	this._currentState = this._stateMachine.getStart();
	this._isInTransition = false;
};
$hxClasses["hex.state.control.StateController"] = hex_state_control_StateController;
hex_state_control_StateController.__name__ = ["hex","state","control","StateController"];
hex_state_control_StateController.prototype = {
	transitionTo: function(target,request) {
		if(this._isInTransition) {
		} else {
			this._isInTransition = true;
			if(request != null) this._request = request;
			this._targetedState = target;
			this._dispatchStateChange(this._currentState,this._currentState.getExitHandlerList());
			this._triggerCommand(this._currentState.getExitCommandMapping(),$bind(this,this._onExitCurrentState));
		}
	}
	,_triggerCommand: function(mappings,callback) {
		if(mappings.length > 0) {
			var sm = this._injector.instantiateUnmapped(hex_state_control_StateChangeMacro);
			var mappingToRemove = [];
			var _g = 0;
			while(_g < mappings.length) {
				var mapping = mappings[_g];
				++_g;
				if(mapping.get_isFiredOnce()) mappingToRemove.push(mapping);
				sm.addMapping(mapping);
			}
			var _g1 = 0;
			while(_g1 < mappingToRemove.length) {
				var mapping1 = mappingToRemove[_g1];
				++_g1;
				mappings.splice(HxOverrides.indexOf(mappings,mapping1,0),1);
			}
			sm.addCompleteHandler(this,callback);
			sm.addFailHandler(this,callback);
			sm.addCancelHandler(this,callback);
			sm.preExecute();
			sm.execute(this._request);
		} else callback(null);
	}
	,handleMessage: function(messageType,request) {
		if(this._currentState.hasTransition(messageType)) this.transitionTo(this._currentState.targetState(messageType),request); else if(this._stateMachine.isResetMessageType(messageType)) this.transitionTo(this._stateMachine.getStart(),request);
	}
	,getCurrentState: function() {
		return this._currentState;
	}
	,getTargetedState: function() {
		return this._targetedState;
	}
	,_onExitCurrentState: function(cmd) {
		this._triggerCommand(this._targetedState.getEnterCommandMapping(),$bind(this,this._onEnterTargetState));
	}
	,_onEnterTargetState: function(cmd) {
		if(this._request != null) this._request = null;
		this._currentState = this._targetedState;
		this._isInTransition = false;
		this._dispatchStateChange(this._currentState,this._currentState.getEnterHandlerList());
	}
	,_dispatchStateChange: function(state,handlers) {
		var _g = 0;
		while(_g < handlers.length) {
			var handler = handlers[_g];
			++_g;
			Reflect.callMethod(handler.scope,handler.callback,[state]);
		}
	}
	,__class__: hex_state_control_StateController
};
var hex_util_ClassUtil = function() {
	throw new js__$Boot_HaxeError(new hex_error_PrivateConstructorException("'" + hex_log_Stringifier.stringify(this) + "' class can't be instantiated.",{ fileName : "ClassUtil.hx", lineNumber : 15, className : "hex.util.ClassUtil", methodName : "new"}));
};
$hxClasses["hex.util.ClassUtil"] = hex_util_ClassUtil;
hex_util_ClassUtil.__name__ = ["hex","util","ClassUtil"];
hex_util_ClassUtil.getInheritanceChain = function(clazz) {
	var inherintanceChain = [clazz];
	while((clazz = Type.getSuperClass(clazz)) != null) inherintanceChain.push(clazz);
	return inherintanceChain;
};
hex_util_ClassUtil.getInheritanceChainFrom = function(instance) {
	var type = Type.getClass(instance);
	if(type != null) return hex_util_ClassUtil.getInheritanceChain(type); else return [];
};
hex_util_ClassUtil.classExtendsOrImplements = function(classOrClassName,superClass) {
	var actualClass = null;
	if(js_Boot.__instanceof(classOrClassName,Class)) actualClass = js_Boot.__cast(classOrClassName , Class); else if(typeof(classOrClassName) == "string") try {
		actualClass = Type.resolveClass(js_Boot.__cast(classOrClassName , String));
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		throw new js__$Boot_HaxeError("The class name " + Std.string(classOrClassName) + " is not valid because of " + Std.string(e) + "\n" + Std.string(e.getStackTrace()));
	}
	if(actualClass == null) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("The parameter classOrClassName must be a Class or fully qualified class name.",{ fileName : "ClassUtil.hx", lineNumber : 56, className : "hex.util.ClassUtil", methodName : "classExtendsOrImplements"}));
	var classInstance = Type.createEmptyInstance(actualClass);
	return js_Boot.__instanceof(classInstance,superClass);
};
hex_util_ClassUtil.prototype = {
	__class__: hex_util_ClassUtil
};
var hex_view_IView = function() { };
$hxClasses["hex.view.IView"] = hex_view_IView;
hex_view_IView.__name__ = ["hex","view","IView"];
hex_view_IView.prototype = {
	__class__: hex_view_IView
	,__properties__: {set_visible:"set_visible",get_visible:"get_visible"}
};
var hex_view_viewhelper_IMainViewHelperManagerListener = function() { };
$hxClasses["hex.view.viewhelper.IMainViewHelperManagerListener"] = hex_view_viewhelper_IMainViewHelperManagerListener;
hex_view_viewhelper_IMainViewHelperManagerListener.__name__ = ["hex","view","viewhelper","IMainViewHelperManagerListener"];
hex_view_viewhelper_IMainViewHelperManagerListener.prototype = {
	__class__: hex_view_viewhelper_IMainViewHelperManagerListener
};
var hex_view_viewhelper_IViewHelper = function() { };
$hxClasses["hex.view.viewhelper.IViewHelper"] = hex_view_viewhelper_IViewHelper;
hex_view_viewhelper_IViewHelper.__name__ = ["hex","view","viewhelper","IViewHelper"];
hex_view_viewhelper_IViewHelper.prototype = {
	__class__: hex_view_viewhelper_IViewHelper
	,__properties__: {set_visible:"set_visible",get_visible:"get_visible",set_view:"set_view",get_view:"get_view"}
};
var hex_view_viewhelper_IViewHelperManagerListener = function() { };
$hxClasses["hex.view.viewhelper.IViewHelperManagerListener"] = hex_view_viewhelper_IViewHelperManagerListener;
hex_view_viewhelper_IViewHelperManagerListener.__name__ = ["hex","view","viewhelper","IViewHelperManagerListener"];
hex_view_viewhelper_IViewHelperManagerListener.prototype = {
	__class__: hex_view_viewhelper_IViewHelperManagerListener
};
var hex_view_viewhelper_MainViewHelperManagerMessage = function() {
};
$hxClasses["hex.view.viewhelper.MainViewHelperManagerMessage"] = hex_view_viewhelper_MainViewHelperManagerMessage;
hex_view_viewhelper_MainViewHelperManagerMessage.__name__ = ["hex","view","viewhelper","MainViewHelperManagerMessage"];
hex_view_viewhelper_MainViewHelperManagerMessage.prototype = {
	__class__: hex_view_viewhelper_MainViewHelperManagerMessage
};
var hex_view_viewhelper_ViewHelper = function() {
	this._isPreInitialized = false;
	this._isVisible = hex_view_viewhelper_ViewHelper.DEFAULT_VISIBLE;
	this._dispatcher = new hex_event_Dispatcher();
};
$hxClasses["hex.view.viewhelper.ViewHelper"] = hex_view_viewhelper_ViewHelper;
hex_view_viewhelper_ViewHelper.__name__ = ["hex","view","viewhelper","ViewHelper"];
hex_view_viewhelper_ViewHelper.__interfaces__ = [hex_view_viewhelper_IViewHelper];
hex_view_viewhelper_ViewHelper.prototype = {
	_preInitialize: function() {
	}
	,_initialize: function() {
	}
	,_release: function() {
	}
	,get_view: function() {
		return this._view;
	}
	,set_view: function(view) {
		if(!this._isPreInitialized) this._preInitialize();
		if(this.get_view() != null || view == null) this._dispatcher.dispatch(hex_view_viewhelper_ViewHelperMessage.REMOVE_VIEW,[this,this._view]);
		this._view = view;
		if(view != null) {
			this._dispatcher.dispatch(hex_view_viewhelper_ViewHelperMessage.ATTACH_VIEW,[this,this._view]);
			if(view.get_visible()) {
				if(view.get_visible() != this._isVisible) view.set_visible(this._isVisible);
			} else this._isVisible = false;
			this._fireInitialisation();
		}
		return this._view;
	}
	,_fireInitialisation: function() {
		this._initialize();
		this._dispatcher.dispatch(hex_view_viewhelper_ViewHelperMessage.INIT,[this]);
	}
	,getOwner: function() {
		return this._owner;
	}
	,setOwner: function(owner) {
		this._owner = owner;
	}
	,show: function() {
		if(!this._isVisible) {
			this._isVisible = true;
			if(this._view != null) this._view.set_visible(true);
		}
	}
	,hide: function() {
		if(this._isVisible) {
			this._isVisible = false;
			if(this._view != null) this._view.set_visible(false);
		}
	}
	,get_visible: function() {
		return this._isVisible;
	}
	,set_visible: function(visible) {
		if(visible) this.show(); else this.hide();
		return this._isVisible;
	}
	,release: function() {
		this._dispatcher.dispatch(hex_view_viewhelper_ViewHelperMessage.RELEASE,[this]);
		this._view = null;
		this._dispatcher.removeAllListeners();
	}
	,addHandler: function(messageType,scope,callback) {
		this._dispatcher.addHandler(messageType,scope,callback);
	}
	,removeHandler: function(messageType,scope,callback) {
		this._dispatcher.removeHandler(messageType,scope,callback);
	}
	,__class__: hex_view_viewhelper_ViewHelper
	,__properties__: {set_visible:"set_visible",get_visible:"get_visible",set_view:"set_view",get_view:"get_view"}
};
var hex_view_viewhelper_ViewHelperManager = function(owner) {
	this._owner = owner;
	this._dispatcher = new hex_event_Dispatcher();
	this._viewHelpers = [];
};
$hxClasses["hex.view.viewhelper.ViewHelperManager"] = hex_view_viewhelper_ViewHelperManager;
hex_view_viewhelper_ViewHelperManager.__name__ = ["hex","view","viewhelper","ViewHelperManager"];
hex_view_viewhelper_ViewHelperManager.getInstance = function(owner) {
	var viewHelperManager = hex_view_viewhelper_ViewHelperManager._mInstances.h[owner.__id__];
	if(viewHelperManager == null) {
		viewHelperManager = new hex_view_viewhelper_ViewHelperManager(owner);
		hex_view_viewhelper_ViewHelperManager._mInstances.set(owner,viewHelperManager);
		hex_view_viewhelper_ViewHelperManager.notifyViewHelperManagerCreation(viewHelperManager);
	}
	return viewHelperManager;
};
hex_view_viewhelper_ViewHelperManager.release = function(owner) {
	var viewHelperManager = hex_view_viewhelper_ViewHelperManager._mInstances.h[owner.__id__];
	if(viewHelperManager != null) {
		hex_view_viewhelper_ViewHelperManager.notifyViewHelperManagerRelease(viewHelperManager);
		viewHelperManager.releaseAllViewHelpers();
		hex_view_viewhelper_ViewHelperManager._mInstances.remove(owner);
	}
};
hex_view_viewhelper_ViewHelperManager.addGlobalListener = function(listener) {
	hex_view_viewhelper_ViewHelperManager._DISPATCHER.addHandler(hex_view_viewhelper_MainViewHelperManagerMessage.VIEW_HELPER_MANAGER_CREATION,listener,$bind(listener,listener.onViewHelperManagerCreation));
	hex_view_viewhelper_ViewHelperManager._DISPATCHER.addHandler(hex_view_viewhelper_MainViewHelperManagerMessage.VIEW_HELPER_MANAGER_RELEASE,listener,$bind(listener,listener.onViewHelperManagerRelease));
};
hex_view_viewhelper_ViewHelperManager.removeGlobalListener = function(listener) {
	hex_view_viewhelper_ViewHelperManager._DISPATCHER.removeHandler(hex_view_viewhelper_MainViewHelperManagerMessage.VIEW_HELPER_MANAGER_CREATION,listener,$bind(listener,listener.onViewHelperManagerCreation));
	hex_view_viewhelper_ViewHelperManager._DISPATCHER.removeHandler(hex_view_viewhelper_MainViewHelperManagerMessage.VIEW_HELPER_MANAGER_RELEASE,listener,$bind(listener,listener.onViewHelperManagerRelease));
};
hex_view_viewhelper_ViewHelperManager.notifyViewHelperManagerCreation = function(viewHelperManager) {
	hex_view_viewhelper_ViewHelperManager._DISPATCHER.dispatch(hex_view_viewhelper_MainViewHelperManagerMessage.VIEW_HELPER_MANAGER_CREATION,[viewHelperManager]);
};
hex_view_viewhelper_ViewHelperManager.notifyViewHelperManagerRelease = function(viewHelperManager) {
	hex_view_viewhelper_ViewHelperManager._DISPATCHER.dispatch(hex_view_viewhelper_MainViewHelperManagerMessage.VIEW_HELPER_MANAGER_RELEASE,[viewHelperManager]);
};
hex_view_viewhelper_ViewHelperManager.prototype = {
	getOwner: function() {
		return this._owner;
	}
	,releaseAllViewHelpers: function() {
		var len = this._viewHelpers.length;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			var viewHelper = this._viewHelpers[len - i - 1];
			this._viewHelpers.splice(len - i - 1,1);
			viewHelper.removeHandler(hex_view_viewhelper_ViewHelperMessage.RELEASE,this,$bind(this,this._onViewHelperRelease));
			viewHelper.release();
			this._notifyViewHelperRelease(viewHelper);
		}
	}
	,buildViewHelper: function(injector,clazz,view) {
		var viewHelper = injector.instantiateUnmapped(clazz);
		if(viewHelper != null) {
			this._notifyViewHelperCreation(viewHelper);
			injector.mapToValue(clazz,viewHelper);
			viewHelper.setOwner(this._owner);
			viewHelper.set_view(view);
			viewHelper.addHandler(hex_view_viewhelper_ViewHelperMessage.RELEASE,this,$bind(this,this._onViewHelperRelease));
			this._viewHelpers.push(viewHelper);
		}
		return viewHelper;
	}
	,size: function() {
		return this._viewHelpers.length;
	}
	,_onViewHelperRelease: function(viewHelper) {
		this._notifyViewHelperRelease(viewHelper);
		var index = HxOverrides.indexOf(this._viewHelpers,viewHelper,0);
		if(index != -1) this._viewHelpers.splice(index,1);
	}
	,addListener: function(listener) {
		this._dispatcher.addHandler(hex_view_viewhelper_ViewHelperManagerMessage.VIEW_HELPER_CREATION,listener,$bind(listener,listener.onViewHelperCreation));
		this._dispatcher.addHandler(hex_view_viewhelper_ViewHelperManagerMessage.VIEW_HELPER_RELEASE,listener,$bind(listener,listener.onViewHelperRelease));
	}
	,removeListener: function(listener) {
		this._dispatcher.removeHandler(hex_view_viewhelper_ViewHelperManagerMessage.VIEW_HELPER_CREATION,listener,$bind(listener,listener.onViewHelperCreation));
		this._dispatcher.removeHandler(hex_view_viewhelper_ViewHelperManagerMessage.VIEW_HELPER_RELEASE,listener,$bind(listener,listener.onViewHelperRelease));
	}
	,_notifyViewHelperCreation: function(viewHelper) {
		this._dispatcher.dispatch(hex_view_viewhelper_ViewHelperManagerMessage.VIEW_HELPER_CREATION,[viewHelper]);
	}
	,_notifyViewHelperRelease: function(viewHelper) {
		this._dispatcher.dispatch(hex_view_viewhelper_ViewHelperManagerMessage.VIEW_HELPER_RELEASE,[viewHelper]);
	}
	,__class__: hex_view_viewhelper_ViewHelperManager
};
var hex_view_viewhelper_ViewHelperManagerMessage = function() {
};
$hxClasses["hex.view.viewhelper.ViewHelperManagerMessage"] = hex_view_viewhelper_ViewHelperManagerMessage;
hex_view_viewhelper_ViewHelperManagerMessage.__name__ = ["hex","view","viewhelper","ViewHelperManagerMessage"];
hex_view_viewhelper_ViewHelperManagerMessage.prototype = {
	__class__: hex_view_viewhelper_ViewHelperManagerMessage
};
var hex_view_viewhelper_ViewHelperMessage = function() {
};
$hxClasses["hex.view.viewhelper.ViewHelperMessage"] = hex_view_viewhelper_ViewHelperMessage;
hex_view_viewhelper_ViewHelperMessage.__name__ = ["hex","view","viewhelper","ViewHelperMessage"];
hex_view_viewhelper_ViewHelperMessage.prototype = {
	__class__: hex_view_viewhelper_ViewHelperMessage
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
$hxClasses["js.html.compat.ArrayBuffer"] = js_html_compat_ArrayBuffer;
js_html_compat_ArrayBuffer.__name__ = ["js","html","compat","ArrayBuffer"];
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
$hxClasses["js.html.compat.DataView"] = js_html_compat_DataView;
js_html_compat_DataView.__name__ = ["js","html","compat","DataView"];
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
$hxClasses["js.html.compat.Uint8Array"] = js_html_compat_Uint8Array;
js_html_compat_Uint8Array.__name__ = ["js","html","compat","Uint8Array"];
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var virrealyclient_DebugConfig = function() { };
$hxClasses["virrealyclient.DebugConfig"] = virrealyclient_DebugConfig;
virrealyclient_DebugConfig.__name__ = ["virrealyclient","DebugConfig"];
var virrealyclient_VirrealyClient = $hx_exports.VirrealyClient = function(config) {
	this._init();
	this._setInitialApplicationSettings(config);
	this._registerView();
	this._build(this._getApplicationXml());
};
$hxClasses["virrealyclient.VirrealyClient"] = virrealyclient_VirrealyClient;
virrealyclient_VirrealyClient.__name__ = ["virrealyclient","VirrealyClient"];
virrealyclient_VirrealyClient.main = function() {
	virrealyclient_VirrealyClient._initLogger();
	virrealyclient_VirrealyClient.self = new virrealyclient_VirrealyClient(virrealyclient_DebugConfig.config);
};
virrealyclient_VirrealyClient._initLogger = function() {
	var proxy = new hex_log_layout_LogProxyLayout();
	var controller = new hex_log_layout_LogLayoutHTMLView(proxy);
	proxy.addListener(new hex_log_layout_SimpleBrowserLayout(controller.consoleWrapperTaget));
	proxy.addListener(new hex_log_layout_JavaScriptConsoleLayout());
};
virrealyclient_VirrealyClient.prototype = {
	_getApplicationXml: function() {
		return Xml.parse("<?xml version=\"1.0\" encoding=\"utf-8\" ?>\r\n<root name=\"virrealyClient\">\r\n    \r\n\t<!-- MODULES -->\r\n\t\r\n\t<module id=\"layoutModule\" type=\"virrealyclient.module.layout.LayoutModule\" map-type=\"virrealyclient.module.layout.ILayoutModule\">\r\n\t\t<argument ref=\"layoutView\"/>\r\n\t</module>\r\n\t\r\n\r\n    \r\n\t<!-- SERVICES -->\r\n\t\t\r\n\r\n    \r\n\t<!-- ORDER -->\r\n\t\r\n\t<state id=\"assemblingEnd\" ref=\"virrealyClient.state.ASSEMBLING_END\">\r\n\t\t<enter command-class=\"virrealyclient.order.bootstrap.BootstrapMacro\" fire-once=\"true\"/>\r\n\t</state>\r\n\t\r\n\t<trigger id=\"orderList\" type=\"Object\">\r\n\t\t<!--<listen ref=\"sampleService\">\r\n\t\t\t<event static-ref=\"virrealyclient.samplepackage.sampleclass.SAMPLE_STATIC_PROPERTY\" strategy=\"virrealyclient.order.bootstrap.BootstrapMacro\"/>\r\n\t\t</listen>-->\r\n\t</trigger>\r\n\t\r\n\t\r\n\t\r\n\r\n    \r\n\t<!-- VIEW -->\r\n\t\r\n\t<view id=\"layoutView\" type=\"virrealyclient.module.layout.view.LayoutViewJS\">\r\n\t\t<argument ref=\"root\" />\r\n\t</view>\r\n\r\n</root>");
	}
	,_init: function() {
		this._applicationAssembler = new hex_ioc_assembler_ApplicationAssembler();
		this._applicationContext = this._applicationAssembler.getApplicationContext("virrealyClient");
		this._injector = this._applicationContext.getBasicInjector();
	}
	,_setInitialApplicationSettings: function(config) {
		var initialApplicationSettingsParser = new virrealyclient_parser_settings_application_InitialApplicationSettingsParser();
		this._initialApplicationSettings = initialApplicationSettingsParser.parseSettings(config);
		this._injector.mapToValue(virrealyclient_vo_settings_application_InitialApplicationSettingsVO,this._initialApplicationSettings,"initialApplicationSettings");
		this._applicationAssembler.getBuilderFactory(this._applicationContext).getCoreFactory().register("initialApplicationSettings",this._initialApplicationSettings);
	}
	,_registerView: function() {
		this._applicationAssembler.getBuilderFactory(this._applicationContext).getCoreFactory().register("root",window.document.getElementById(this._initialApplicationSettings.rootElementId));
	}
	,_build: function(xml) {
		var normalParser = new hex_ioc_parser_xml_ApplicationXMLParser();
		normalParser.parse(this._applicationAssembler,xml);
		this._applicationAssembler.buildEverything();
	}
	,__class__: virrealyclient_VirrealyClient
};
var virrealyclient_module_layout_ILayoutModule = function() { };
$hxClasses["virrealyclient.module.layout.ILayoutModule"] = virrealyclient_module_layout_ILayoutModule;
virrealyclient_module_layout_ILayoutModule.__name__ = ["virrealyclient","module","layout","ILayoutModule"];
virrealyclient_module_layout_ILayoutModule.__interfaces__ = [hex_module_IModule];
var virrealyclient_module_layout_LayoutModule = function(layoutView) {
	hex_module_Module.call(this);
	this._addStatelessConfigClasses([virrealyclient_module_layout__$LayoutModule_LayoutCommandConfig,virrealyclient_module_layout__$LayoutModule_LayoutModelConfig]);
	this.setLayoutView(layoutView);
};
$hxClasses["virrealyclient.module.layout.LayoutModule"] = virrealyclient_module_layout_LayoutModule;
virrealyclient_module_layout_LayoutModule.__name__ = ["virrealyclient","module","layout","LayoutModule"];
virrealyclient_module_layout_LayoutModule.__interfaces__ = [virrealyclient_module_layout_ILayoutModule];
virrealyclient_module_layout_LayoutModule.__super__ = hex_module_Module;
virrealyclient_module_layout_LayoutModule.prototype = $extend(hex_module_Module.prototype,{
	_getRuntimeDependencies: function() {
		var rd = new hex_module_dependency_RuntimeDependencies();
		return rd;
	}
	,setLayoutView: function(layoutView) {
		this.buildViewHelper(virrealyclient_module_layout_view_LayoutViewHelper,layoutView);
	}
	,__class__: virrealyclient_module_layout_LayoutModule
});
var virrealyclient_module_layout__$LayoutModule_LayoutCommandConfig = function() {
	hex_config_stateless_StatelessCommandConfig.call(this);
};
$hxClasses["virrealyclient.module.layout._LayoutModule.LayoutCommandConfig"] = virrealyclient_module_layout__$LayoutModule_LayoutCommandConfig;
virrealyclient_module_layout__$LayoutModule_LayoutCommandConfig.__name__ = ["virrealyclient","module","layout","_LayoutModule","LayoutCommandConfig"];
virrealyclient_module_layout__$LayoutModule_LayoutCommandConfig.__super__ = hex_config_stateless_StatelessCommandConfig;
virrealyclient_module_layout__$LayoutModule_LayoutCommandConfig.prototype = $extend(hex_config_stateless_StatelessCommandConfig.prototype,{
	configure: function() {
		this.map(virrealyclient_module_layout_message_LayoutModuleMessage.SAMPLE,virrealyclient_module_layout_controller_SampleCommand);
	}
	,__class__: virrealyclient_module_layout__$LayoutModule_LayoutCommandConfig
});
var virrealyclient_module_layout__$LayoutModule_LayoutModelConfig = function() {
	hex_config_stateless_StatelessModelConfig.call(this);
};
$hxClasses["virrealyclient.module.layout._LayoutModule.LayoutModelConfig"] = virrealyclient_module_layout__$LayoutModule_LayoutModelConfig;
virrealyclient_module_layout__$LayoutModule_LayoutModelConfig.__name__ = ["virrealyclient","module","layout","_LayoutModule","LayoutModelConfig"];
virrealyclient_module_layout__$LayoutModule_LayoutModelConfig.__super__ = hex_config_stateless_StatelessModelConfig;
virrealyclient_module_layout__$LayoutModule_LayoutModelConfig.prototype = $extend(hex_config_stateless_StatelessModelConfig.prototype,{
	configure: function() {
		this.mapModel(virrealyclient_module_layout_model_ILayoutModel,virrealyclient_module_layout_model_LayoutModel);
	}
	,__class__: virrealyclient_module_layout__$LayoutModule_LayoutModelConfig
});
var virrealyclient_module_layout_controller_SampleCommand = function() {
	hex_control_command_BasicCommand.call(this);
};
$hxClasses["virrealyclient.module.layout.controller.SampleCommand"] = virrealyclient_module_layout_controller_SampleCommand;
virrealyclient_module_layout_controller_SampleCommand.__name__ = ["virrealyclient","module","layout","controller","SampleCommand"];
virrealyclient_module_layout_controller_SampleCommand.__super__ = hex_control_command_BasicCommand;
virrealyclient_module_layout_controller_SampleCommand.prototype = $extend(hex_control_command_BasicCommand.prototype,{
	execute: function(request) {
	}
	,__class__: virrealyclient_module_layout_controller_SampleCommand
});
var virrealyclient_module_layout_message_LayoutModuleMessage = function() { };
$hxClasses["virrealyclient.module.layout.message.LayoutModuleMessage"] = virrealyclient_module_layout_message_LayoutModuleMessage;
virrealyclient_module_layout_message_LayoutModuleMessage.__name__ = ["virrealyclient","module","layout","message","LayoutModuleMessage"];
var virrealyclient_module_layout_model_ILayoutModelRO = function() { };
$hxClasses["virrealyclient.module.layout.model.ILayoutModelRO"] = virrealyclient_module_layout_model_ILayoutModelRO;
virrealyclient_module_layout_model_ILayoutModelRO.__name__ = ["virrealyclient","module","layout","model","ILayoutModelRO"];
virrealyclient_module_layout_model_ILayoutModelRO.prototype = {
	__class__: virrealyclient_module_layout_model_ILayoutModelRO
};
var virrealyclient_module_layout_model_ILayoutModel = function() { };
$hxClasses["virrealyclient.module.layout.model.ILayoutModel"] = virrealyclient_module_layout_model_ILayoutModel;
virrealyclient_module_layout_model_ILayoutModel.__name__ = ["virrealyclient","module","layout","model","ILayoutModel"];
virrealyclient_module_layout_model_ILayoutModel.__interfaces__ = [virrealyclient_module_layout_model_ILayoutModelRO];
var virrealyclient_module_layout_model_ILayoutModelListener = function() { };
$hxClasses["virrealyclient.module.layout.model.ILayoutModelListener"] = virrealyclient_module_layout_model_ILayoutModelListener;
virrealyclient_module_layout_model_ILayoutModelListener.__name__ = ["virrealyclient","module","layout","model","ILayoutModelListener"];
virrealyclient_module_layout_model_ILayoutModelListener.__interfaces__ = [hex_model_IModelListener];
var virrealyclient_module_layout_model_LayoutModel = function() {
	hex_model_Model.call(this);
	this.dispatcher = new virrealyclient_module_layout_model_LayoutModelDispatcher();
};
$hxClasses["virrealyclient.module.layout.model.LayoutModel"] = virrealyclient_module_layout_model_LayoutModel;
virrealyclient_module_layout_model_LayoutModel.__name__ = ["virrealyclient","module","layout","model","LayoutModel"];
virrealyclient_module_layout_model_LayoutModel.__interfaces__ = [virrealyclient_module_layout_model_ILayoutModel];
virrealyclient_module_layout_model_LayoutModel.__super__ = hex_model_Model;
virrealyclient_module_layout_model_LayoutModel.prototype = $extend(hex_model_Model.prototype,{
	__class__: virrealyclient_module_layout_model_LayoutModel
});
var virrealyclient_module_layout_model_LayoutModelDispatcher = function() {
	hex_model_ModelDispatcher.call(this);
};
$hxClasses["virrealyclient.module.layout.model.LayoutModelDispatcher"] = virrealyclient_module_layout_model_LayoutModelDispatcher;
virrealyclient_module_layout_model_LayoutModelDispatcher.__name__ = ["virrealyclient","module","layout","model","LayoutModelDispatcher"];
virrealyclient_module_layout_model_LayoutModelDispatcher.__interfaces__ = [virrealyclient_module_layout_model_ILayoutModelListener];
virrealyclient_module_layout_model_LayoutModelDispatcher.__super__ = hex_model_ModelDispatcher;
virrealyclient_module_layout_model_LayoutModelDispatcher.prototype = $extend(hex_model_ModelDispatcher.prototype,{
	__class__: virrealyclient_module_layout_model_LayoutModelDispatcher
});
var virrealyclient_module_layout_view_ILayoutView = function() { };
$hxClasses["virrealyclient.module.layout.view.ILayoutView"] = virrealyclient_module_layout_view_ILayoutView;
virrealyclient_module_layout_view_ILayoutView.__name__ = ["virrealyclient","module","layout","view","ILayoutView"];
virrealyclient_module_layout_view_ILayoutView.__interfaces__ = [hex_view_IView];
var virrealyclient_module_layout_view_LayoutViewHelper = function() {
	hex_view_viewhelper_ViewHelper.call(this);
};
$hxClasses["virrealyclient.module.layout.view.LayoutViewHelper"] = virrealyclient_module_layout_view_LayoutViewHelper;
virrealyclient_module_layout_view_LayoutViewHelper.__name__ = ["virrealyclient","module","layout","view","LayoutViewHelper"];
virrealyclient_module_layout_view_LayoutViewHelper.__interfaces__ = [virrealyclient_module_layout_model_ILayoutModelListener];
virrealyclient_module_layout_view_LayoutViewHelper.__super__ = hex_view_viewhelper_ViewHelper;
virrealyclient_module_layout_view_LayoutViewHelper.prototype = $extend(hex_view_viewhelper_ViewHelper.prototype,{
	_initialize: function() {
		hex_view_viewhelper_ViewHelper.prototype._initialize.call(this);
		this._layoutView = this._view;
		this.layoutModel.addListener(this);
	}
	,__class__: virrealyclient_module_layout_view_LayoutViewHelper
});
var virrealyclient_module_layout_view_LayoutViewJS = function(layout) {
	this._layout = layout;
};
$hxClasses["virrealyclient.module.layout.view.LayoutViewJS"] = virrealyclient_module_layout_view_LayoutViewJS;
virrealyclient_module_layout_view_LayoutViewJS.__name__ = ["virrealyclient","module","layout","view","LayoutViewJS"];
virrealyclient_module_layout_view_LayoutViewJS.__interfaces__ = [hex_core_IAnnotationParsable,virrealyclient_module_layout_view_ILayoutView];
virrealyclient_module_layout_view_LayoutViewJS.prototype = {
	get_visible: function() {
		return this.visible;
	}
	,set_visible: function(value) {
		return this.visible = value;
	}
	,__class__: virrealyclient_module_layout_view_LayoutViewJS
	,__properties__: {set_visible:"set_visible",get_visible:"get_visible"}
};
var virrealyclient_order_bootstrap_BootstrapMacro = function() {
	hex_control_macro_Macro.call(this);
};
$hxClasses["virrealyclient.order.bootstrap.BootstrapMacro"] = virrealyclient_order_bootstrap_BootstrapMacro;
virrealyclient_order_bootstrap_BootstrapMacro.__name__ = ["virrealyclient","order","bootstrap","BootstrapMacro"];
virrealyclient_order_bootstrap_BootstrapMacro.__super__ = hex_control_macro_Macro;
virrealyclient_order_bootstrap_BootstrapMacro.prototype = $extend(hex_control_macro_Macro.prototype,{
	_prepare: function() {
		hex_log_Logger.DEBUG("_prepare",null,{ fileName : "BootstrapMacro.hx", lineNumber : 22, className : "virrealyclient.order.bootstrap.BootstrapMacro", methodName : "_prepare"});
		this.add(virrealyclient_order_bootstrap_controller_SetLayoutSettingsCommand);
	}
	,__class__: virrealyclient_order_bootstrap_BootstrapMacro
});
var virrealyclient_order_bootstrap_controller_SetLayoutSettingsCommand = function() {
	hex_control_command_BasicCommand.call(this);
};
$hxClasses["virrealyclient.order.bootstrap.controller.SetLayoutSettingsCommand"] = virrealyclient_order_bootstrap_controller_SetLayoutSettingsCommand;
virrealyclient_order_bootstrap_controller_SetLayoutSettingsCommand.__name__ = ["virrealyclient","order","bootstrap","controller","SetLayoutSettingsCommand"];
virrealyclient_order_bootstrap_controller_SetLayoutSettingsCommand.__super__ = hex_control_command_BasicCommand;
virrealyclient_order_bootstrap_controller_SetLayoutSettingsCommand.prototype = $extend(hex_control_command_BasicCommand.prototype,{
	execute: function(request) {
	}
	,__class__: virrealyclient_order_bootstrap_controller_SetLayoutSettingsCommand
});
var virrealyclient_parser_settings_application_InitialApplicationSettingsParser = function() {
};
$hxClasses["virrealyclient.parser.settings.application.InitialApplicationSettingsParser"] = virrealyclient_parser_settings_application_InitialApplicationSettingsParser;
virrealyclient_parser_settings_application_InitialApplicationSettingsParser.__name__ = ["virrealyclient","parser","settings","application","InitialApplicationSettingsParser"];
virrealyclient_parser_settings_application_InitialApplicationSettingsParser.__interfaces__ = [hex_data_IParser];
virrealyclient_parser_settings_application_InitialApplicationSettingsParser.prototype = {
	parseSettings: function(settings) {
		return this.parse(settings);
	}
	,parse: function(serializedContent,target) {
		var data = serializedContent;
		var result = new virrealyclient_vo_settings_application_InitialApplicationSettingsVO();
		result.rootElementId = data.rootElementId;
		return result;
	}
	,__class__: virrealyclient_parser_settings_application_InitialApplicationSettingsParser
};
var virrealyclient_vo_settings_application_InitialApplicationSettingsVO = function() {
};
$hxClasses["virrealyclient.vo.settings.application.InitialApplicationSettingsVO"] = virrealyclient_vo_settings_application_InitialApplicationSettingsVO;
virrealyclient_vo_settings_application_InitialApplicationSettingsVO.__name__ = ["virrealyclient","vo","settings","application","InitialApplicationSettingsVO"];
virrealyclient_vo_settings_application_InitialApplicationSettingsVO.prototype = {
	__class__: virrealyclient_vo_settings_application_InitialApplicationSettingsVO
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
haxe_Resource.content = [{ name : "serviceConfiguration", data : "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiID8+DQo8cm9vdD4NCgk8IS0tIFNFUlZJQ0VTIC0tPg0KCQkNCjwvcm9vdD4"},{ name : "moduleConfiguration", data : "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiID8+DQo8cm9vdD4NCgk8IS0tIE1PRFVMRVMgLS0+DQoJDQoJPG1vZHVsZSBpZD0ibGF5b3V0TW9kdWxlIiB0eXBlPSJ2aXJyZWFseWNsaWVudC5tb2R1bGUubGF5b3V0LkxheW91dE1vZHVsZSIgbWFwLXR5cGU9InZpcnJlYWx5Y2xpZW50Lm1vZHVsZS5sYXlvdXQuSUxheW91dE1vZHVsZSI+DQoJCTxhcmd1bWVudCByZWY9ImxheW91dFZpZXciLz4NCgk8L21vZHVsZT4NCgkNCjwvcm9vdD4"},{ name : "orderConfiguration", data : "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiID8+DQo8cm9vdD4NCgk8IS0tIE9SREVSIC0tPg0KCQ0KCTxzdGF0ZSBpZD0iYXNzZW1ibGluZ0VuZCIgcmVmPSJ2aXJyZWFseUNsaWVudC5zdGF0ZS5BU1NFTUJMSU5HX0VORCI+DQoJCTxlbnRlciBjb21tYW5kLWNsYXNzPSJ2aXJyZWFseWNsaWVudC5vcmRlci5ib290c3RyYXAuQm9vdHN0cmFwTWFjcm8iIGZpcmUtb25jZT0idHJ1ZSIvPg0KCTwvc3RhdGU+DQoJDQoJPHRyaWdnZXIgaWQ9Im9yZGVyTGlzdCIgdHlwZT0iT2JqZWN0Ij4NCgkJPCEtLTxsaXN0ZW4gcmVmPSJzYW1wbGVTZXJ2aWNlIj4NCgkJCTxldmVudCBzdGF0aWMtcmVmPSJ2aXJyZWFseWNsaWVudC5zYW1wbGVwYWNrYWdlLnNhbXBsZWNsYXNzLlNBTVBMRV9TVEFUSUNfUFJPUEVSVFkiIHN0cmF0ZWd5PSJ2aXJyZWFseWNsaWVudC5vcmRlci5ib290c3RyYXAuQm9vdHN0cmFwTWFjcm8iLz4NCgkJPC9saXN0ZW4+LS0+DQoJPC90cmlnZ2VyPg0KCQ0KCQ0KCQ0KPC9yb290Pg"},{ name : "viewConfigurationJS", data : "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiID8+DQo8cm9vdD4NCgk8IS0tIFZJRVcgLS0+DQoJDQoJPHZpZXcgaWQ9ImxheW91dFZpZXciIHR5cGU9InZpcnJlYWx5Y2xpZW50Lm1vZHVsZS5sYXlvdXQudmlldy5MYXlvdXRWaWV3SlMiPg0KCQk8YXJndW1lbnQgcmVmPSJyb290IiAvPg0KCTwvdmlldz4NCjwvcm9vdD4"}];
var __map_reserved = {}
var ArrayBuffer = (Function("return typeof ArrayBuffer != 'undefined' ? ArrayBuffer : null"))() || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = (Function("return typeof DataView != 'undefined' ? DataView : null"))() || js_html_compat_DataView;
var Uint8Array = (Function("return typeof Uint8Array != 'undefined' ? Uint8Array : null"))() || js_html_compat_Uint8Array._new;
Xml.Element = 0;
Xml.PCData = 1;
Xml.CData = 2;
Xml.Comment = 3;
Xml.DocType = 4;
Xml.ProcessingInstruction = 5;
Xml.Document = 6;
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
haxe_xml_Parser.escapes = (function($this) {
	var $r;
	var h = new haxe_ds_StringMap();
	if(__map_reserved.lt != null) h.setReserved("lt","<"); else h.h["lt"] = "<";
	if(__map_reserved.gt != null) h.setReserved("gt",">"); else h.h["gt"] = ">";
	if(__map_reserved.amp != null) h.setReserved("amp","&"); else h.h["amp"] = "&";
	if(__map_reserved.quot != null) h.setReserved("quot","\""); else h.h["quot"] = "\"";
	if(__map_reserved.apos != null) h.setReserved("apos","'"); else h.h["apos"] = "'";
	$r = h;
	return $r;
}(this));
hex_collection_LocatorMessage.REGISTER = new hex_event_MessageType("onRegister");
hex_collection_LocatorMessage.UNREGISTER = new hex_event_MessageType("onUnregister");
hex_config_stateless_StatelessCommandConfig.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"frontController\",\"type\":\"hex.control.IFrontController\",\"key\":\"\"}],\"name\":\"hex.config.stateless.StatelessCommandConfig\",\"methods\":[]}"]}};
hex_config_stateless_StatelessModelConfig.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"injector\",\"type\":\"hex.di.IDependencyInjector\",\"key\":\"\"}],\"name\":\"hex.config.stateless.StatelessModelConfig\",\"methods\":[]}"]}};
hex_control_async_AsyncCommand.WAS_NEVER_USED = "WAS_NEVER_USED";
hex_control_async_AsyncCommand.IS_RUNNING = "IS_RUNNING";
hex_control_async_AsyncCommand.IS_COMPLETED = "IS_COMPLETED";
hex_control_async_AsyncCommand.IS_FAILED = "IS_FAILED";
hex_control_async_AsyncCommand.IS_CANCELLED = "IS_CANCELLED";
hex_control_async_AsyncCommand._POOL = new haxe_ds_ObjectMap();
hex_control_async_AsyncCommandMessage.COMPLETE = new hex_event_MessageType("onAsyncCommandComplete");
hex_control_async_AsyncCommandMessage.FAIL = new hex_event_MessageType("onAsyncCommandFail");
hex_control_async_AsyncCommandMessage.CANCEL = new hex_event_MessageType("onAsyncCommandCancel");
hex_control_macro_Macro.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"macroExecutor\",\"type\":\"hex.control.macro.IMacroExecutor\",\"key\":\"\"}],\"name\":\"hex.control.macro.Macro\",\"methods\":[]}"]}};
hex_control_macro_MacroExecutor.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"injector\",\"type\":\"hex.di.IBasicInjector\",\"key\":\"\"}],\"name\":\"hex.control.macro.MacroExecutor\",\"methods\":[]}"]}};
hex_core_HashCodeFactory._nKEY = 0;
hex_core_HashCodeFactory._M = new haxe_ds_ObjectMap();
hex_di_InjectionEvent.POST_INSTANTIATE = "onPostInstantiate";
hex_di_InjectionEvent.PRE_CONSTRUCT = "onPreConstruct";
hex_di_InjectionEvent.POST_CONSTRUCT = "onPostConstruct";
hex_domain_Domain._domainNames = new haxe_ds_StringMap();
hex_domain_DomainUtil._domain = new haxe_ds_StringMap();
hex_domain_TopLevelDomain.DOMAIN = hex_domain_DomainUtil.getDomain("TopLevelDomain",hex_domain_TopLevelDomain);
hex_domain_ApplicationDomainDispatcher._Instance = new hex_domain_ApplicationDomainDispatcher();
hex_domain_DefaultDomain.DOMAIN = hex_domain_DomainUtil.getDomain("DefaultDomain",hex_domain_DefaultDomain);
hex_domain_DomainExpert._Instance = new hex_domain_DomainExpert();
hex_domain_DomainExpert._DomainIndex = 0;
hex_domain_NoDomain.DOMAIN = hex_domain_DomainUtil.getDomain("NoDomain",hex_domain_NoDomain);
hex_event_MacroAdapterStrategy.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"macroExecutor\",\"type\":\"hex.control.macro.IMacroExecutor\",\"key\":\"\"}],\"name\":\"hex.event.MacroAdapterStrategy\",\"methods\":[]}"]}};
hex_ioc_assembler_ApplicationAssemblerMessage.CONTEXT_PARSED = new hex_event_MessageType("onContextParsed");
hex_ioc_assembler_ApplicationAssemblerMessage.ASSEMBLING_START = new hex_event_MessageType("onAssemblingStart");
hex_ioc_assembler_ApplicationAssemblerMessage.STATE_TRANSITIONS_BUILT = new hex_event_MessageType("onStateTransitionsBuilt");
hex_ioc_assembler_ApplicationAssemblerMessage.OBJECTS_BUILT = new hex_event_MessageType("onObjectsBuilt");
hex_ioc_assembler_ApplicationAssemblerMessage.METHODS_CALLED = new hex_event_MessageType("onMethodsCalled");
hex_ioc_assembler_ApplicationAssemblerMessage.DOMAIN_LISTENERS_ASSIGNED = new hex_event_MessageType("onDomainListenersAssigned");
hex_ioc_assembler_ApplicationAssemblerMessage.MODULES_INITIALIZED = new hex_event_MessageType("onModulesInitialized");
hex_ioc_assembler_ApplicationAssemblerMessage.ASSEMBLING_END = new hex_event_MessageType("onAssemblingEnd");
hex_ioc_core_ContextAttributeList.ID = "id";
hex_ioc_core_ContextAttributeList.TYPE = "type";
hex_ioc_core_ContextAttributeList.NAME = "name";
hex_ioc_core_ContextAttributeList.REF = "ref";
hex_ioc_core_ContextAttributeList.VALUE = "value";
hex_ioc_core_ContextAttributeList.FACTORY = "factory";
hex_ioc_core_ContextAttributeList.SINGLETON_ACCESS = "singleton-access";
hex_ioc_core_ContextAttributeList.INJECT_INTO = "inject-into";
hex_ioc_core_ContextAttributeList.METHOD = "method";
hex_ioc_core_ContextAttributeList.PARSER_CLASS = "parser-class";
hex_ioc_core_ContextAttributeList.LOCATOR = "locator";
hex_ioc_core_ContextAttributeList.MAP_TYPE = "map-type";
hex_ioc_core_ContextAttributeList.MAP_NAME = "map-name";
hex_ioc_core_ContextAttributeList.STRATEGY = "strategy";
hex_ioc_core_ContextAttributeList.INJECTED_IN_MODULE = "injectedInModule";
hex_ioc_core_ContextAttributeList.STATIC_REF = "static-ref";
hex_ioc_core_ContextAttributeList.COMMAND_CLASS = "command-class";
hex_ioc_core_ContextAttributeList.FIRE_ONCE = "fire-once";
hex_ioc_core_ContextAttributeList.CONTEXT_OWNER = "context-owner";
hex_ioc_core_ContextAttributeList.IF = "if";
hex_ioc_core_ContextAttributeList.IF_NOT = "if-not";
hex_ioc_core_ContextNameList.PROPERTY = "property";
hex_ioc_core_ContextNameList.ARGUMENT = "argument";
hex_ioc_core_ContextNameList.METHOD_CALL = "method-call";
hex_ioc_core_ContextNameList.LISTEN = "listen";
hex_ioc_core_ContextNameList.ITEM = "item";
hex_ioc_core_ContextNameList.KEY = "key";
hex_ioc_core_ContextNameList.VALUE = "value";
hex_ioc_core_ContextNameList.MAP_NAME = "map-name";
hex_ioc_core_ContextNameList.EVENT = "event";
hex_ioc_core_ContextNameList.ENTER = "enter";
hex_ioc_core_ContextNameList.EXIT = "exit";
hex_ioc_core_ContextNameList.ROOT = "root";
hex_ioc_core_ContextTypeList.ARRAY = "Array";
hex_ioc_core_ContextTypeList.BOOLEAN = "Bool";
hex_ioc_core_ContextTypeList.INSTANCE = "Instance";
hex_ioc_core_ContextTypeList.INT = "Int";
hex_ioc_core_ContextTypeList.NULL = "null";
hex_ioc_core_ContextTypeList.FLOAT = "Float";
hex_ioc_core_ContextTypeList.OBJECT = "Object";
hex_ioc_core_ContextTypeList.STRING = "String";
hex_ioc_core_ContextTypeList.UINT = "UInt";
hex_ioc_core_ContextTypeList.DEFAULT = "Default";
hex_ioc_core_ContextTypeList.HASHMAP = "hex.collection.HashMap";
hex_ioc_core_ContextTypeList.SERVICE_LOCATOR = "hex.config.stateful.ServiceLocator";
hex_ioc_core_ContextTypeList.CLASS = "Class";
hex_ioc_core_ContextTypeList.XML = "XML";
hex_ioc_core_ContextTypeList.FUNCTION = "Function";
js_Boot.__toStr = {}.toString;
hex_log_LogLevel._ALL = new hex_log_LogLevel(0);
hex_log_LogLevel._DEBUG = new hex_log_LogLevel(10000);
hex_log_LogLevel._INFO = new hex_log_LogLevel(20000);
hex_log_LogLevel._WARN = new hex_log_LogLevel(30000);
hex_log_LogLevel._ERROR = new hex_log_LogLevel(40000);
hex_log_LogLevel._FATAL = new hex_log_LogLevel(50000);
hex_log_LogLevel._OFF = new hex_log_LogLevel(60000);
hex_ioc_core_CoreFactory._fastEvalMethod = hex_util_FastEval.fromTarget;
hex_ioc_parser_AbstractParserCommand.__meta__ = { fields : { execute : { 'final' : null}, setApplicationAssembler : { 'final' : null}, getApplicationAssembler : { 'final' : null}, getContextData : { 'final' : null}}};
hex_ioc_parser_xml_AbstractXMLParser.__meta__ = { fields : { getApplicationContext : { 'final' : null}, setContextData : { 'final' : null}, getXMLContext : { 'final' : null}}};
hex_ioc_parser_xml_XMLFileReader._includeMatcher = new EReg("<include.*?file=(\"|')([^\"']+)\\1.*?(?:(?:/>)|(?:>[\\W\\w\t\r\n]*?</include *>))","g");
hex_ioc_parser_xml_XMLFileReader._headerMatcher = new EReg("(?:<\\?xml[^>]+>\\s*)<([a-zA-Z0-9-_:]+)[^>]*>([\\s\\S]*)</\\1\\s*>","");
hex_ioc_parser_xml_XMLFileReader._rootFolder = "";
hex_ioc_parser_xml_XMLFileReader._primType = ["String","Int","UInt","Float","Bool","null","Object","XML","Class","Function","Array"];
hex_log_LoggerMessage.LOG = new hex_event_MessageType("onLog");
hex_log_LoggerMessage.CLEAR = new hex_event_MessageType("onClear");
hex_log_layout_LogLayoutHTMLView.TAP_THRESHOLD = 250;
hex_log_layout_SwipeHorizontalVO.MIN_X = 30;
hex_log_layout_SwipeHorizontalVO.MAX_X = 30;
hex_log_layout_SwipeHorizontalVO.MIN_Y = 50;
hex_log_layout_SwipeHorizontalVO.MAX_Y = 60;
hex_log_layout_ConsoleStyle.template = "<div id=\"console\" width=\"100%\" style=\"background:#fff; height:100vh; overflow-y:scroll; padding: 15px; display:none\"></div>\n<button class=\"debug-console-toggle\">Console</button>\n<div class=\"debug-console hidden\">\n\t<div class=\"debug-console-list-wrapper\"></div>\n\t<div class=\"debug-console-control\">\n\t\t<div class=\"debug-console-control-item debug-console-control-item--search\">\n\t\t\t<button class=\"debug-console-control-caret debug-console-control-caret--left\"><</button>\n\t\t\t<input type=\"text\" placeholder=\"Search\" autocorrect=\"off\" autocapitalize=\"off\" class=\"debug-console-control-item-input\">\n\t\t\t<button class=\"debug-console-control-caret debug-console-control-caret--right\">></button>\n\t\t</div>\n\t\t<div class=\"debug-console-control-item debug-console-control-item--domain\">\n\t\t\t<input type=\"text\" placeholder=\"Domain\" autocorrect=\"off\" autocapitalize=\"off\" class=\"debug-console-control-item-input\">\n\t\t</div>\n\t\t<div class=\"debug-console-control-item debug-console-control-item--level\">\n\t\t\t<select class=\"debug-console-control-item-input\">\n\t\t\t</select>\n\t\t</div>\n\t</div>\n</div>\n";
hex_log_layout_ConsoleStyle.style = "\nhtml,\nbody,\n.debug-console {\n\tmargin: 0;\n\theight: 100%;\n\twidth: 100%;\n}\n\n.debug-console-toggle {\n\tposition: fixed;\n\tz-index: 1001;\n\tleft: 10px;\n\ttop: 10px;\n}\n\n.debug-console {\n\tposition: fixed;\n\tz-index: 1000;\n\ttop: 0;\n\tright: 0;\n\tbottom: 0;\n\tleft: 0;\n\tbackground: rgba(0, 0, 0, 0.8);\n}\n\n.debug-console.hidden {\n\tdisplay: none;\n}\n\n.debug-console,\n.debug-console-list-wrapper,\n.debug-console-control {\n\tbox-sizing: border-box;\n}\n\n.debug-console-list-wrapper,\n.debug-console-control {\n\tposition: absolute;\n\tleft: 0;\n\tright: 0;\n}\n\n.debug-console-list-wrapper {\n\ttop: 0;\n\theight: calc(100% - 24px);\n\t-webkit-overflow-scrolling: touch;\n\toverflow-x: hidden;\n\toverflow-y: scroll;\n}\n\n.debug-console-list {\n\tpadding: 0;\n\tmargin: 10px;\n\tlist-style: none;\n}\n\n.debug-console-list li {\n\tmargin: 0 0 2px 0;\n\tcolor: lime;\n}\n\n.debug-console-control {\n\tbottom: 0;\n\theight: 30px;\n\tletter-spacing: -0.3125em;\n\tpadding: 5px 0% 5px 5px;\n}\n\n.debug-console-control-item,\n.debug-console-control-item--search .debug-console-control-item-input,\n.debug-console-control-caret {\n\tdisplay: inline-block;\n\tvertical-align: top;\n\tletter-spacing: normal;\n\tword-spacing: normal;\n\tbox-sizing: border-box;\n}\n\n.debug-console-control-item {\n\tpadding-right: 1%;\n}\n\n.debug-console-control-item-input {\n\tbox-sizing: border-box;\n\theight: 20px;\n\tline-height: 20px;\n\twidth: 100%;\n}\n\n.debug-console-control-item--search {\n\tletter-spacing: -0.3125em;\n}\n\n.debug-console-control-caret--left {\n\twidth: 24px;\n\tmargin-right: 4px;\n}\n.debug-console-control-caret--right {\n\twidth: 24px;\n\tmargin-left: 4px;\n}\n\n.debug-console-control-item--search {\n\twidth: 50%;\n\tpadding: 0 8px 0 0;\n}\n\n.debug-console-control-item--search .debug-console-control-item-input {\n\twidth: calc(100% - 56px);\n}\n\n.debug-console-control-item--domain,\n.debug-console-control-item--level {\n\twidth: 25%;\n}\n\n.highlight-word { background-color:#FFFF00; }\n\n.selected { background-color:#999900 }\n";
hex_log_layout_AllDomain.DOMAIN = hex_domain_DomainUtil.getDomain("AllDomain",hex_log_layout_AllDomain);
hex_metadata_AnnotationProvider._Instance = new hex_metadata_AnnotationProvider();
hex_metadata_AnnotationProvider._Domains = new haxe_ds_ObjectMap();
hex_metadata_AnnotationProvider._META_DATA = new hex_collection_HashMap();
hex_module_ModuleMessage.INITIALIZED = new hex_event_MessageType("onModuleInitialisation");
hex_module_ModuleMessage.RELEASED = new hex_event_MessageType("onModuleRelease");
hex_state_control_StateChangeMacro.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"macroExecutor\",\"type\":\"hex.control.macro.IMacroExecutor\",\"key\":\"\"}],\"name\":\"hex.state.control.StateChangeMacro\",\"methods\":[]}"]}};
hex_view_viewhelper_MainViewHelperManagerMessage.VIEW_HELPER_MANAGER_CREATION = new hex_event_MessageType("onViewHelperManagerCreation");
hex_view_viewhelper_MainViewHelperManagerMessage.VIEW_HELPER_MANAGER_RELEASE = new hex_event_MessageType("onViewHelperManagerRelease");
hex_view_viewhelper_ViewHelper.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"dispatcher\",\"type\":\"hex.event.IDispatcher\",\"key\":\"\"}],\"name\":\"hex.view.viewhelper.ViewHelper\",\"methods\":[]}"]}};
hex_view_viewhelper_ViewHelper.DEFAULT_VISIBLE = true;
hex_view_viewhelper_ViewHelperManager._mInstances = new haxe_ds_ObjectMap();
hex_view_viewhelper_ViewHelperManager._DISPATCHER = new hex_event_Dispatcher();
hex_view_viewhelper_ViewHelperManagerMessage.VIEW_HELPER_CREATION = new hex_event_MessageType("onViewHelperCreation");
hex_view_viewhelper_ViewHelperManagerMessage.VIEW_HELPER_RELEASE = new hex_event_MessageType("onViewHelperRelease");
hex_view_viewhelper_ViewHelperMessage.INIT = new hex_event_MessageType("onInit");
hex_view_viewhelper_ViewHelperMessage.RELEASE = new hex_event_MessageType("onRelease");
hex_view_viewhelper_ViewHelperMessage.ATTACH_VIEW = new hex_event_MessageType("onAttachView");
hex_view_viewhelper_ViewHelperMessage.REMOVE_VIEW = new hex_event_MessageType("onRemoveView");
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
virrealyclient_DebugConfig.config = { rootElementId : "virrealyRoot"};
virrealyclient_module_layout__$LayoutModule_LayoutCommandConfig.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"frontController\",\"type\":\"hex.control.IFrontController\",\"key\":\"\"}],\"name\":\"virrealyclient.module.layout.LayoutModule\",\"methods\":[]}"]}};
virrealyclient_module_layout__$LayoutModule_LayoutModelConfig.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"injector\",\"type\":\"hex.di.IDependencyInjector\",\"key\":\"\"}],\"name\":\"virrealyclient.module.layout.LayoutModule\",\"methods\":[]}"]}};
virrealyclient_module_layout_controller_SampleCommand.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"layoutModel\",\"type\":\"virrealyclient.module.layout.model.ILayoutModel\",\"key\":\"\"}],\"name\":\"virrealyclient.module.layout.controller.SampleCommand\",\"methods\":[]}"]}};
virrealyclient_module_layout_message_LayoutModuleMessage.SAMPLE = new hex_event_MessageType("sample");
virrealyclient_module_layout_view_LayoutViewHelper.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"dispatcher\",\"type\":\"hex.event.IDispatcher\",\"key\":\"\"},{\"isOpt\":false,\"name\":\"layoutModel\",\"type\":\"virrealyclient.module.layout.model.ILayoutModelRO\",\"key\":\"\"}],\"name\":\"virrealyclient.module.layout.view.LayoutViewHelper\",\"methods\":[]}"]}};
virrealyclient_order_bootstrap_BootstrapMacro.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"macroExecutor\",\"type\":\"hex.control.macro.IMacroExecutor\",\"key\":\"\"}],\"name\":\"virrealyclient.order.bootstrap.BootstrapMacro\",\"methods\":[]}"]}};
virrealyclient_VirrealyClient.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);

//# sourceMappingURL=VirrealyClient.js.map