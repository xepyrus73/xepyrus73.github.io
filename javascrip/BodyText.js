/***********************************************************************

      Program ID    :   BodyText.js

      Description   :   �ۼ��ڸ� �Է� üũ

      Special Logic :   none

***********************************************************************
                                  MODIFICATION LOG

          DATE            AUTHORS                DESCRIPTION
       -----------    -----------------      -------------------
        2000/09/26        �籤��                 Initial

***********************************************************************/

function checkBodyText()
{
    var strBodyTextBlankMsg = '������ �Է��ϼ���.';

    if(this.isBlank()) {
        alert(strBodyTextBlankMsg);
        return false;
	 }

    return true;
}

function objBodyText(theField)
{
    this.field = theField;
    this.isBlank = isBlank;
    this.checkItem = checkBodyText;

}
