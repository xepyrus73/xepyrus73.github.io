 
//�� �� ����
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
       if(theObj.type != "hidden") {
	      theObj.focus();
	   }
       return true;

	} 
	else 
	{
	   return false;
	}
}

// �Ǽ� (��������) �� ����
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


// ���� ������ ����

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

    if (check || data == "") return true;
    theObj.focus();
    theObj.select();
    return false;
}

//8���� ���� 
function isOcta() 
{
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

//8���� ���� 
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
//���ĺ� ����

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

// ���ĺ� + ����

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

// ���� ����

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

// ��¥ ���� 

function isDate() 
{
    var args = isDate.arguments;

    if (args.length == 0)
    {
        theObj = this.field;
    } 
    else 
    {
        theObj = args[0];
    }
    var data = theObj.value;
    var len = theObj.value.length;
	
	if(len != 0 ) 
	{
        var check = validDate(data);
        if ( check )  return true;
        if(theObj.type == "text") 
        {
        	theObj.focus();
        	theObj.select();
        }
        return false;
	} 
	else 
	{
        return true;
	}
}

function isDate2() 
{
    var args = isDate2.arguments;

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
        return false;
	} else {
        return true;
	}
}


// ���޳��(��¥) ����  : YYYYMM

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

// �ֹε�� ���ڸ� ����

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


// ���� ����

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


// ���� �ʰ� ����
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

		alert(max + " �� �̻��� ���� �� �� �����ϴ�.");
		theObj.focus();
		theObj.select();

		return true;

	}

	return false;
 
}

// ���ڼ� ����(�����ȣ�� �ֹι�ȣ�� ���� �ڸ����� ������ �ڷ��� ����)

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

//���� ���� ����
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

// �Ҽ��� �յ� �ڸ��� ����

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
	   beforeCnt = args[1]; //�Ҽ��� ���ڸ���
       afterCnt  = args[2]; //�Ҽ��� ���ڸ���

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

	DB Field Data Type�� Decimal(M,N) ������ �˻��Ѵ�. 
	    
	    --> (EX_01)  DB Field Data Type :  Decimal(5,1) �̸�
	    	isCorrectFloatNum(3,1) �� ȣ�� !

	    --> (EX_02)  DB Field Data Type :  Decimal(10,2) �̸�
	    	isCorrectFloatNum(7,2) �� ȣ�� !

*****************************************************************************/
// �Ҽ��� �յ� �ڸ��� ����

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
        beforeCnt = args[1]; //�Ҽ��� ���ڸ���
       afterCnt  = args[2]; //�Ҽ��� ���ڸ���
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

// �Ǽ� (�������� ���� ����) �� ����
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


// üũ������ üũ ���� ����

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

		alert("�ϳ� �̻� �����ϼž� �մϴ�.");

		if(obj.disabled != true)
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

// ���޳��(��¥) ���˿��� ��� : YYYYMM

function validDate02(date) 
{
    if ( date.length == 6)	{
        year  = date.substring(0,4);
        month = date.substring(4,6);
    } 
    else {
        return false;
    } 

    if (year < '1900') return false;
    if (month < '01' || month > '12') return false;

    return true;
}

// �ֹι�ȣ
function checkResident(jumin1,jumin2) {

    var ju=jumin1; //�ֹι�ȣ���� 6�ڸ�
    var ju1=jumin2; // �ֹι�ȣ ���� 7�ڸ�
    juid = new Array(13);

    for(var i=0;i<6;i++) juid[i]=ju.substring(i,i+1);
    for(i=0;i<7;i++) juid[i+6]=ju1.substring(i,i+1);

    if(juid[6]=="1" || juid[6]=="2")
    {    
        for(var sum=0,i=0;i<12;i++) sum+=juid[i]*((i>7)?(i-6):(i+2));
        var mod=11-sum%11;
        if(mod>=10) mod-=10;
        if(mod==juid[12])  return true;
        return false;
    }    
    else if(juid[6]=="3" || juid[6]=="4")
    {
        return true;
    }    
    else
    {
        return false;
    }
} 

// key�Է� �Ϸ�� ���� �ʵ�� Ŀ�� �̵�
function autoMoveTab(thisObj,nextObj,len)     {  
    if (window.event.keyCode == "13") {   
        nextObj.focus() ;
        return;
    }
}

// key�Է� �Ϸ�� ���� �ʵ�� Ŀ�� �̵�
function autoMoveTab2(thisObj,nextObj,len) {
	if(thisObj.value.length == len) {
        nextObj.focus() ;
		return;
	}
}  

/**********************************************************************

	function name : saveMessage()
	parameters :																 
 		loc : ���� �� �̵��� page			 
 	return : void
 	Description: Insert ����  ���� �� call

***********************************************************************/
function saveMessage(loc) 
{
    // alert("���������� ����Ǿ����ϴ�.");
    location = loc;

}

