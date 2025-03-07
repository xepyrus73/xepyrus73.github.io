<%
'************************************************************************'
'*                                                                      *'
'*    Program ID      : search1020.asp                                    *'
'*                                                                      *'
'*    Description     : Ű����˻� �ϴ� ������                             *'
'*                                                                      *'
'*    Input Params    :                                                 *'
'*                                                                      *'
'*    Table Name      :                                                 *'
'*                                                                      *'
'*    Functions       :                                                 *'
'*                                                                      *'
'*    Input Files     :                                                 *'
'*                                                                      *'
'*    Link Component  :                                                 *'
'*                                                                      *'
'*    Special Logic Notes : None                                        *'
'*                                                                      *'
'************************************************************************'
'*                                MODIFICATION LOG                      *'
'*                                                                      *'
'*         DATE            AUTHORS             DESCRIPTION              *'
'*      -----------    -----------------      -------------------       *'
'*      2000/08/31         �籤��              Initial Release          *'
'*                                                                      *'
'************************************************************************'
%>
<!-- #include file="Table.inc" -->
<!-- #include file="DispPage.inc" -->      
<%
'************************************************************************'
'*    ��������                                                          *'  
'************************************************************************'
const LINE_PER_PAGE = 10

Dim RecordCount
Dim TotalPage
Dim CurPage
Dim ObjRec
Dim txtKeyword
Dim queryKeyword
Dim SrchStrLen
Dim ObjQuery 
Dim ObjUtil 
Dim strStartFlag
%>

<% 

	Init()
	
	If strStartFlag="" Then
		DispHeader()
	Else 
		Main()
		Final() 
	End If

%>

<%
'************************************************************************'
'*    function name       :  Init()                                     *'
'*                                                                      *'
'*    Description         :  �ʱ�ȭ                                     *'
'*                                                                      *'
'*    Input Params        :                                             *'
'*                                                                      *'
'*    Return Value        :                                             *'
'*                                                                      *'
'*    Special Logic Notes :                                             *'
'************************************************************************'
Function Init()
'	strStartFlag=Request("pStartFlag")
	
	strStartFlag="Y"

    txtKeyword = Request("SearchStr")
    
    SrchStrLen = Len(txtKeyword)
End Function
%>

<%
'************************************************************************'
'*    function name       :  Main()                                     *'
'*                                                                      *'
'*    Description         :  Mainline                                   *'
'*                                                                      *'
'*    Input Params        :                                             *'
'*                                                                      *'
'*    Return Value        :                                             *'
'*                                                                      *'
'*    Special Logic Notes :                                             *'
'************************************************************************'
Function Main()
        
    Set ObjQuery = Server.CreateObject("ixsso.Query")
    Set ObjUtil = Server.CreateObject("ixsso.Util")

    If Left(txtKeyword,1) = chr(34) Then
        SrchStrLen = SrchStrLen-1
       	txtKeyword = Right(txtKeyword,SrchStrLen)
    End If
    
    SrchStrLen = Len(txtKeyword)
    
    If Right(txtKeyword,1) = Chr(34) Then
        SrchStrLen = SrchStrLen-1
       	txtKeyword = Left(txtKeyword,SrchStrLen)
    End If

    queryKeyword = txtKeyword & "*"
    ObjQuery.Query = queryKeyword & " and (#filename *.htm OR #filename *.html)"
    ObjQuery.SortBy = "rank[d]"
    ObjQuery.Columns = "vpath,DocTitle,filename,characterization,rank,DocCreatedTm"
    ObjQuery.MaxRecords = 100 

' �˻��� ��� ���� !
    path = Request.ServerVariables("PATH_INFO")

	While  (Len(path) <> 0 And Right(path,1) <> "/")
		path=Left(path,Len(path)-1)
	Wend
    ObjUtil.AddScopeToQuery ObjQuery, path , "deep"
    
    Set ObjRec = ObjQuery.CreateRecordset("nonsequential")
    
    RecordCount = ObjRec.RecordCount
    TotalPage = RecordCount \ LINE_PER_PAGE
    
    If IsEmpty(Request("CurPage")) OR Request("CurPage") = "" OR Request("CurPage") = "0" Then
        CurPage = 1
    Else
        CurPage = CLng(Request("CurPage"))
    End If     	
    
    If (TotalPage * LINE_PER_PAGE ) <> RecordCount Then
    	TotalPage = TotalPage + 1
    ElseIf TotalPage = 0 Then
    	TotalPage = 1
    End If 
    
    If CurPage > TotalPage Then
    	CurPage = TotalPage
    End If
         
    If  CurPage > 1 Then
    	ObjRec.Move((CurPage - 1) * LINE_PER_PAGE)         
    End If 
    
