function calc_amount_mob() {
  let cur_exp_rate = parseFloat(document.getElementById("cur_exp_rate").value);
  let cur_level = parseInt(document.getElementById("cur_level").value);
  let mob_level = parseInt(document.getElementById("mob_level").value);
  let mob_exp = parseInt(document.getElementById("mob_exp").value);
  let world = document.getElementById("world").value;
  let mob_penalty = levelPenalty(cur_level, mob_level)

  let addition_exp = document.getElementById("total_additional_exp").innerHTML;

  if(world == "2"){
    mob_exp *= 2.3;
  }

  mob_exp *= mob_penalty

  mob_exp = Math.round(parseInt(mob_exp) * (addition_exp * 0.01));

  let cur_exp_amount = exp_table[cur_level] * (cur_exp_rate * 0.01); // 현재 경험치량

  let remain_exp = exp_table[cur_level] - cur_exp_amount;

  let amount_mob = Math.round(remain_exp / mob_exp);

  return amount_mob;
}

function get_total_additional_exp() {
  let a = parseFloat(document.getElementById("total_additional_exp").innerHTML);
  return a;
}

function get_exp_rate_all() {
  let exp_rate_all = [];
  exp_rate_all.push(
    parseFloat(document.getElementById("exp_coupon_rate").value)
  );
  exp_rate_all.push(
    parseFloat(document.getElementById("exp_weather_rate").value)
  );
  exp_rate_all.push(parseFloat(document.getElementById("ex_gold_rate").value));
  exp_rate_all.push(
    parseFloat(document.getElementById("exp_potion_rate").value)
  );
  exp_rate_all.push(parseFloat(document.getElementById("zero_rate").value));
  exp_rate_all.push(parseFloat(document.getElementById("elf_rate").value));
  exp_rate_all.push(parseFloat(document.getElementById("pendant_rate").value));
  exp_rate_all.push(parseFloat(document.getElementById("ring_rate").value));
  exp_rate_all.push(parseFloat(document.getElementById("burning_rate").value));
  exp_rate_all.push(parseFloat(document.getElementById("hyper_rate").value));
  exp_rate_all.push(parseFloat(document.getElementById("union_rate").value));
  exp_rate_all.push(parseFloat(document.getElementById("user_rate").value));
  exp_rate_all.push(parseFloat(document.getElementById("roon_rate").value));
  exp_rate_all.push(parseFloat(document.getElementById("loaded_rate").value));
  exp_rate_all.push(parseFloat(document.getElementById("pc_rate").value));
  return exp_rate_all;
}

function calc_additional_exp(additional_exp, type_additional_exp) {
  let total_additional_exp = 100;
  additional_exp = parseFloat(additional_exp);

  document.getElementById(type_additional_exp).value = additional_exp;
  let exp_rate_all = get_exp_rate_all();

  for (let i = 0; i < 15; i++) {
    total_additional_exp += exp_rate_all[i];
  }

  return total_additional_exp;
}

function do_jaehoek() {
  let two_hour = parseInt(document.getElementById("hunt_per6min").value) * 20;

  let mob_exp = parseInt(document.getElementById("mob_exp").value);

  if(document.getElementById("world").value == "2"){
    mob_exp *= 2.3
  }

  let hunt_per6min = parseInt(document.getElementById("hunt_per6min").value);

  if (!hunt_per6min) {
    document.getElementById("hunt_per6min").innerHTML = "";
  }

  let a_e =
    parseFloat(document.getElementById("total_additional_exp").innerHTML) *
    0.01;

  let cur_level = document.getElementById("cur_level").value;
  let exp_bar = exp_table[cur_level];

  return (((two_hour * mob_exp * a_e) / exp_bar) * 100).toFixed(3);
}

function validate_input_value() {
  let cur_level = parseInt(document.getElementById("cur_level").value);
  let cur_exp_rate = document.getElementById("cur_exp_rate").value;
  let mob_exp = parseInt(document.getElementById("mob_exp").value);
  let hunt_per6min = parseInt(document.getElementById("hunt_per6min").value);

  if (!hunt_per6min) {
    document.getElementById("hour").innerHTML = "";
    document.getElementById("2hour").innerHTML = "";
    document.getElementById("30min").innerHTML = "";
  }

  if (cur_level && cur_exp_rate != "" && mob_exp) {
    if (!hunt_per6min) {
      return 1;
    } else {
      return 0;
    }
  } else if (!cur_level) {
    alert("현재 레벨이 입력되지 않았습니다.");
    return 2;
  } else if (!cur_exp_rate) {
    alert("현재 경험치 %가 입력되지 않았습니다.");
    return 2;
  } else if (!mob_exp) {
    alert("몹 경험치가 입력되지 않았습니다.");
    return 2;
  }
}

function levelPenalty(char_l, mob_l){
  let diff = char_l - mob_l

  if (diff >=40){
    return 0.7
  }
  else if(diff <= 39 && diff >= 21){
    diff -= 20;
    return (90 - diff) * 0.01
  }
  else if(diff == 20 || diff == 19){
    return 0.95
  }
  else if(diff == 18 || diff == 17){
    return 0.96
  }
  else if(diff == 16 || diff == 15){
    return 0.97
  }
  else if(diff == 14 || diff == 13){
    return 0.98
  }
  else if(diff == 12 || diff == 11){
    return 0.99
  }
  else if(diff == 10){
    return 1
  }
  else if(diff <= 9 && diff >=5){
    return 1.05
  }
  else if(diff <= 4 && diff >=2){
    return 1.10
  }
  else if(diff <= 1 && diff >=-1){
    return 1.20
  }
  else if(diff <= -2 && diff >=-4){
    return 1.10
  }
  else if(diff <= -5 && diff >=-9){
    return 1.05
  }
  else if(diff <= -10 && diff >=-20){
    diff *= -1
    diff -= 10

    return (100 - diff) * 0.01
  }
  else if(diff <= 21 && diff >=-35){
    diff *= -1
    diff -= 21

    return (70 - (diff*4)) * 0.01
  }
  else if(diff <= 36 && diff >=-39){
    return 0.1
  }
  else{
    return 0
  }
}

function saveSetting(){
  console.log(123)
  let todayDate = new Date();
  expiredays = 30;
  todayDate.setDate(todayDate.getDate() + expiredays); 
  document.cookie = "hello=world; path=/; expires="+todayDate.toGMTString()+";";
}