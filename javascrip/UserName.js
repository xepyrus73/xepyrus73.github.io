/***********************************************************************

      Program ID    :   UserName.js

      Description   :   �ۼ��ڸ� �Է� üũ

      Special Logic :   none

***********************************************************************
                                  MODIFICATION LOG

          DATE            AUTHORS                DESCRIPTION
       -----------    -----------------      -------------------
        2000/09/26        �籤��                 Initial

***********************************************************************/

function checkUserName()
{
    var strUserNameBlankMsg = '�ۼ��� �Է��ϼ���.';

    if(this.isBlank()) {
        alert(strUserNameBlankMsg);
        return false;
	 }

    return true;
}

function objUserName(theField)
{
    this.field = theField;
    this.isBlank = isBlank;
    this.checkItem = checkUserName;

}
