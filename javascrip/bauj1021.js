/************************************************************************************/
/*                                                                                  */
/*    Program ID   : bauj1021.js                                                      */  
/*                                                                                  */ 
/*    Description  : �������� �˻����� ȭ��                                              */
/*                                                                                  */
/*    Special Logic Notes : None                                                    */
/*                                                                                  */
/************************************************************************************/
/*                                MODIFICATION LOG                                  */
/*                                                                                  */
/*         DATE            AUTHORS             DESCRIPTION                          */
/*      -----------    -----------------      -------------------                   */
/*      2000/09/26         �籤��              Initial Release                      */
/*                                                                                  */
/************************************************************************************/

// �Ϲ��ڵ� �Է¹ڽ� üũ           
function CheckField(form)
{
    return true;
}

/******************************************************************************

	function name :  InquiryForm()
	parameters :																 
 			 
 	return : void
 	Description: 

*****************************************************************************/

function InquiryForm()
{
    alert("tesing");
    return;
      
/*    form.action = "bauj1022.cgi"
    form.target = "_self"
    form.method = "post"
    form.submit();		
*/    
}		


/******************************************************************************

	function name :  submitForm()
	parameters :																 
 			 
 	return : void
 	Description: 

*****************************************************************************/
function submitForm(form)
{

    form.action="bauj1021.cgi"
    form.method="post"
    form.target="_self"
    form.submit();
}