/******************************************************************************

	function name :  changeMessage()
	parameters :																 
 		loc : ���� �� �̵��� page			 
 	return : void
 	Description: Update ����  ���� �� call

*****************************************************************************/
function changeMessage(loc) {

	//alert("���������� �����Ǿ����ϴ�.");
	location = loc;

}

/******************************************************************************

	function name : deleteMessage()
	parameters :																 
 		loc : ���� �� �̵��� page			 
 	return : void
 	Description: Update(Delete) ����  ���� �� call

*****************************************************************************/
function deleteMessage(loc) {

	alert("���������� �����Ǿ����ϴ�.");
	location = loc;

}


/*****************************************************************************

	function name : ChangePage()
	parameters :																 
 		loc : form�� ���� action�� �Ͼ�� ���α׷��� ���丮+�̸�			 
 	return : void
 	Description:������ ��ȯ�� �Ͼ�� ������ �� ListBox Click �� 

*****************************************************************************/
function changePage(frm, page ,loc )
{
  // ���� �������� INPUT field name�� CurPage �� �����Ǿ� �־�� �Ѵ�.
   
	frm.CurPage.options[frm.CurPage.selectedIndex].value = page;
	frm.target = '_self';
	frm.method = 'post';
	frm.action = loc;
	frm.submit();
}

function movePage(frm, page ,loc )
{
  // ���� �������� INPUT field name�� CurPage �� �����Ǿ� �־�� �Ѵ�.
   
	frm.CurPage.value = page;
	frm.target = '_self';
	frm.method = 'post';
	frm.action = loc;
	frm.submit();
}




// ������ ����
function openWin(width,height,loc)
{
	var w_status = "toolbar=no,location=0,directories=no,status=no,menubar=0,";
	    w_status += "scrollbars=yes,resizable=0,left=0,top=0,width=" + width + ", height=" + height;
	var openw = window.open(loc,"openwin",w_status);
//    var w = (screen.availWidth - width)/2;
//    var h = (screen.availHeight - height)/2;

//    openw.moveTo (w, h);
	return openw;
}

/* �ٸ� �������� �̵� */
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

// ���� element�� Index + 1
function checkIndex(theObj) {

    for (i=0;i < document.forms[0].elements.length ; i++ )
    {
	    if(theObj == document.forms[0].elements[i] ) {
			 if ( i == document.forms[0].elements.length - 1) {
	             return i;
			 }		
             return i+1;
		}
    }
    
}

// key�Է� �Ϸ�� ���� �ʵ�� Ŀ�� �̵�
function getNextObject(theField,frm,len) {
    var nTabIndex = theField.tabIndex;
    var nLength   = theField.value.length;
    if (nLength == len) {
	    for (i=0;i < frm.elements.length ; i++ )
	    {
			if(nTabIndex + 1 == frm.elements[i].tabIndex ) {

				if (frm.elements[i] != null) {
				frm.elements[i].focus();
				}
			}
	    }
	}
}  



//�ݾ�(�޸�)�� ����
function dispCurr(data) 
{   
    var flag = '';
	var tail = '';
    data = data.toString();

    if(data.substr(0,1) == '-') {
        data = data.substr(1,data.length -1);
		flag = '-';
	}

	var index = data.indexOf('.');
	if(index >= 0) {
		tail = data.substring(index, data.length);
		data = data.substring(0,index);
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
	  return flag + temp + tail;
	} 
	return flag + data + tail;
}

//���ڵ����Ϳ� �޸� ���
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

//���ڵ����� �޸� �����ϱ�
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

