// 必要な変数を定義する (02)
let m;
let s;
let st;
let gt;
let bt;
let sp;

let bi;
let bx;
let by;

let ai;
let ax;
let ay;
let ac;
let as;
let aa;
let ad;

let x;
let y;
let xx;
let yy;

function preload() {
    // 画像を読み込む (02)
    bi = loadImage("image/basket.png")
    ai = loadImage("image/apple.png")
    ad = loadSound("audio/倒れる.mp3")
}

function setup() {
    createCanvas(500, 500);
    imageMode(CENTER);

    // 変数を初期化する (02)
    mode = 0;
    bx = random(width)
    by = random(height)
    sp = 5;
    ax = [200];
    ay = [0];
    ac = [false];
    bt = 0;
    s = 0;
    as = 0;
}

function draw() {
    background("lightblue");

    if (mode == 0) {
        // スタート画面の表示 (03)
        st = millis();
        textAlign(CENTER);
        text("クリックしてスタート",width/2,height/2);
        text("SCORE: " + s,width/2,height/2 + 30);
        if (mouseIsPressed){
            mode = 1
            s = 0;
            aa = floor(random(10,100));
        }
    }

    if (mode == 1) {
        // かごを動かす (04)
        if (keyIsDown(LEFT_ARROW)){
            bx -= sp;
            sp += 0.5;
        }

        if (keyIsDown(RIGHT_ARROW)){
            bx += sp;
            sp += 0.5;
        }
        
        if (keyIsDown(DOWN_ARROW)){
            by += sp;
            sp += 0.5;
        }

        if (keyIsDown(UP_ARROW)){
            by -= sp;
            sp += 0.5;
        }

        if (bx < -60){
            bx = width;
        }

        if (bx > width){
            bx = 0;
        }
        
        if (by < -60){
            by = height;
        }

        if (by > height){
            by = 0;
        }

        // 一定時間おきにりんごを増やす (06)
        if (millis() - bt > 1500){
            bt = millis() - int(random(100,1000,100));
            ax.push(random(0,width));
            ay.push(0);
            ac.push(false);
        }
        
        // りんごを落とす (05)
        for (let i = 0;i < ay.length;i++){
            ay[i] += 5;
        }
        
        // かごとりんごが重なったら (07)
        for (let i = 0;i < ax.length;i++){
            if(bx - 30 < ax[i] && ax[i] < bx + 30 && by - 20 < ay[i] && ay[i] < by + 30 && ac[i] == false){
                s++;
                st += 1000;
                ac[i] = true;
                ay[i] = -1000000;
            }
        }
        
        for (let i = 0;i < ay.length;i++){
            if (ay[i] > height){
                aa -= 1;
                ad.play();
                ay[i] = 0;
            }
        }

        // りんごを表示する (05)
        for (let i = 0;i < ax.length;i++){
            if (ac[i] == false){
                image(ai,ax[i],ay[i],40,40)
            }
        }
        
        // かごを表示する (04)
        image(bi,bx,by,60,60)
        
        // スコアを表示する (08)
        textAlign(LEFT);
        text("SCORE: " + s,10,20);
        
        // 時間を表示する (08)
        gt = 20 - floor((millis() - st) / 1000);
        text("DROP: " + aa,width - 80,20);
        
        // 時間切れでゲームを終了する (09)
        if (aa <= 0){
            mode = 0        }       
    }

}

// キーを放したときに速度をリセットする
function keyReleased(){
    sp = 5;
}
