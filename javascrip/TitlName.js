/***********************************************************************

      Program ID    :   TitlName.js

      Description   :   �ۼ��ڸ� �Է� üũ

      Special Logic :   none

***********************************************************************
                                  MODIFICATION LOG

          DATE            AUTHORS                DESCRIPTION
       -----------    -----------------      -------------------
        2000/09/26        �籤��                 Initial

***********************************************************************/

function checkTitlName()
{
    var strTitlNameBlankMsg = '������ �Է��ϼ���.';

    if(this.isBlank()) {
        alert(strTitlNameBlankMsg);
        return false;
	 }

    return true;
}

function objTitlName(theField)
{
    this.field = theField;
    this.isBlank = isBlank;
    this.checkItem = checkTitlName;

}
