<%
'**********************************************************************
'
'   Function Name   : MainTable
'
'   Description     : 화면 주요 테이블의 Table Tag 출력
'
'   Input Params    : width (테이블의 길이:퍼센트)
'
'   return value    : void
'
'   special Logic   : none
'
'********************************************************************** 
function MainTable(width)%>
<TABLE WIDTH=<%=width%>% BORDER=1 bordercolordark=#ffffff bordercolorlight=#000000 cellspacing=0 cellpadding=1  bgcolor="#999966"> 
<% End Function %>

<%
'**********************************************************************
'
'   Function Name   : MainTable
'
'   Description     : 화면 주요 테이블의 Table Tag 출력
'
'   Input Params    : width (테이블의 길이:퍼센트)
'
'   return value    : void
'
'   special Logic   : none
'
'********************************************************************** 
function SlipTable(width)%>
<TABLE WIDTH=<%=width%>% BORDER=1 bordercolordark=#ffffff bordercolorlight=#000000 cellspacing=0 cellpadding=0  bgcolor="#999966"> 
<% End Function %>

<%
'**********************************************************************
'
'   Function Name : UpperTable
'
'   Description     : 화면상단의 프로그램ID,이미지,도움말 출력
'
'   Input Params    : ProgID (프로그램ID), Title (제목이름)
'
'   return value    : void
'
'   special Logic   : none
'
'********************************************************************** 
Function UpperTable(ProgID,Title)
%>
<TABLE border="0" width="100%" cellspacing=0 cellpadding=0>
<TR VALIGN=MIDDLE>
  <TD valign=bottom><img src="../images/head/<%=lcase(ProgID)%>_1.gif" alt="<%=Title%>"><img src="../images/head/head_dot2.gif"></TD>
  <TD>
    <font size=2><b><%=ucase(ProgID)%></b></font>
  </TD>

<% End Function %>
</TR>
</TABLE>