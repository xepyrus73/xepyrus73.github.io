/***********************************************************************

      Program ID    :   UserName.js

      Description   :   작성자명 입력 체크

      Special Logic :   none

***********************************************************************
                                  MODIFICATION LOG

          DATE            AUTHORS                DESCRIPTION
       -----------    -----------------      -------------------
        2000/09/26        양광진                 Initial

***********************************************************************/

function checkUserName()
{
    var strUserNameBlankMsg = '작성자 입력하세요.';

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
