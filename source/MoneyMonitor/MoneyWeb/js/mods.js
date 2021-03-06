﻿/*  mods: an object-oriented Javascript library, version 1.0.0
 *  (c) 2005 DeepThink <jed.zhu@deepthink.com.au>
 *
 *  THIS FILE IS AUTOMATICALLY GENERATED. When sending patches, please diff
 *  against the source tree, available from the mods darcs repository. 
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *
 *  For details, see the mods.js web site: http://deepthink.com.au/
 *
/*--------------------------------------------------------------------------*/

/*mods 1 : deepthink-window*/
/*--------------------------------------------------------------------------*/
var dragapproved=false
var minrestore=0  //state of current windows，0:initialization，1 : max
var initialwidth,initialheight
//version of web browser is 5.0
var ie5=document.all&&document.getElementById
//version of web browser is NetsCape6.0
var ns6=document.getElementById&&!document.all

function iecompattest(){
return (!window.opera && document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function drag_drop(e){
if (ie5&&dragapproved&&event.button==1){
document.getElementById("dwindow").style.left=tempx+event.clientX-offsetx+"px"
document.getElementById("dwindow").style.top=tempy+event.clientY-offsety+"px"
}
else if (ns6&&dragapproved){
document.getElementById("dwindow").style.left=tempx+e.clientX-offsetx+"px"
document.getElementById("dwindow").style.top=tempy+e.clientY-offsety+"px"
}
}

function initializedrag(e){
offsetx=ie5? event.clientX : e.clientX
offsety=ie5? event.clientY : e.clientY
document.getElementById("dwindowcontent").style.display="none"//display
tempx=parseInt(document.getElementById("dwindow").style.left)
tempy=parseInt(document.getElementById("dwindow").style.top)

dragapproved=true
document.getElementById("dwindow").onmousemove=drag_drop
}

function loadwindow(width,height,uuid,regionname){

if (!ie5&&!ns6)  
{
 //window.open(url,"","width=width,height=height,scrollbars=1")
}
else{
document.getElementById("dwindow").style.display='';
document.getElementById("dwindow").style.width=initialwidth=width+"px";
document.getElementById("dwindow").style.height=initialheight=height+"px";
document.getElementById("dwindow").style.left="300px";
document.getElementById("dwindow").style.top=ns6? window.pageYOffset*1+30+"px" : iecompattest().scrollTop*1+30+"px";
document.getElementById("dwindowcontent").innerHTML = "<iframe src='ControlPanelDefault.aspx?RegionIP="+document.forms["form1"].elements["GetRegionIDandNames"].options[document.forms["form1"].elements["GetRegionIDandNames"].selectedIndex].text.toString()+"&RegionID=" + uuid.toString() + "&RegionName=" + regionname.toString() + "' width='100%' height='100%' scrolling=no frameborder='0'></iframe>";
//document.getElementById("regionID").innerHTML = uuid.toString();
clearStateInfo();
//document.getElementById("progressBar").innerHTML = createBar(300,15,'white',1,'black','blue',85,7,3,"");
//document.getElementById("cframe").src=url
}
}

function maximize(){
if (minrestore==0){
minrestore=1 //maximize window
document.getElementById("maxname").setAttribute("src","images\\minimize.gif")
document.getElementById("maxname").setAttribute("alt","Restore")
document.getElementById("dwindow").style.width=ns6? window.innerWidth-245+"px" : iecompattest().clientWidth-245+"px"
document.getElementById("dwindow").style.height=ns6? window.innerHeight-40+"px" : iecompattest().clientHeight-60+"px"
}
else{
minrestore=0 //restore window
document.getElementById("maxname").setAttribute("src","images\\maximize.gif")
document.getElementById("maxname").setAttribute("alt","Maximize")
document.getElementById("dwindow").style.width=initialwidth
document.getElementById("dwindow").style.height=initialheight
}
document.getElementById("dwindow").style.left=ns6? window.pageXOffset+"px" : iecompattest().scrollLeft+"px"
document.getElementById("dwindow").style.top=ns6? window.pageYOffset+"px" : iecompattest().scrollTop+"px"
}

function closeit(){
document.getElementById("dwindow").style.display="none"


}

function stopdrag(){
dragapproved=false;
document.getElementById("dwindow").onmousemove=null;
document.getElementById("dwindowcontent").style.display="" //extra
}

function sAlert(txt)
{
    //var eSrc=(document.all)?window.event.srcElement:arguments[1];
    var shield = document.createElement("DIV");
    shield.id = "shield";
    shield.style.position = "absolute";
    shield.style.left = "0px";
    shield.style.top = "0px";
    shield.style.width = "100%";
    //window.alert(document.body.scrollHeight);
    shield.style.height = document.body.scrollHeight+"px";
    shield.style.background = "white";
    shield.style.textAlign = "center";
    shield.style.zIndex = "10000";
    shield.style.filter = "alpha(opacity=60)";
    shield.style.opacity = 0.6;
    //shield.style.border-width=thick;

    strHtml = "<input type=\"button\" value=\" Exit Control Panel\" id=\"do_OK\" onclick=\"doOk()\" />\n";
    strHtml += txt;
    shield.innerHTML = strHtml;
    
    var coverdiv = document.getElementById("dvsearch");
    
    coverdiv.appendChild(shield);

    //document.body.appendChild(shield);
    
    this.doOk = function()
    {
        coverdiv.removeChild(shield);
        //document.body.removeChild(shield);
    }
    document.getElementById("do_OK").focus();
}

/*--------------------------------------------------------------------------*/
var W = screen.width ;
var H = screen.height;
var mod = null;
var num = null;


function M(id)
{
    return document.getElementById(id);
}
function MC(t)
{
    return document.createElement(t);
};

function isIE(){
   return (document.all && window.ActiveXObject && !window.opera) ? true : false;
} 

function getBodySize()
{
    var bodySize = [];
    with(document.documentElement) 
    {
        bodySize[0] = (scrollWidth>clientWidth)?scrollWidth:clientWidth;//
        bodySize[1] = (scrollHeight>clientHeight)?scrollHeight:clientHeight;//
    }
    return bodySize;
}

function CoverDiv(parentDiv)
{
    if (M("cover_div")) 
    {
        M("cover_div").style.display = 'block';
    } 
    else 
    {
        var coverDiv = MC('div');
        if(parentDiv == null)
            document.body.appendChild(coverDiv);
        else        
            M(parentDiv).appendChild(coverDiv);
        coverDiv.id = 'cover_div';
        with(coverDiv.style)
        {
            position = 'absolute';
            background = '#CCCCCC';
            left = '0px';
            top = '0px';
            var bodySize = getBodySize();
            width = '100%'
            height = '100%';
            zIndex = 0;
            if (isIE()) 
            {
                filter = "Alpha(Opacity=30)";
            } 
            else 
            {
                opacity = 0.0;
            }
        }
    }
}

function showMod()
{
    var modDiv=M(mod);
       modDiv.style.display = "block";
}

function change()
{
   var login = M(mod);
   login.style.position = "absolute";
  // login.style.border = "1px solid #CCCCCC";
   login.style.background ="#F6F6F6";
   login.style.cursor = "hand";
   var i=0;
   var bodySize = getBodySize();
   login.style.left = (bodySize[0]-i*i*4)/2+"px";
   login.style.top = (bodySize[1]/2-100-i*i)+"px";
   login.style.width =    i*i*4 + "px";
   login.style.height = i*i*1.5 + "px";
   login.style.filter = "alpha(opacity=70)";
   login.style.opacity = 0.1;
   
   popChange(i);
}
function popChange(i)
{
   var login = M(mod);
   var bodySize = getBodySize();
   login.style.left = (bodySize[0]-i*i*4)/2+"px";
   login.style.top = (bodySize[1]/2-i*i)+"px";
   login.style.width =  i*i*4 + "px";
   login.style.height = i*i*1.5+ "px";
   if(i<=num)
   {
          i++;
          setTimeout("popChange("+i+")",10);
   }
}
function openDiv(m,n,parentmod)
{
    mod = m;
    num = n;
    change();
    showMod();
    CoverDiv(parentmod)
    void(0);//<a href="#">aaa</a>
}

function closeDiv(mod)
{
    M(mod).style.display = 'none';
    M("cover_div").style.display = 'none';
    void(0);
}
/*xp wait bar*/
/*http://www.dynamicdrive.com/dynamicindex11/xpprogressbar.htm  */
/*--------------------------------------------------------------------------*/
var w3c=(document.getElementById)?true:false;
var ie=(document.all)?true:false;
var N=-1;

function createBar(w,h,bgc,brdW,brdC,blkC,speed,blocks,count,action)
{
    if(ie||w3c)
    {
        var t='<div id="_xpbar'+(++N)+'" style="visibility:visible; position:relative; overflow:hidden; width:'+w+'px; height:'+h+'px; background-color:'+bgc+'; border-color:'+brdC+'; border-width:'+brdW+'px; border-style:solid; font-size:1px;">';
        t+='<span id="blocks'+N+'" style="left:-'+(h*2+1)+'px; position:absolute; font-size:1px">';
        for(i=0;i<blocks;i++)
        {
            t+='<span style="background-color:'+blkC+'; left:-'+((h*i)+i)+'px; font-size:1px; position:absolute; width:'+h+'px; height:'+h+'px; '
            t+=(ie)?'filter:alpha(opacity='+(100-i*(100/blocks))+')':'-Moz-opacity:'+((100-i*(100/blocks))/100);
            t+='"></span>';
        }
        t+='</span></div>';
        M("searchlist").innerHTML = t;
        var bA=(ie)?document.all['blocks'+N]:document.getElementById('blocks'+N);
        bA.bar=(ie)?document.all['_xpbar'+N]:document.getElementById('_xpbar'+N);
        bA.blocks=blocks;
        bA.N=N;
        bA.w=w;
        bA.h=h;
        bA.speed=speed;
        bA.ctr=0;
        bA.count=count;
        bA.action=action;
        bA.togglePause=togglePause;
        bA.showBar=function()
        {
            this.bar.style.visibility="visible";
        }
        bA.hideBar=function()
        {
            this.bar.style.visibility="hidden";
        }
        bA.tid=setInterval('startBar('+N+')',speed);
        return bA;
   }
}

function startBar(bn)
{
    var t=(ie)?document.all['blocks'+bn]:document.getElementById('blocks'+bn);
    if(parseInt(t.style.left)+t.h+1-(t.blocks*t.h+t.blocks)>t.w)
    {
        t.style.left=-(t.h*2+1)+'px';
        t.ctr++;
        if(t.ctr>=t.count)
        {
            eval(t.action);
            t.ctr=0;
        }
    }else 
    t.style.left=(parseInt(t.style.left)+t.h+1)+'px';
}

function togglePause()
{
    if(this.tid==0)
    {
        this.tid=setInterval('startBar('+this.N+')',this.speed);
    }
    else
    {
        clearInterval(this.tid);
        this.tid=0;
    }
}


/*progress bar 1*/
/*--------------------------------------------------------------------------*/
var progressEnd;
var progressColor = 'blue'; // set to progress bar color
var progressInterval = 1000; // set to time between updates (milli-seconds)
function createProgressBarHTML(N,Color,intervalNum)
{
    var progressBar = "<table align='center'><tr><td><div id='showbar' style='font-size:8pt;padding:2px;border:solid black 1px;visibility:hidden'>";
    for(var i=1;i<=N;i++)
    {
        progressBar +="<span id='progress"+i.toString()+"'>&nbsp; &nbsp;</span>"
    }
    progressBar += "</div></td></tr></table>";
    progressEnd = N;
    progressColor = Color;
    progressInterval = intervalNum;
    return progressBar;
}

 // set to number of progress <span>'s.

var progressAt = progressEnd;
var progressTimer;
function progress_clear() {
for (var i = 1; i <= progressEnd; i++) document.getElementById('progress'+i).style.backgroundColor = 'transparent';
progressAt = 0;
}
function progress_update() {
document.getElementById('showbar').style.visibility = 'visible';
progressAt++;
if (progressAt > progressEnd) progress_clear();
else document.getElementById('progress'+progressAt).style.backgroundColor = progressColor;
progressTimer = setTimeout('progress_update()',progressInterval);
}
function progress_stop() {
clearTimeout(progressTimer);
progress_clear();
document.getElementById('showbar').style.visibility = 'hidden';
}

/*progress bar download2*/
/*--------------------------------------------------------------------------*/  

function createProgressBar(LoadInfo)
{
    var progressBar = "<div id = 'out'><div id ='in_0'>";
    progressBar += LoadInfo.toString()+ " 0%";
    progressBar += "</div><div id ='in' style = 'width:0%'><div id ='in_1'></div></div></div>"
    return progressBar;
}
function beginBar(txtInfo,pb_num,percentinfo)
{
    if(pb_num<=100)
    {
       // alert(pb_num);
        M("in").style.width = pb_num + "%";
        M("in_0").innerHTML = M("in_1").innerHTML = txtInfo+pb_num.toString()+"%";
        M("info").innerHTML = percentinfo;
    }
    else
    {
       // M("out").style.display = "none";
    }
}
/*message box*/
/*----------------------------------------------------------------------------------*/

   var titlePopup
   var len;
   
   function InitMsgBox(title ,content)
   { len = 0;
    titlePopup=window.createPopup();
    var titlePopupBody = titlePopup.document.body;
    titlePopupBody.style.border ="solid black 1px";
    var nowTime = new Date();
    var currenttime = nowTime.toLocaleDateString();
    
    var titleContent = "";
    titleContent = titleContent + "<table width='450' border='0' align='center' cellpadding='5' cellspacing='0' style='border: 0px solid #666666;'>";
    titleContent = titleContent + "<tr> <td width='32' bgcolor='#FFFFCC'><img src='images/error.png' alt='icon' width='32' height='32'/></td><td bgcolor='#FFFFCC'><span style='font-size:24px;font-weight:bold;font-family:Arial,Helvetica,sc'>Money Server Error</span></td></tr>";
    titleContent = titleContent + "<tr><td colspan='2'><p style='font-family: Arial, Helvetica, sans-serif;font-size: 14px;'>An error occured while invoke a method from money server.</p>";
    titleContent = titleContent + "<table width='80%' border='0' align='center' cellpadding='3' cellspacing='0'>";
    titleContent = titleContent + "<tr><td style='font-family: Arial, Helvetica, sans-serif;font-size: 14px;'>Method</td><td style='font-family: Arial, Helvetica, sans-serif;font-size: 14px;'>"+title+"</td></tr>";
    titleContent = titleContent + "<tr><td style='font-family: Arial, Helvetica, sans-serif;font-size: 14px;'>Destination</td> <td style='font-family: Arial, Helvetica, sans-serif;font-size: 14px;'>"+content+"</td></tr> </table> ";
    titleContent = titleContent + "<p style='font-family: Arial, Helvetica, sans-serif;font-size: 14px;''>Invoke money server method failed .</p></td> </tr>";
    titleContent = titleContent + "</table>";    
    titlePopupBody.innerHTML = titleContent;
         
    ShowMsgBox();
   }
   function InitBalaceInfo(title ,content)
   { len = 0;
    titlePopup=window.createPopup();
    var titlePopupBody = titlePopup.document.body;
    titlePopupBody.style.border ="solid black 1px";
    var nowTime = new Date();
    var currenttime = nowTime.toLocaleDateString();
    
    var titleContent = "";
    titleContent = titleContent + "<table width='450' border='0' align='center' cellpadding='5' cellspacing='0' style='border: 0px solid #666666;'>";
    titleContent = titleContent + "<tr> <td width='32' bgcolor='#FFFFCC'><img src='images/info.png' alt='icon' width='32' height='32'/></td><td bgcolor='#FFFFCC'><span style='font-size:24px;font-weight:bold;font-family:Arial,Helvetica,sc'>Money Server Info</span></td></tr>";
    titleContent = titleContent + "<tr><td colspan='2'><p style='font-family: Arial, Helvetica, sans-serif;font-size: 14px;'>An info occured while making a transaction from your account. .</p>";
    titleContent = titleContent + "<table width='80%' border='0' align='center' cellpadding='3' cellspacing='0'>";
    titleContent = titleContent + "<tr><td style='font-family: Arial, Helvetica, sans-serif;font-size: 14px;'>User Name</td><td style='font-family: Arial, Helvetica, sans-serif;font-size: 14px;'>"+title+"</td></tr>";
    titleContent = titleContent + "<tr><td style='font-family: Arial, Helvetica, sans-serif;font-size: 14px;'>Balance Account</td> <td style='font-family: Arial, Helvetica, sans-serif;font-size: 14px;'>"+content+"</td></tr>";
    titleContent = titleContent +"<tr><td style='font-family: Arial, Helvetica, sans-serif;font-size: 14px;'>Query Time </td> <td style='font-family: Arial, Helvetica, sans-serif;font-size: 14px;'>"+currenttime+"</td></tr></table> ";
    titleContent = titleContent + "<p style='font-family: Arial, Helvetica, sans-serif;font-size: 14px;''>Invoke money server method success .</p></td> </tr>";
    titleContent = titleContent + "</table>";    
    titlePopupBody.innerHTML = titleContent;
         
    ShowMsgBox();
   } 
   
   function InitInfoBox(title ,content)
   {
    len = 0;
    titlePopup=window.createPopup();
    var titlePopupBody = titlePopup.document.body;
    titlePopupBody.style.border ="solid black 1px";
    var nowTime = new Date();
    var currenttime = nowTime.toLocaleDateString();
    
    var titleContent = "";
    titleContent = titleContent + "<table width='450' border='0' align='center' cellpadding='5' cellspacing='0' style='border: 0px solid #666666;'>";
    titleContent = titleContent + "<tr> <td width='32' bgcolor='#FFFFCC'><img src='images/info.png' alt='icon' width='32' height='32'/></td><td bgcolor='#FFFFCC'><span style='font-size:24px;font-weight:bold;font-family:Arial,Helvetica,sc'>Money Server Info</span></td></tr>";
    titleContent = titleContent + "<tr><td colspan='2'><p style='font-family: Arial, Helvetica, sans-serif;font-size: 14px;'>An info occured while making a transaction from your account. .</p>";
    titleContent = titleContent + "<table width='80%' border='0' align='center' cellpadding='3' cellspacing='0'>";
    titleContent = titleContent + "<tr><td style='font-family: Arial, Helvetica, sans-serif;font-size: 14px;'>User Name</td><td style='font-family: Arial, Helvetica, sans-serif;font-size: 14px;'>"+title+"</td></tr>";
    titleContent = titleContent + "<tr><td style='font-family: Arial, Helvetica, sans-serif;font-size: 14px;'>Money Info </td> <td style='font-family: Arial, Helvetica, sans-serif;font-size: 14px;'>"+content+"</td></tr>";
    titleContent = titleContent +"<tr><td style='font-family: Arial, Helvetica, sans-serif;font-size: 14px;'>Query Time </td> <td style='font-family: Arial, Helvetica, sans-serif;font-size: 14px;'>"+currenttime+"</td></tr></table> ";
    titleContent = titleContent + "<p style='font-family: Arial, Helvetica, sans-serif;font-size: 14px;''>Invoke money server method success .</p></td> </tr>";
    titleContent = titleContent + "</table>";    
    titlePopupBody.innerHTML = titleContent;
         
    ShowMsgBox();
   } 
   function MsgBox()
   { 
    len += 4;      
    if (len > 260)
    {   
     window.clearInterval(tID);     
    }        
    else
    {//
     //titlePopup.show(document.body.clientWidth - 450, document.body.clientHeight - len, 450, len, top.document.body); 
    
      titlePopup.show(document.documentElement.clientWidth - 450, document.documentElement.clientHeight  - len , 450, len,top.document.body); 
    }    
   }
   
   var tID
   function ShowMsgBox()
   {
    tID = window.setInterval("MsgBox()",15);    
   }
   
   
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   //
   //Date Controller 1.0 version
   //
   //
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PopupCalendar(InstanceName)   
{   
    ///Global Tag   
    this.instanceName=InstanceName;   
    ///Properties   
    this.separator="-"  
    this.oBtnTodayTitle="Today"  
    this.oBtnCancelTitle="Cancel"  
    this.weekDaySting=new Array("S","M","T","W","T","F","S");   
    this.monthSting=new Array("January","February","March","April","May","June","July","August","September","October","November","December");   
    this.Width=200;   
    this.currDate=new Date();   
    this.today=new Date();   
    this.startYear=1970;   
    this.endYear=2099;   
    ///Css   
    this.normalfontColor="#666666";   
    this.selectedfontColor="red";   
    this.divBorderCss="1px solid #BCD0DE";   
    this.titleTableBgColor="#98B8CD";   
    this.tableBorderColor="#CCCCCC"  
    ///Method   
    this.Init=CalendarInit;   
    this.Fill=CalendarFill;   
    this.Refresh=CalendarRefresh;   
    this.Restore=CalendarRestore;   
    ///HTMLObject   
    this.oTaget=null;   
    this.oPreviousCell=null;   
    this.sDIVID=InstanceName+"_Div";   
    this.sTABLEID=InstanceName+"_Table";   
    this.sMONTHID=InstanceName+"_Month";   
    this.sYEARID=InstanceName+"_Year";   
    this.sTODAYBTNID=InstanceName+"_TODAYBTN";   
       
}   
function CalendarInit()             ///Create panel   
{   
    var sMonth,sYear   
    sMonth=this.currDate.getMonth();   
    sYear=this.currDate.getYear();   
    htmlAll="<div id='"+this.sDIVID+"' style='display:none;position:absolute;width:"+this.Width+";border:"+this.divBorderCss+";padding:2px;background-color:#FFFFFF'>";   
    htmlAll+="<div align='center'>";   
    /// Month   
    htmloMonth="<select id='"+this.sMONTHID+"' onchange=CalendarMonthChange("+this.instanceName+") style='width:50%'>";   
    for(i=0;i<12;i++)   
    {              
        htmloMonth+="<option value='"+i+"'>"+this.monthSting[i]+"</option>";   
    }   
    htmloMonth+="</select>";   
    /// Year   
    htmloYear="<select id='"+this.sYEARID+"' onchange=CalendarYearChange("+this.instanceName+") style='width:50%'>";   
    for(i=this.startYear;i<=this.endYear;i++)   
    {   
        htmloYear+="<option value='"+i+"'>"+i+"</option>";   
    }   
    htmloYear+="</select></div>";   
    /// Day   
    htmloDayTable="<table id='"+this.sTABLEID+"' width='100%' border=0 cellpadding=0 cellspacing=1 bgcolor='"+this.tableBorderColor+"'>";   
    htmloDayTable+="<tbody bgcolor='#ffffff'style='font-size:13px'>";   
    for(i=0;i<=6;i++)   
    {   
        if(i==0)   
            htmloDayTable+="<tr bgcolor='" + this.titleTableBgColor + "'>";   
        else  
            htmloDayTable+="<tr>";   
        for(j=0;j<7;j++)   
        {   
  
            if(i==0)   
            {   
                htmloDayTable+="<td height='20' align='center' valign='middle' style='cursor:hand'>";   
                htmloDayTable+=this.weekDaySting[j]+"</td>"  
            }   
            else  
            {   
                htmloDayTable+="<td height='20' align='center' valign='middle' style='cursor:hand'";   
                htmloDayTable+=" onmouseover=CalendarCellsMsOver("+this.instanceName+")";   
                htmloDayTable+=" onmouseout=CalendarCellsMsOut("+this.instanceName+")";   
                htmloDayTable+=" onclick=CalendarCellsClick(this,"+this.instanceName+")>";   
                htmloDayTable+="&nbsp;</td>"  
            }   
        }   
        htmloDayTable+="</tr>";      
    }   
    htmloDayTable+="</tbody></table>";   
    /// Today Button   
    htmloButton="<div align='center' style='padding:3px'>"  
    htmloButton+="<button id='"+this.sTODAYBTNID+"' style='width:40%;border:1px solid #BCD0DE;background-color:#eeeeee;cursor:hand'"  
    htmloButton+=" onclick=CalendarTodayClick("+this.instanceName+")>"+this.oBtnTodayTitle+"</button>&nbsp;"  
    htmloButton+="<button style='width:40%;border:1px solid #BCD0DE;background-color:#eeeeee;cursor:hand'"  
    htmloButton+=" onclick=CalendarCancel("+this.instanceName+")>"+this.oBtnCancelTitle+"</button> "  
    htmloButton+="</div>"  
    /// All   
    htmlAll=htmlAll+htmloMonth+htmloYear+htmloDayTable+htmloButton+"</div>";   
    document.write(htmlAll);   
    this.Fill();       
}   
function CalendarFill()         ///   
{   
    var sMonth,sYear,sWeekDay,sToday,oTable,currRow,MaxDay,iDaySn,sIndex,rowIndex,cellIndex,oSelectMonth,oSelectYear   
    sMonth=this.currDate.getMonth();   
    sYear=this.currDate.getYear();   
    sWeekDay=(new Date(sYear,sMonth,1)).getDay();   
    sToday=this.currDate.getDate();   
    iDaySn=1   
    oTable=document.all[this.sTABLEID];   
    currRow=oTable.rows[1];   
    MaxDay=CalendarGetMaxDay(sYear,sMonth);   
       
    oSelectMonth=document.all[this.sMONTHID]   
    oSelectMonth.selectedIndex=sMonth;   
    oSelectYear=document.all[this.sYEARID]   
    for(i=0;i<oSelectYear.length;i++)   
    {   
        if(parseInt(oSelectYear.options[i].value)==sYear)oSelectYear.selectedIndex=i;   
    }   
    ////   
    for(rowIndex=1;rowIndex<=6;rowIndex++)   
    {   
        if(iDaySn>MaxDay)break;   
        currRow = oTable.rows[rowIndex];   
        cellIndex = 0;   
        if(rowIndex==1)cellIndex = sWeekDay;   
        for(;cellIndex<currRow.cells.length;cellIndex++)   
        {   
            if(iDaySn==sToday)   
            {   
                currRow.cells[cellIndex].innerHTML="<font color='"+this.selectedfontColor+"'><i><b>"+iDaySn+"</b></i></font>";   
                this.oPreviousCell=currRow.cells[cellIndex];   
            }   
            else  
            {   
                currRow.cells[cellIndex].innerHTML=iDaySn;     
                currRow.cells[cellIndex].style.color=this.normalfontColor;   
            }   
            CalendarCellSetCss(0,currRow.cells[cellIndex]);   
            iDaySn++;   
            if(iDaySn>MaxDay)break;     
        }   
    }   
}   
function CalendarRestore()                  /// Clear Data   
{      
    var i,j,oTable   
    oTable=document.all[this.sTABLEID]   
    for(i=1;i<oTable.rows.length;i++)   
    {   
        for(j=0;j<oTable.rows[i].cells.length;j++)   
        {   
            CalendarCellSetCss(0,oTable.rows[i].cells[j]);   
            oTable.rows[i].cells[j].innerHTML="&nbsp;";   
        }   
    }      
}   
function CalendarRefresh(newDate)                   ///   
{   
    this.currDate=newDate;   
    this.Restore();    
    this.Fill();       
}   
function CalendarCellsMsOver(oInstance)             /// Cell MouseOver   
{   
    var myCell = event.srcElement;   
    CalendarCellSetCss(0,oInstance.oPreviousCell);   
    if(myCell)   
    {   
        CalendarCellSetCss(1,myCell);   
        oInstance.oPreviousCell=myCell;   
    }   
}   
function CalendarCellsMsOut(oInstance)              ////// Cell MouseOut   
{   
    var myCell = event.srcElement;   
    CalendarCellSetCss(0,myCell);      
}   
function CalendarYearChange(oInstance)              /// Year Change   
{   
    var sDay,sMonth,sYear,newDate   
    sDay=oInstance.currDate.getDate();   
    sMonth=oInstance.currDate.getMonth();   
    sYear=document.all[oInstance.sYEARID].value   
    newDate=new Date(sYear,sMonth,sDay);   
    oInstance.Refresh(newDate);   
}   
function CalendarMonthChange(oInstance)             /// Month Change   
{   
    var sDay,sMonth,sYear,newDate   
    sDay=oInstance.currDate.getDate();   
    sMonth=document.all[oInstance.sMONTHID].value   
    sYear=oInstance.currDate.getYear();   
    newDate=new Date(sYear,sMonth,sDay);   
    oInstance.Refresh(newDate);    
}   
function CalendarCellsClick(oCell,oInstance)   
{   
    var sDay,sMonth,sYear,newDate   
    sYear=oInstance.currDate.getFullYear();   
    sMonth=oInstance.currDate.getMonth();   
    sDay=oInstance.currDate.getDate();   
    if(oCell.innerText!=" ")   
    {   
        sDay=parseInt(oCell.innerText);   
        if(sDay!=oInstance.currDate.getDate())   
        {   
            newDate=new Date(sYear,sMonth,sDay);   
            oInstance.Refresh(newDate);   
        }   
    }   
    sDateString=sYear+oInstance.separator+CalendarDblNum(sMonth+1)+oInstance.separator+CalendarDblNum(sDay);        ///return sDateString   
    if(oInstance.oTaget.tagName.toLowerCase()=="input")oInstance.oTaget.value = sDateString;   
    CalendarCancel(oInstance);   
    return sDateString;   
}   
function CalendarTodayClick(oInstance)              /// "Today" button Change   
{      
    oInstance.Refresh(new Date());         
}   
function getDateString(oInputSrc,oInstance)   
{   
    if(oInputSrc&&oInstance)    
    {   
        var CalendarDiv=document.all[oInstance.sDIVID];   
        oInstance.oTaget=oInputSrc;   
        CalendarDiv.style.pixelLeft=CalendargetPos(oInputSrc,"Left");   
        CalendarDiv.style.pixelTop=CalendargetPos(oInputSrc,"Top") + oInputSrc.offsetHeight;   
        CalendarDiv.style.display=(CalendarDiv.style.display=="none")?"":"none";       
    }      
}   
function CalendarCellSetCss(sMode,oCell)            /// Set Cell Css   
{   
    // sMode   
    // 0: OnMouserOut 1: OnMouseOver    
    if(sMode)   
    {   
        oCell.style.border="1px solid #5589AA";   
        oCell.style.backgroundColor="#BCD0DE";   
    }   
    else  
    {   
        oCell.style.border="1px solid #FFFFFF";   
        oCell.style.backgroundColor="#FFFFFF";   
    }      
}   
function CalendarGetMaxDay(nowYear,nowMonth)            /// Get MaxDay of current month   
{   
    var nextMonth,nextYear,currDate,nextDate,theMaxDay   
    nextMonth=nowMonth+1;   
    if(nextMonth>11)   
    {   
        nextYear=nowYear+1;   
        nextMonth=0;   
    }   
    else       
    {   
        nextYear=nowYear;      
    }   
    currDate=new Date(nowYear,nowMonth,1);   
    nextDate=new Date(nextYear,nextMonth,1);   
    theMaxDay=(nextDate-currDate)/(24*60*60*1000);   
    return theMaxDay;   
}   
function CalendargetPos(el,ePro)                /// Get Absolute Position   
{   
    var ePos=0;   
    while(el!=null)   
    {          
        ePos+=el["offset"+ePro];   
        el=el.offsetParent;   
    }   
    return ePos;   
}   
function CalendarDblNum(num)   
{   
    if(num < 10)    
        return "0"+num;   
    else  
        return num;   
}   
function CalendarCancel(oInstance)          ///Cancel   
{   
    var CalendarDiv=document.all[oInstance.sDIVID];   
    CalendarDiv.style.display="none";          
}  
var oCalendarEn=new PopupCalendar("oCalendarEn");   //初始化控件时,请给出实例名称如:oCalendarEn   
oCalendarEn.Init();  
