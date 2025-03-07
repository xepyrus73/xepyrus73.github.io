
/***********************************************************************
 
      Program ID    :   easy1031.js
 
      Description   :   
 
      Special Logic :   none
 
************************************************************************
                                  MODIFICATION LOG
 
          DATE            AUTHORS                DESCRIPTION
       -----------    -----------------      -------------------
        00/10/26           ������                 Initial
 
***********************************************************************/
 
/**********************************************************************
 
    Function name : checkField(frm)
    Parameters    :	form�̸�		
    Return        : boolean (����:true,������:false)
    Description   : �� �ʵ忡 ���� Validation ����
 
**********************************************************************/
 
function checkField(frm) 
{ 
	/*if (isBlank(frm.p_bigx_code)){
	     alert("��ǰ���� �ʼ��Է��Դϴ�.");
	     frm.p_bigx_code.focus();
	     return false;
	 }*/
	 
    UserName =  new objUserName(frm.p_user_name);
 
    if(!UserName.checkItem()) {  
		   return false;
     }
     
    TitlName =  new objTitlName(frm.p_titl_name);
 
    if(!TitlName.checkItem()) {  
		   return false;
     }
    
    BodyText =  new objBodyText(frm.p_body_text);
 
    if(!BodyText.checkItem()) {  
		   return false;
     }


    return true;
 
 
} 
 
/**********************************************************************
 
    function name : updateForm()
    Parameters :
      loc : form�� ���� action�� �Ͼ�� ���α׷��� ���丮+�̸�
      tgt : action �� �Ͼ�� target (ex_: _parent,_self,_top,_blank)
      frm : form �̸�
    Return     : void
    Description:����(����) ������ Click ��

**********************************************************************/
 
function updateForm(loc,tgt,frm) 
{
	
    if( checkField(frm) ) { // �� INPUT field�� ������ �Է����ǿ� �����ϴ� �� ����
        if(tgt=='' || tgt == null) {
			  frm.target = '_self';
        } else {
			  frm.target = tgt;
        }
    frm.method = 'post'	;
    frm.action = loc;
    frm.submit();  
    } else {
        return;
    }
}
/**********************************************************************
 
    function name : deleteForm()
    Parameters :
      loc : form�� ���� action�� �Ͼ�� ���α׷��� ���丮+�̸�
      tgt : action �� �Ͼ�� target (ex_: _parent,_self,_top,_blank)
      frm : form �̸�
    Return     : void
    Description:���� ������ Click ��

**********************************************************************/
 
function deleteForm(loc,tgt,frm) 
{ 
    if( confirm('������ �����Ͻðڽ��ϱ�?') ) {
        if(tgt=='' || tgt == null) {
			  frm.target = '_self';
        } else {
			  frm.target = tgt;
        }
    frm.method = 'post'	;
    frm.action = loc;
    frm.submit();  
    } else {
  	 return;
    }
}

