(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{102:function(e,t,n){},103:function(e,t,n){},104:function(e,t,n){},105:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(11),c=n.n(r),i=n(9),s=n(12),l=n(16),u=n(17),h=n(2),p=n.n(h),m=n(49),v=n.n(m),f=function(){function e(t,n){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;Object(i.a)(this,e),this.row=t,this.col=n,this.piece=a}return Object(s.a)(e,[{key:"canHavePiece",value:function(){return(this.row+this.col)%2===1}},{key:"hasPiece",value:function(){return null!==this.piece}}]),e}(),d=function e(t,n,a){var o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];Object(i.a)(this,e),this.player=t,this.row=n,this.col=a,this.isKing=o},y=(n(96),n(18)),g=n(21),k=n(55),w=n(14),b=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"componentDidMount",value:function(){document.getElementById("url").select()}},{key:"copyToClipboard",value:function(){document.getElementById("url").select(),document.execCommand("copy")}},{key:"render",value:function(){return o.a.createElement("div",{className:"invitePlayer"},o.a.createElement(y.a,{centered:!0,show:!0},o.a.createElement(y.a.Header,null,o.a.createElement(y.a.Title,null,"Invite a friend!")),o.a.createElement(y.a.Body,null,o.a.createElement(g.a,null,o.a.createElement(k.a,{id:"url",value:window.location,readOnly:!0}),o.a.createElement(g.a.Append,{id:"copy-btn",onClick:this.copyToClipboard},o.a.createElement(g.a.Text,null,"Copy")))),o.a.createElement(y.a.Footer,{id:"modal-footer"},o.a.createElement("p",null,"The game will start once another player has joined."))))}}],[{key:"propTypes",get:function(){return{location:p.a.any}}}]),n}(o.a.Component),E=Object(w.e)(b),T=n(53),O=n(54),C=n.n(O),M=(n(102),function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(e){var a;Object(i.a)(this,n),a=t.call(this,e);for(var o=[],r=0;r<8;r++){o.push([]);for(var c=0;c<8;c++)(r+c)%2===1?r<3?o[r].push(new f(r,c,new d(2,r,c))):r>=5?o[r].push(new f(r,c,new d(1,r,c))):o[r].push(new f(r,c)):o[r].push(new f(r,c))}return a.state={board:o,targets:[],pieceToMove:null,player:null,isMyTurn:!1,inJumpChain:!1,hasBothPlayers:!1},a}return Object(s.a)(n,null,[{key:"propTypes",get:function(){return{location:p.a.any}}}]),Object(s.a)(n,[{key:"componentDidMount",value:function(){var e=this,t="https://simple-checkers.herokuapp.com/";console.log(t),this.socket=v()(t),this.socket.on("player-number",(function(t){e.setState({player:t})})),this.socket.on("has-both-players",(function(t){console.log(t),e.setState({hasBothPlayers:t})})),this.socket.on("move",(function(t,n){e.movePiece(n,t)})),this.socket.on("endturn",(function(){e.setState({isMyTurn:!0})})),this.socket.on("connection",(function(){e.socket.emit("join-room",e.props.location.pathname)})),this.socket.on("boardConfig",(function(t){var n=e.createBoardFromObject(t);e.setState({board:n})})),this.socket.on("err",(function(e){console.log(e)}))}},{key:"createBoardFromObject",value:function(e){return e.forEach((function(t,n){t.forEach((function(t,a){var o=e[n][a].piece;null!==o&&(o=new d(o.player,o.row,o.col,o.isKing)),e[n][a]=new f(n,a,o)}))})),e}},{key:"showMoveTargets",value:function(e){this.state.isMyTurn&&!this.state.inJumpChain&&e.player===this.state.player&&this.setState({targets:this.getMoveTargets(e.row,e.col),pieceToMove:e})}},{key:"getMoveTargets",value:function(e,t){var n=this,a=this.state.board[e][t].piece,o=[];return this.getPossibleTargets(a).forEach((function(e){if(e.hasPiece()){var t=n.canJumpOver(a,e.piece);null!==t&&o.push(t)}else n.canMoveTo(a,e)&&o.push(e)})),o}},{key:"canMoveTo",value:function(e,t){return!(!e.isKing&&(1===e.player&&t.row>e.row||2===e.player&&t.row<e.row))&&!t.hasPiece()}},{key:"canJumpOver",value:function(e,t){if(e.player===t.player)return!1;var n=this.state.board,a=2*(t.row-e.row)+e.row,o=2*(t.col-e.col)+e.col;return a>=0&&o>=0&&a<8&&o<8&&!n[a][o].hasPiece()&&n[a][o]}},{key:"handleCellClick",value:function(e){this.state.targets.includes(e)&&(this.socket.emit("move",e,this.state.pieceToMove),this.movePiece(this.state.pieceToMove,e)||this.endTurn())}},{key:"movePiece",value:function(e,t){var n=this,a=this.state.board,o=!1;if(2===Math.abs(e.row-t.row)){var r=(e.row+t.row)/2,c=(e.col+t.col)/2;a[r][c].piece=null,e.player===this.state.player&&(o=!0)}if(a[e.row][e.col].piece=null,e.row=t.row,e.col=t.col,e.isKing||0!==e.row&&7!==e.row||(e.isKing=!0),a[t.row][t.col].piece=e,this.setState({targets:[],pieceToMove:null,board:a,inJumpChain:!1}),this.socket.emit("boardConfig",a),o){var i=[];if(this.getPossibleTargets(e).forEach((function(t){if(t.hasPiece()){var a=n.canJumpOver(e,t.piece);a&&i.push(a)}})),i.length>0)return this.setState({inJumpChain:!0,pieceToMove:e,targets:i}),!0}return!1}},{key:"endTurn",value:function(){this.socket.emit("endturn"),this.setState({isMyTurn:!1})}},{key:"getPossibleTargets",value:function(e){var t=this,n=[];return[[1,1],[-1,1],[1,-1],[-1,-1]].forEach((function(a){if(e.isKing||!(1===e.player&&1===a[0]||2===e.player&&-1===a[0])){var o=e.row+a[0],r=e.col+a[1];o>=0&&r>=0&&o<8&&r<8&&n.push(t.state.board[o][r])}})),n}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"board"},!this.state.hasBothPlayers&&o.a.createElement(E,null),this.state.board.map((function(t,n){return o.a.createElement("div",{className:"row",key:n},t.map((function(t,a){return o.a.createElement("div",{className:"cell ".concat(t.canHavePiece()?"moveable":""),key:a,onClick:function(){return e.handleCellClick(t)}},t.hasPiece()&&o.a.createElement("div",{className:"piece player".concat(t.piece.player),onClick:function(){return e.showMoveTargets(t.piece,n,a)}},t.piece.isKing&&o.a.createElement(T.Icon,{icon:C.a,className:"king"})),e.state.targets.includes(t)&&o.a.createElement("div",{className:"target-marker"}))})))})))}}]),n}(o.a.Component)),j=n(56),P=(n(103),function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).state={gameURL:null},a}return Object(s.a)(n,[{key:"createGame",value:function(){var e=Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15);this.setState({gameURL:e}),window.open("/checkers/game/"+e,"_self")}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"gameGenerator"},o.a.createElement(j.a,{onClick:function(){return e.createGame()}},"Click to start a game!"))}}]),n}(o.a.Component)),S=n(29),B=(n(104),function(){return o.a.createElement(S.a,{basename:"/checkers"},o.a.createElement(w.a,{path:"/",exact:!0,component:P}),o.a.createElement(w.a,{path:"/game/:id",exact:!0,component:M}),o.a.createElement(w.a,{path:"/test",exact:!0,component:E}))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(B,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},57:function(e,t,n){e.exports=n(105)},93:function(e,t){},96:function(e,t,n){}},[[57,1,2]]]);
//# sourceMappingURL=main.d13fa108.chunk.js.map