End Function
%>

<%
'************************************************************************'
'*    function name       :  Final()                                    *'
'*                                                                      *'
'*    Description         :  ȭ�� Display                               *'
'*                                                                      *'
'*    Input Params        :                                             *'
'*                                                                      *'
'*    Return Value        :                                             *'
'*                                                                      *'
'*    Special Logic Notes :                                             *'
'************************************************************************'
Function Final() 

Dim vpath 
Dim path
Dim filename 
Dim strTitle
Dim strContent
Dim TR

TR = "<TR align=center>"
%>

<HTML>
<HEAD>
<TITLE>[LGȭ��][MINITAB][Ű����˻�]</TITLE>

<META HTTP-EQUIV='Content-Type' CONTENT='text/html; charset=euc-kr'>

<LINK rel="stylesheet" type="text/css" href="style.css">
<SCRIPT language="javascript" src="common.js"></SCRIPT>
</HEAD>
<BODY>
<CENTER>
<FORM name="form" id="form">
<TABLE width="90%" border="0">
<TR align="right" bgcolor="#FFFFFF">
    <TD bgcolor="#FFFFFF">
	<%=DispPage(RecordCount,CurPage,LINE_PER_PAGE,Request.ServerVariables("PATH_INFO"))%>
    </TD>
</TR>
</TABLE>
<%=MainTable(98)%>
<TR>
    <TH width=30%>���� </TH>	
    <TH width=20%>���ϸ� </TH>
    <TH width=50%>���� </TH>
</TR>
<%	
    IF RecordCount < 1 Then
%>
<TR>
    <TD colspan="3">�ڷᰡ �����ϴ� </TD>
</TR>
<%	
    Else
		For i = 1 To LINE_PER_PAGE
		    If ObjRec.EOF Then
			Exit For
		    End If	
		    
		    vpath = ObjRec("vpath")
		    strTitle = ObjRec("DocTitle")
		    filename = ObjRec("filename")
'		    strContent  = right(ObjRec("characterization"),100)	    
		    strContent  = ObjRec("characterization")
		    strContent = Replace(strContent,txtKeyword,"<STRONG><FONT color=red>"&txtKeyword&"</FONT></STRONG>")
%>
<TR>
    <TD>&nbsp;<%=strTitle%></TD>
    <TD><A href="<%=vpath%>" target="_new">&nbsp;<%=filename%></A></TD>
    <TD>&nbsp;<%=strContent%></TD>
</TR>
<%
	         ObjRec.MoveNext          
	     NEXT
	 End If 

	Set ObjQuery = Nothing
	Set ObjUtil = Nothing   
	Set ObjRec = Nothing	   
%>
</TABLE>
<INPUT type="hidden" name="SearchStr" value="<%=txtKeyword%>">
<INPUT type="hidden" name="pStartFlag" value="<%=strStartFlag%>">
</FORM>
</BODY>
</HTML>

<% End Function %>
<%
'************************************************************************'
'*    function name       :  DispHeader()                                    *'
'*                                                                      *'
'*    Description         :  ȭ�� Display                               *'
'*                                                                      *'
'*    Input Params        :                                             *'
'*                                                                      *'
'*    Return Value        :                                             *'
'*                                                                      *'
'*    Special Logic Notes :                                             *'
'************************************************************************'
Function DispHeader() 
%>
<HTML>
<HEAD>
<TITLE>[LGȭ��][MINITAB][Ű����˻�]</TITLE>
<LINK rel="stylesheet" type="text/css" href="style.css">
<SCRIPT language="javascript" src="common.js"></SCRIPT>
</HEAD>
<BODY>
<CENTER>
<FORM name="form" id="form">
<TABLE width="90%" border="0">
<TR align="right" bgcolor="#FFFFFF">
    <TD bgcolor="#FFFFFF">
	<%=DispPage(RecordCount,CurPage,LINE_PER_PAGE,Request.ServerVariables("PATH_INFO"))%>
    </TD>
</TR>
</TABLE>
<%=MainTable(98)%>
<TR>
    <TH width=30%>���� </TH>	
    <TH width=20%>���ϸ� </TH>
    <TH width=50%>���� </TH>
</TR>

<%
End Function
%>