/***********************************************************************

      Program ID    :   BodyText.js

      Description   :   작성자명 입력 체크

      Special Logic :   none

***********************************************************************
                                  MODIFICATION LOG

          DATE            AUTHORS                DESCRIPTION
       -----------    -----------------      -------------------
        2000/09/26        양광진                 Initial

***********************************************************************/

function checkBodyText()
{
    var strBodyTextBlankMsg = '내용을 입력하세요.';

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