/* ���̸�ŭ ���� �տ� 0 �ٿ��ֱ� */
function dispNumb(Data,Length) {
    var tempLength;
	var ZeroCnt;
	var BeforeSpace = "";
    var result;
	Data = Data.toString();
    
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

//��¥�� �����ֱ�( YYYY/MM/DD )
function dispDate(data)
{
    var yearStr;
    var monthStr;
    var dayStr;
    var Result;
    
    if(data == null || data == "" || data == " ") {
        Result = "&nbsp;";
		return Result;
	}
	
    if(data.length == 6) {
        yearStr = data.substring(0,4);
        monthStr = data.substring(4,6);
        Result = yearStr + "/" + monthStr;
		return Result;
	}
	else if(data.length == 8) {
        yearStr = data.substring(0,4);
        monthStr = data.substring(4,6);
        dayStr = data.substring(6,8);
        Result = yearStr + "/" + monthStr + "/" + dayStr;
		return Result;
	}
}

//���� ġȯ
function replace(Data,str1,str2) 
{
    var len  = Data.length;
    var temp = "";
	for ( i=0;i<len;i++) {
		if( Data.substr(i,1) != str1)
			temp = temp + Data.substr(i,1);		
		else
			temp = temp + str2;
	}

	return temp;
}

/*
     �����Է½� �޸� �ڵ�ǥ��
*/

function reverseIt(str) {
   if (!str) return; // nothing to change
   var rstr = '';
   for (i=str.length-1;i>=0;i--) rstr += str.charAt(i);
   return rstr;
}

function thousands(str) 
{
   cnt=0;
   var minusFlag = false;
   var frstval, scndval, realStr;

   var saveStr = "" + str;
   if (saveStr.length < 4) return str;

   frstval = "";
   for (var i=0;i<saveStr.length;i++) {
      ch = saveStr.charAt(i);
      if (ch == "-") {
          minusFlag = true;
      }
      else if (ch == "."){
          break;
      }
      else{
          frstval += ch;
      }
   }

   scndval="";
   if (i < saveStr.length){
       for(j=i; j < saveStr.length; j++){
           ch = saveStr.charAt(j);
           scndval += ch;
       }
   }
      
   var revStr = reverseIt(frstval);
   var newStr = '';
   for (var i=0;i<revStr.length;i++) {
      if (i>0 && (i%3)==0) newStr += ',';
      newStr += revStr.charAt(i);
   }

   realStr = reverseIt(newStr)

   if (minusFlag){
       realStr = "-"+realStr;
   }

   if (scndval.length > 0){
       realStr = realStr + scndval;       
   }

   return realStr;
}

function clear(str) 
{
  newStr="";
  for (var i=0;i<str.length;i++) {
      if (str.charAt(i) != ",")
          newStr += str.charAt(i);
   }
   return newStr;
}

function validnum(obj) 
{
   
/*
    code = window.event.keyCode;
    alert(code);
*/
    newstr = clear(obj.value);
    obj.value = thousands(newstr);
} 

// ���� ���ϱ� (����[��������],�����ϼ�) From Hojin
function addDate(data,days) {
	var yyyy = parseInt(data.substr(0,4));
	var mm = parseInt(data.substr(4,2));
	var dd = parseInt(data.substr(6,2));
	var yymmdd = new Date(yyyy,mm,dd + days);
	return yymmdd.getYear() + dispNumb2(yymmdd.getMonth(),2) + dispNumb2(yymmdd.getDate(),2);
}

//yyyymm ���� �޼� ���ϱ� from hojin + ��ȫ�� ����
function addMonth(data,months) 
{
	var yyyy = parseFloat(data.substring(0,4));
	var mm = parseFloat(data.substring(4,6));
	mm += parseFloat(months);
    
	var yyyymm = new Date(yyyy,mm,0);	
	return yyyymm.getFullYear() + dispNumb2(yyyymm.getMonth()+1,2);
}

function dispNumb2(data,length) 
{
	var space = "";
	data = data.toString();
    zeroCnt = parseInt(length) - parseInt(data.length);
    for(i=0;i<zeroCnt;i++) 
    {
     space += "0";
	}
	data = space + data;
	return data;
}

function dispResi(data) {
	data = data.toString();
	var len = data.length;
	var result = "";
	
	if(len == 13)
		data = data.substring(0,6) + "-" + data.substring(6,13);
	else if(len == 10)
		data = data.substring(0,3) + "-" + data.substring(3,5) + "-" + data.substring(5,10);
	else
		data = "�ڵ尡 �ùٸ��� �ʽ��ϴ�";

	return data;
}

function convPyxx(totlArea)
{
    var temp;

    temp = parseFloat(clear(totlArea))*.3025;
	temp = parseInt(parseFloat(temp)*100+.5)
//	alert(parseFloat(temp)/100)
    return (parseFloat(temp)/100);
}

/**********************************************************************     
    Description   : �ݿø��ϴ� �Լ� (����,�Ҽ��ڸ���)
**********************************************************************/ 
function roundNumber(data, p)
{	
	var result;
	var x1 = x2 = "";
	
	if(p < 0) {
		alert("�ݿø� �ڸ����� �ùٸ��� �ʽ��ϴ�");
		return;
	}

	for(i = 0; i < p; i++)
		data = data * 10;

	data = Math.round(data);
	tmpData = data.toString();
	len = tmpData.length;	

	if(len <= p)
		x1 = "0";
	else
		x1 = tmpData.substring(0, len - p);

	if(len < p) {
		x2 = tmpData;
		for(i = 0; i < p - len; i++)
			x2 = "0" + x2;
	}
	else
		x2 = tmpData.substring(len - p, len);	

	if(p == 0)
		result = x1;
	else
		result = x1 + "." + x2;

	return result;
}