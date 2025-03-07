
//빈 값 점검
function isBlank() 
{
  var args = isBlank.arguments;

	if (args.length == 0)	
	{   
	   theObj = this.field;
	} 
	else 
	{
     theObj = args[0];
	}

    var Whitespace = /^\s+$/;

  	if(theObj.type == 'select-one')
	{
     data = theObj[theObj.selectedIndex].value;
	} 
	else 
	{
  	 data = theObj.value;
	}

  var len = data.length;
    if (len == 0 || Whitespace.test(data)) 
    {
	   theObj.value = "";
       theObj.focus();
       return true;

		 } 
		 else 
		 {
	       return false;
		 }
}

// 실수 (음수포함) 값 점검
function isFloat() 
{
  var args = isFloat.arguments;

	if (args.length == 0)	{
	   
	   theObj = this.field;

	} 
	else 
	{
       theObj = args[0];
	}
    var Number = /^(\+|-)?\d+\.?\d*$/;
    var data = theObj.value;
    var check = Number.test(data);

    if (check) return true;
    theObj.focus();
    theObj.select();
    return false;
}

function isNegative() {
    var args = isNegative.arguments;

	if (args.length == 0)	{
	   
	   theObj = this.field;

	} else {

       theObj = args[0];

	}
    var Number = /^(\-)?[0-9]+$/;
    var data = theObj.value;
    var check = Number.test(data);
    if (check || data.length == 0) return true;
    theObj.focus();
    theObj.select();
    return false;
}


// 양의 정수만 점검

function isNumber() {

    var args = isNumber.arguments;

	if (args.length == 0)	{
	   
	   theObj = this.field;

	} else {

       theObj = args[0];

	}

    var Number = /^\d+$/;
    var data = theObj.value;
    var check = Number.test(data);

    if (check) return true;
    theObj.focus();
    theObj.select();
    return false;
}




//8진수 점검 
function isOcta() {

    var args = isOcta.arguments;

	if (args.length == 0)	{
	   
	   theObj = this.field;

	} else {

       theObj = args[0];

	}

    var Octa = /^[0-7]+$/;
    var data = theObj.value;
    var check = Octa.test(data);

    if (check) return true;
    theObj.focus();
    theObj.select();
    return false;
}

//8진수 점검 
function isHexa() 
{
    var args = isHexa.arguments;
    if (args.length == 0){
        theObj = this.field;
    }
    else {
        theObj = args[0];
    }

    var Hexa = /^[0-9a-fA-F]+$/;
    var data = theObj.value;
    var check = Hexa.test(data);

    if (check) return true;
    theObj.focus();
    theObj.select();
    return false;
}
//알파벳 점검

function isAlpha() {

    var args = isAlpha.arguments;

	if (args.length == 0)	{
	   
	   theObj = this.field;

	} else {

       theObj = args[0];

	}

    var Alphabetic = /^[a-zA-Z]+$/;
    var data = theObj.value;
    var check = Alphabetic.test(data);
    if (check) return true;
    theObj.focus();
    theObj.select();
    return false;
}

// 알파벳 + 숫자

function isAlphaNumeric() {

    var args = isAlphaNumeric.arguments;

	if (args.length == 0)	{
	   
	   theObj = this.field;

	} else {

       theObj = args[0];

	}
    var Alphanumeric = /^[a-zA-Z0-9]+$/;
    var data = theObj.value;
    var check = Alphanumeric.test(data);
    if (check) return true;
    theObj.focus();
    theObj.select();
    return false;
}

// 메일 점검

function isEmail() {
    var args = isEmail.arguments;

	if (args.length == 0)	
	{   
	   theObj = this.field;

	}
	else 
	{
       theObj = args[0];
	}

    var Email = /^.+\@.+\..+$/;
    var data = theObj.value;
    var check = Email.test(data);
    if (check) return true;
    theObj.focus();
    theObj.select();
    return false;
}

// 날짜 점검 

function isDate() 
{
    var args = isDate.arguments;

    if (args.length == 0){
        theObj = this.field;
    } 
    else {
        theObj = args[0];
    }
    var data = theObj.value;
    var len = theObj.value.length;
	
	if(len != 0 ) {
        var check = validDate(data);
        if ( check )  return true;
        theObj.focus();
        theObj.select();
        return false;
	} else {
        return true;
	}
}

// 지급년월(날짜) 점검  : YYYYMM

