import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
// opcode table: char per opcode 0..83, code-49 = imm*16+pops*4+pushes; '0' = no opcode
const T='1Br57;<@00000000:::::::6:::6:::0:::0000000000000QUUQ10000000000069000000000000005525';
for(const d of readdirSync(I).sort()){
 try{
 const p=readFileSync(join(I,d,'program.bin')),q=readFileSync(join(I,d,'input.bin')),n=p.length;
 const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
 let s=0,c=0,pc=0,st=0,ip=0,ol=0,code=0;
 try{for(;;){
  if(st===1e6)throw 10;
  if(pc<0||pc>=n)throw 9;
  const op=p[pc];
  if(op>83||T[op]=='0')throw 5;
  const v=T.charCodeAt(op)-49,im=v>>4,po=(v>>2)&3,pu=v&3;
  if(pc+im>=n)throw 9;
  st++;const nx=pc+1+im;
  if(s<po)throw 2;
  if(s-po+pu>256)throw 3;
  pc=nx;
  if(op>=16&&op<=22||op>=24&&op<=26||op>=28&&op<=30||op>=32&&op<=34){
   const b=D[s-1],a=D[s-2];let r;
   if(op==16)r=a+b|0;else if(op==17)r=a-b|0;else if(op==18)r=Math.imul(a,b);
   else if(op==19){if(!b)throw 4;r=a==-2147483648&&b==-1?a:(a/b)|0}
   else if(op==20){if(!b)throw 4;r=b==-1?0:a%b|0}
   else if(op==21){if(!b)throw 4;r=Math.floor((a>>>0)/(b>>>0))|0}
   else if(op==22){if(!b)throw 4;r=(a>>>0)%(b>>>0)|0}
   else if(op==24)r=a&b;else if(op==25)r=a|b;else if(op==26)r=a^b;
   else if(op==28)r=a<<(b&31);else if(op==29)r=a>>(b&31);
   else if(op==30)r=a>>>(b&31)|0;else if(op==32)r=a==b?1:0;
   else if(op==33)r=a<b?1:0;else r=(a>>>0)<(b>>>0)?1:0;
   s-=2;D[s++]=r;continue;
  }
  switch(op){
   case 0:throw 0;
   case 1:D[s++]=(p[nx-1]<<24)>>24;break;
   case 2:D[s++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;break;
   case 3:s--;break;
   case 4:D[s]=D[s-1];s++;break;
   case 5:{const t=D[s-1];D[s-1]=D[s-2];D[s-2]=t;break}
   case 6:D[s]=D[s-2];s++;break;
   case 7:{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break}
   case 23:D[s-1]=-D[s-1]|0;break;
   case 27:D[s-1]=~D[s-1];break;
   case 48:pc=nx+(((p[nx-2]|p[nx-1]<<8)<<16)>>16);break;
   case 49:case 50:{const v=D[--s];if((op==49)===(v==0))pc=nx+(((p[nx-2]|p[nx-1]<<8)<<16)>>16);break}
   case 51:if(c==64)throw 7;C[c++]=nx;pc=p[nx-2]|p[nx-1]<<8;break;
   case 52:if(!c)throw 8;pc=C[--c];break;
   case 64:{const a=D[s-1];if(a<0||a>255)throw 6;D[s-1]=M[a];break}
   case 65:{const a=D[s-1],v=D[s-2];if(a<0||a>255)throw 6;s-=2;M[a]=v;break}
   case 80:{const t=String(D[s-1]);if(ol+t.length>65536)throw 11;s--;for(let i=0;i<t.length;i++)o[ol++]=t.charCodeAt(i);break}
   case 81:if(ol+1>65536)throw 11;o[ol++]=D[--s]&255;break;
   case 82:D[s++]=ip<q.length?q[ip++]:-1;break;
   case 83:throw D[--s]&255;
  }
 }}catch(e){code=typeof e=='number'?e:1}
 mkdirSync(join(O,d),{recursive:true});
 writeFileSync(join(O,d,'stdout.bin'),o.slice(0,ol));
 writeFileSync(join(O,d,'exit.txt'),code+'\n');
 }catch{
  try{mkdirSync(join(O,d),{recursive:true});writeFileSync(join(O,d,'stdout.bin'),'');writeFileSync(join(O,d,'exit.txt'),'9\n')}catch{}
 }
}
