<%
'************************************************************************'
'*    function name       :  DispPage()                                
'*                                                                   
'*    Description         :  이전 다음 기능을 위한 라이브러리
'*                                                                   
'*    Input Params        :  RecordCount, CurPage, LinePerPage, ActionPage                           
'*                                                                   
'*    Return Value        :                                     
'*                                                                   
'*    Writer              :  이홍주                                        
'*                                                                   
'*    Date                :  2000.01.28                                         
'*                                                                   
'*    Special Logic Notes :  Updated                                    
'************************************************************************'
%>

<% 
Function DispPage(RecordCount, CurPage, LinePerPage, ActionPage) 
		
		TotalPage    = RecordCount \ LinePerPage

		If IsEmpty(CurPage)  OR  CurPage = "" Then
			CurPage = 1
                Else
            CurPage = CLng(CurPage)
		End If
		
		If (TotalPage * LINE_PER_PAGE) <> RecordCount Then 
			TotalPage = TotalPage + 1
		ElseIf TotalPage = 0 Then
			TotalPage = 1
		End If
		
		If CurPage > TotalPage Then
			CurPage = TotalPage
		End If		
%>

<TABLE BORDER="0" cellspacing="1">
<TR>
<TD>　
</TD>
<% If CurPage >= 1 or CurPage <= TotalPage Then	%>
<TD>
<SELECT name='CurPage' size='1' OnChange="changePage(this.form,this.selectedIndex+1,'<%=ActionPage%>')"> 
<% For i = 1 to TotalPage %>
<option value='<% = i %>' <% if i = CurPage then %> selected <% End if %>> <% = i %>
<% Next %>
</select>
</TD>
<TD> /  <% = TotalPage %> </TD>
<TD> page </TD>
<TD>
<%	If CurPage > 1 Then	%>
	<INPUT type="button" value="이전" onClick="javascript:changePage(this.form,<%=CurPage-1%>,'<%=ActionPage%>')"</a>
<%	End If	%>
</TD>

<TD>
<%	If CurPage < TotalPage Then	%>
	<INPUT type="button" value="다음" onClick="changePage(this.form,<%=CurPage+1%>,'<%=ActionPage%>');"></a>
<%	End If%>
</TD>
<% End if %>

</TR>
</TABLE>
<% End Function %> 