function isDate02() 
{
    var args = isDate02.arguments;

    if (args.length == 0){
        theObj = this.field;
    } 
    else {
        theObj = args[0];
    }
    var data = theObj.value;
    var len = theObj.value.length;
	if(len != 0 ) {
        var check = validDate02(data);
        if ( check )  return true;
        theObj.focus();
        theObj.select();
        return false;
	} else {
        return false;
	}
}

// 주민등록 뒷자리 점검

function isResident() {
    var args = isResident.arguments;

	if (args.length == 0)	{
	   
	   theObj = this.field;

	} else {

       theObj = args[0];

	}
   var jumin1 = document.forms[0].elements[checkIndex(theObj)-2].value;
   var data = theObj.value;
   var len = theObj.value.length;
   var check = checkResident(jumin1,data);
   
   if ( (check && len == 7)|| data.length == 0)  return true;
   theObj.focus();
   theObj.select();
   return false;

}


// 파일 점검

function isFile() 
{
    var args = isFile.arguments;

	if (args.length == 0)	{
	   
	   theObj = this.field;

	} else {

       theObj = args[0];

	}
	if(theObj.value.substring(1,3) != ":\\")  { 
      obj.focus();
      obj.select();
      return false;
    } else   {

		return true;

	}
  

}


// 글자 초과 점검
function isOverLimit() {

    var args = isOverLimit.arguments;

	if (args.length < 2)	{
	   
	   theObj = this.field;
	   max = args[0];

	} else {

       theObj = args[0];
	   max    = args[1];

	}

	value_len = theObj.value.length;

	if(value_len > max) {

		alert(max + " 자 이상은 저장 할 수 없습니다.");
		theObj.focus();
		theObj.select();

		return true;

	}

	return false;
 
}

// 문자수 점검(우편번호나 주민번호와 같이 자리수가 일정한 자료의 점검)

function isCorrectLength() {

    var args = isCorrectLength.arguments;

	if (args.length < 2)	{
	   
	   theObj = this.field;
	   len = args[0]; 

	} else {

     theObj = args[0];
	   len    = args[1];

	}

    value_len = theObj.value.length;
	if(value_len == 0) return true;
	if(value_len != len) {

		theObj.focus();
		theObj.select();

		return false;

	}

	return true;

}

// 값의 범위 점검

function isCorrectRange() {

    var args = isCorrectRange.arguments;

	if (args.length < 3)	{
	   
	   theObj = this.field;
	   min = args[0];
	   max = args[1];

	} else {

       theObj = args[0];
	   min    = args[1];
       max    = args[2];

	}

    data = theObj.value
	if(data < min || data > max) {

		theObj.focus();
		theObj.select();

		return false;

	}

	return true;

}

// 소수점 앞뒤 자리수 점검

function isCorrectNum() {

  var args = isCorrectNum.arguments;
	var re = /^(\d+)(\.?)(\d*)$/;
    var ren = /[^0-9.]/g;
	if (args.length < 3)	{
	   
	   theObj = this.field;
	   beforeCnt = args[0];
	   afterCnt  = args[1];

	} else {

       theObj    = args[0];
	   beforeCnt = args[1]; //소수점 앞자리수
       afterCnt  = args[2]; //소수점 뒷자리수

	}

    data    = theObj.value;
	if(!re.test(data)) {
   		theObj.focus();
		theObj.select();
	    return false ;
	}
	
    beforeStr  =  RegExp.$1;
	dot = RegExp.$2;
    afterStr   =  RegExp.$3;
    if(dot.length !=0 ) {
        if (beforeStr.length > beforeCnt) {
  		theObj.focus();
		theObj.select();

          return false;
        }    
        
        if (afterStr.length > afterCnt)   {
  		  theObj.focus();
		  theObj.select();
          return false;
        }
	} else {
        if((beforeStr.length + afterStr.length ) > beforeCnt) {
  		  theObj.focus();
		  theObj.select();
          return false;
		}
	}

	return true;

}

/*****************************************************************************

	입력된 자료가 Decimal(5,1) 인지를 검사한다. 

*****************************************************************************/
// 소수점 앞뒤 자리수 점검

