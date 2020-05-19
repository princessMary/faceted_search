
function filter_time(){

  var course_dict = getList();
  // var course_dict = lista;
  var listed_text = [];
  var list_five = [];
  var list_level = [];
  var list_time = [];

  var five = document.getElementById("five").checked;
  var lessFive = document.getElementById("lessfive").checked;
  var moreFive = document.getElementById("morefive").checked;
  var bsc = document.getElementById("bsc").checked;
  var msc = document.getElementById("msc").checked;
  var autumn = document.getElementById("autumn").checked;
  var spring = document.getElementById("spring").checked;
  var summer = document.getElementById("summer").checked;

  for (var i = 0; i < course_dict.length; i++) {
    if (five){
      if (course_dict[i]["credit"].includes("5")){
        list_five.push(course_dict);
      }
    }
    else if (lessFive){
      if (course_dict[i]["credit"].startsWith("1 ") || course_dict[i]["credit"].startsWith("2") || course_dict[i]["credit"].startsWith("3")|| course_dict[i]["credit"].startsWith("4")){
        list_five.push(course_dict);
      }
    }
    else if (moreFive){
      if (course_dict[i]["credit"].startsWith("6") || course_dict[i]["credit"].startsWith("7") || course_dict[i]["credit"].startsWith("8")|| course_dict[i]["credit"].includes("10")){
        list_five.push(course_dict);
      }
    }
    if (five == false && lessFive == false && moreFive == false){
      list_five.push(course_dict);
    }
    if (bsc){
      if (course_dict[i]["level"].includes("Bachelor") || course_dict[i]["level"].includes("Basic") || course_dict[i]["level"].includes("bachelor")|| course_dict[i]["level"].includes("Kandidaattitaso")|| course_dict[i]["level"].includes("Kandidaattiopinnot")|| course_dict[i]["level"].includes("kandidaattiopinnot")){
        list_level.push(course_dict);
      }
    }
    else if (msc){
      if (course_dict[i]["level"].includes("Master") || course_dict[i]["level"].includes("Advanced")|| course_dict[i]["level"].includes("advanced")|| course_dict[i]["level"].includes("master")|| course_dict[i]["level"].includes("MSc")|| course_dict[i]["level"].includes("M.Sc.")|| course_dict[i]["level"].includes("syventävät")){
        list_level.push(course_dict);
      }
    }
    if (bsc == false && msc == false){
      list_level.push(course_dict);
    }
    if (summer){
      if (course_dict[i]["period"].includes("kesä") || course_dict[i]["period"].includes("summer")){
        list_time.push(course_dict);
      }
    }
    else if (autumn){
      if (course_dict[i]["period"].startsWith("II") || course_dict[i]["period"].startsWith("I")){
        list_time.push(course_dict);
      }
    }
    else if (spring){
      if (course_dict[i]["period"].startsWith("III") || course_dict[i]["period"].startsWith("IV")|| course_dict[i]["period"].startsWith("V")){
        list_time.push(course_dict);
      }
    }
    if (summer == false && autumn == false && spring == false){
      list_time.push(course_dict);
    }
    else {
      list_level.push(course_dict);
      list_time.push(course_dict);
      list_five.push(course_dict);
    }
  }
  var data = [list_five, list_time, list_time];
  var result = data.reduce((a, b) => a.filter(c => b.includes(c)));
  // result = intersection(list_five,list_time,list_time);
  return result;
}


function filter_init(){

  var course_dict = getList();
  // var course_dict = lista;
  var listed_text = [];
  var final_list = [];

  var english = document.getElementById("english").checked;
  var completeBeginner = document.getElementById("completeBeginner").checked;
  var doctor = document.getElementById("doctor").checked;

  for (var i = 0; i < course_dict.length; i++) {

    if (completeBeginner){
      if (course_dict[i]["pre"].includes("Ei esitietovaatimuksia") || course_dict[i]["pre"].includes("No prerequisite") || course_dict[i]["pre"].includes("None") || course_dict[i]["pre"].includes("No ") && (!(course_dict[i]["pre"].includes("sufficient")))){
        beginner_courses.push(course_dict[i]);
      }
    }
    if (english){
      if (course_dict[i]["kieli"].startsWith('En')){
        if (doctor){
          listed_text.push(course_dict[i]);
        }
        else {
          if (!(course_dict[i]["name"].includes('Doctoral')) && !(course_dict[i]["level"].includes('octoral')) && !(course_dict[i]["level"].includes('post')) && !(course_dict[i]["level"].includes('jatko'))){
            listed_text.push(course_dict[i]);
          }
        }
      }
    }
    else if (doctor){
      listed_text.push(course_dict[i]);
    }
    else {
      if (!(course_dict[i]["name"].includes('Doctoral')) && !(course_dict[i]["level"].includes('octoral')) && !(course_dict[i]["level"].includes('post')) && !(course_dict[i]["level"].includes('atko'))){
        listed_text.push(course_dict[i]);
      }
    }
  }
  if (beginner_courses.length > 0){
     final_list = beginner_courses;
  }
  else {
    final_list = listed_text;
  }
  return final_list;
}
