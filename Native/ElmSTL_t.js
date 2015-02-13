function assert(whatever) {
	if (whatever) document.write(".");
	else document.write("X");
}

read("10mm_test_cube.stl",function (resp) {assert(resp)});
read("10mm_test_cube.stlx",function() {}, function (st) {assert(st == 404)});
read("10mm_test_cube.stl",function (resp) {assert(countTris(resp) == 12)});
read("10mm_test_cube.stl",function (resp) {alert(triangle(resp,11)_2.position[2])});