function isCorrectFloatNum() 
{
    var args = isCorrectFloatNum.arguments;

    if (args.length < 3){
        theObj = this.field;
        beforeCnt = args[0];
        afterCnt  = args[1];
    }
    else {
        theObj    = args[0];
        beforeCnt = args[1]; //소수점 앞자리수
       afterCnt  = args[2]; //소수점 뒷자리수
    }    
    
    if(!isPlusFloat(theObj)) {
        return false;
    }   
        
    data    = theObj.value;
    ptindex = data.indexOf('.');
    if (ptindex == -1){
        beforeStr  =  data;
        afterStr   =  0;
    }
    else{
        beforeStr  =  data.substring(0, ptindex);
        afterStr   =  data.substring(ptindex+1, data.length);
    }
    
    if (beforeStr.length > beforeCnt) {
          return false;
    }    
        
    if (afterStr.length > afterCnt)   {
          return false;
    }
    return true;
}

// 실수 (음수포함 하지 않음) 값 점검
function isPlusFloat() {
    var args = isPlusFloat.arguments;

	if (args.length == 0)	{
	   
	   theObj = this.field;

	} else {

       theObj = args[0];

	}
    var Number = /^\d+\.?\d*$/;
    var data = theObj.value;
    var check = Number.test(data);

    if (check) return true;
    theObj.focus();
    theObj.select();
    return false;
}


// 체크상자의 체크 유무 점검

function isChecked() {

    var chkFlag;
	var len;
	var obj;
	var multiFlag;
	var args = isChecked.arguments;

	if (args.length == 0)	{
	   
	   theObj = this.field;

	} else {

       theObj = args[0];

	}


	chkFlag = false;
    len = theObj.length;

	if (len == null) {

       obj = theObj;
	   multiFlag = false;
	
	} else {
       
	   obj = theObj[0];
	   multiFlag = true;

	}

	if(!multiFlag) {

        if (theObj.checked)  {
           chkFlag = true;
       }

	} else {

	
	    for (i=0;i< theObj.length ;i++ ) {

           if (theObj[i].checked)  {

               chkFlag = true;

           }     
	    }
    
	}

	if(!chkFlag) {

		alert("하나이상 선택하셔야 합니다.");

		obj.focus();

		return false;

	}

	return true;


}



//---------------------------------------------------------------


function validDate(date) 
{
    if(date.length == 8 ) {
        year  = date.substring(0,4);
        month = date.substring(4,6);
        day   = date.substring(6,8);
    } 
    else if ( date.length == 6)	{
        year  = date.substring(0,2);
        month = date.substring(2,4);
        day   = date.substring(4,6);
    } 
    else {
        return false;
    } 

    if (year < '1900') return false;
    if (month < '01' || month > '12') return false;
    if (day < '01' || day > '31') return false;
    switch (month) {
        case '02' :  if ((year%4 == 0 && year%100 != 0) || year%400 == 0) { 
                    if (day > 29) return false;
                  } else {
                    if (day > 28) return false;
                  }
                  break;  
        case '04' : 
        case '06' : 
        case '09' : 
        case '11' : if (day > 30) return false;
    }

    return true;
}

// 지급년월(날짜) 점검에사 사용 : YYYYMM

function validDate02(date) 
{
    if ( date.length == 6)	{
        year  = date.substring(0,4);
        month = date.substring(4,6);
    } 
    else {
        return false;
    } 

    if (year < 1900) return false;    
    if (month < 1 || month > 12) return false;

    return true;
}

// 주민번호

function checkResident(jumin1,jumin2) {

    var ju=jumin1; //주민번호앞의 7자리
    var ju1=jumin2; // 주민번호 뒤의 7자리
    juid = new Array(13);

    for(var i=0;i<6;i++) juid[i]=ju.substring(i,i+1);
    for(i=0;i<7;i++) juid[i+6]=ju1.substring(i,i+1);
    for(var sum=0,i=0;i<12;i++) sum+=juid[i]*((i>7)?(i-6):(i+2));
    var mod=11-sum%11;
    if(mod>=10) mod-=10;
    if(mod==juid[12])  return true;
    return false;
} 



function autoMoveTab(thisObj,nextObj,len)     {  
//  -->  onKeyUP event : field 자동 이동
    if (thisObj.value.length==len || window.event.keyCode == "13") {   
        nextObj.focus() ;
        return;
    }
}  

/**********************************************************************

	function name : saveMessage()
	parameters :																 
 		loc : 저장 후 이동할 page			 
 	return : void
 	Description: Insert 성공  이후 에 call

***********************************************************************/

function saveMessage(loc) {

	alert("정상적으로 저장되었습니다.");
	location = loc;

}


/******************************************************************************

	function name :  changeMessage()
	parameters :																 
 		loc : 수정 후 이동할 page			 
 	return : void
 	Description: Update 성공  이후 에 call

*****************************************************************************/

