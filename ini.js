function ini_load(data) {
	var ret = new Object(); 
	var t_line = null;
	var section = null;
	var key = null;
	var val = null;
	var in_section = 0, k_end;

	// todo: make code robust, rn minimalistic

	var lines = data.split('\n');
	for(var i = 0;i < lines.length;i++){
		var line = lines[i];
		var nr, len = line.length;
		
		t_line = line.trim()
		var t_len = t_line.length;
		// add code to parse ;comments, escape seq. \t \n \\ \; etc.

		if (t_line[0]=='[' && t_line[t_len-1]==']') //if section
		{
			// add code for optional case-sensitivity
   			section = t_line.substring(1,t_len-1).trim().toLowerCase();
   			// add code to check invalid section like []
   			ret[section] = new Object();
		}
		if (t_line.indexOf('=')>-1)
		{
			key = t_line.substring(0,t_line.indexOf('=')).trim().toLowerCase();
			// add code to parse key from line
			// add code to check invalid key
			val = ini_safe(t_line.substring(t_line.indexOf('=')+1,t_len).trim().toLowerCase());

			ret[section][key] = val;
		}
	}
	return ret;
}
var ini = "[test01]\nkey01=abcd\nkey02=efgh\n[test02]\nkey_a=1234\nkey_b=5678";
var oIni = ini_load(ini);
/*
function ini_save(obj) {
	var t = ini_save_t(obj);

}
function ini_save_t(obj) {
	var buf = "";
	for (item in obj) {
		if (typeof obj[item] == 'object') {
			buf += "[" + item + "]\n" + ini_save_t(obj[item]);
		} else {
			buf += item + "=" + obj[item];
		}
	}
	return buf;
}*/
function ini_safe(s) {
	e_list = ['\\v','\\f','\\t','\\\\'];
	c_list = ['\v','\f','\t','\\'];
	for (var i = e_list.length - 1; i >= 0; i--) {
		s = s.replace(e_list[i],c_list[i]);
	}
	return s
}