function changeMessage(loc) {

	alert("정상적으로 수정되었습니다.");
	location = loc;

}

/******************************************************************************

	function name : deleteMessage()
	parameters :																 
 		loc : 삭제 후 이동할 page			 
 	return : void
 	Description: Update(Delete) 성공  이후 에 call

*****************************************************************************/


function deleteMessage(loc) {

	alert("정상적으로 삭제되었습니다.");
	location = loc;

}

/*****************************************************************************

	function name : ChangePage()
	parameters :																 
 		loc : form에 대해 action이 일어나는 프로그램의 디렉토리+이름			 
 	return : void
 	Description:페이지 변환이 일어나는 아이콘 및 ListBox Click 시 

*****************************************************************************/

function changePage(frm, page ,loc )
{
  // 현재 페이지의 INPUT field name이 CurPage 로 지정되어 있어야 한다.

	frm.CurPage.options[frm.CurPage.selectedIndex].value = page;
	frm.method = 'post';
	frm.action = loc;
	frm.submit();
}

// 윈도우 오픈
function openWin(width,height,loc)
{
	var w_status = "toolbar=no,location=0,directories=no,status=no,menubar=0,scrollbars=yes,resizable=0,width=" + width + ", height=" + height;
	window.open(loc,"openwin",w_status);

}

function changeForm(loc,tgt,frm)
{
    if(tgt == '' || tgt == null) {
		frm.target = '_self';
    } 
	else {
		frm.target = tgt;
    }
	frm.method = 'post'	;
	frm.action = loc;
	frm.submit();      
}

// 현재 element의 Index + 1

function checkIndex(theObj) {

    for (i=0;i < document.forms[0].elements.length ; i++ )
    {
	    if(theObj == document.forms[0].elements[i] ) {
             return i+1;
		}
    }
    
}

//숫자데이터에 콤마 찍기

function showComma(theObj) 
{

    var data = theObj.value;
	var len  = data.length;
	if(len>3) {
	  var rest = len%3;
	  var commaCnt = (len - rest)/3;
	  if(rest == 0) {
         temp = data.substr(0,3);
		 commaCnt -- ;
		 rest = 3 ;
	  } else {

        temp = data.substr(0,rest);
	  }

      for(i=0;i<commaCnt;i++) {

        temp = temp + "," + data.substr(rest,3);
		rest+=3;

	  }

	  theObj.value = temp;

	}

}

//금액(콤마)형 리턴
function dispCurr(data) 
{   
    var flag = '';
    data = data.toString();
    if(data.substr(0,1) == '-') {
        data = data.substr(1,data.length -1);
		flag = '-';
	}
	var len  = data.length;
	if(len>3) {
	  var rest = len%3;
	  var commaCnt = (len - rest)/3;
	  if(rest == 0) {
         temp = data.substr(0,3);
		 commaCnt -- ;
		 rest = 3 ;
	  } else {

        temp = data.substr(0,rest);
	  }

      for(i=0;i<commaCnt;i++) {

        temp = temp + "," + data.substr(rest,3);
		rest+=3;

	  }

	  return flag + temp;
	} 
	return data;
}
//숫자데이터 콤마 삭제하기
function hideComma(theObj) {

    var data = theObj.value;
    var len  = data.length;
    var temp = "";
	for ( i=0;i<len;i++) {
      if( data.substr(i,1) != ",") {

          temp = temp + data.substr(i,1);

	   }
	}

	theObj.value = temp;
}

function showCurrency(Money) 
{
	var Money;
	
	var len  = Money.length;
	
	if(len>3) {
	  var rest = len%3;
	  var commaCnt = (len - rest)/3;
	  if(rest == 0) {
         temp = Money.substr(0,3);
		 commaCnt -- ;
		 rest = 3 ;
	  } else {

        temp = Money.substr(0,rest);
	  }

      for(i=0;i<commaCnt;i++) {

        temp = temp + "," + Money.substr(rest,3);
		rest+=3;

	  }

	  Money = temp;

	}

}

function dispNumb(Data,Length) {
    var tempLength;
	var ZeroCnt;
	var BeforeSpace = "";
    var result;
    
    if(Data == null || Data == "" || Data == "0") {
        result = "&nbsp;";
        return result;
    }
        
    tempLength = Data.length;
    ZeroCnt = Length - tempLength;
   
    for(i = 0; i < ZeroCnt; i++) {
        BeforeSpace = BeforeSpace + "0";
    }
    result = BeforeSpace + Data
	return result;
}