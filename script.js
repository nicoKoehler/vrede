

const app = Vue.createApp({

    data(){
        return{
            showModal: false,
            showDesc: false,
            showLog: false,
            showSettings: false,
            showFight: false,
            showCard: false,
            btn_sel:{                               // if more than 2 elem >>> change toggleBtn !!!
                'skirm': true,
                'risk': false
            },
            cnt_army:{
                attack: 0,
                defend: 0
            },
            repeatAttack: true,
            fightOver: false,
            fightBook: {},
            cardDisplay:{},
            cards: {},
            devCardTypes: ["economic", "culture", "military"],
            regions: ["Africa", "Asia", "Australia", "Europe", "North America", "South America"]
        }
    
    },
    mounted(){
        fetch("/data/cards.json")
        .then(res => res.json())
        .then(json => {
            this.cards = json
    })
    },
    methods:{
        currentBattleSetting(){
            if (this.btn_sel['skirm']) return 'Skirmish'
            if (this.btn_sel['risk']) return 'Risk 3-Dice'
            return 'None'
        },
        toggleDesc(){
            this.showDesc = !this.showDesc
            this.showModal = !this.showModal

        },
        toggleSettings(){
            this.showSettings = !this.showSettings

        },
        toggleFight(){
            this.showFight = !this.showFight
            this.showModal = !this.showModal
        },
        toggleBtn(org){
            this.btn_sel[org] = !this.btn_sel[org]
            other = Object.keys(this.btn_sel).filter(w => w != org) // this method assumes there is always exactly one other button to be pressed
            if (this.btn_sel[other]){
                this.btn_sel[other] = !this.btn_sel[other]
            }
            
        },
        btn_add(side){
            this.cnt_army[side] += 1
        },
        btn_sub(side){
            if (this.cnt_army[side] > 0){
                this.cnt_army[side] -= 1
            }
        },

        toggleLogs(f){

            if(f ===1){
                this.showLog = !this.showLog
                this.showModal = !this.showModal
                return 0
            }
            if(f === 2){
                this.showLog = !this.showLog
                this.showFight = false
                return 0                
            }
        },
        getPic(){
            return this.cardDisplay.picture
        },
        toggleCard(type){
            this.showModal = !this.showModal
            this.showCard = !this.showCard

            if (type != "0"){
                
                cardDisplay = {}
                if( type === "event"){
                    
                        ifEvent = this.getRandomInt(6)
                        console.log(ifEvent);
                        //determine if an event happens
                        if (ifEvent < 4){
                            console.log("No Event");
                            this.cardDisplay = this.cards.event["0"]
                            this.cardDisplay.type = "card-E"

                            
                        }else if(ifEvent >= 4){
                            console.log("EVENT");
                            cnt_event = Object.keys(this.cards.event).length -1
                            whichEvent = this.getRandomInt(cnt_event)
                            
                            //set region
                            whichRegion = this.getRandomInt(this.regions.length) -1
                            this.cardDisplay = this.cards.event[`${whichEvent}`]
                            this.cardDisplay.region = this.regions[whichRegion];
                        }else{
                            alert("Oh rats... a Problem in... Event cards")
                        }
                }else if(this.devCardTypes.includes(type)){

                    cnt_eco = Object.keys(this.cards[type]).length -1
                    whichEco = this.getRandomInt(cnt_eco)
                    this.cardDisplay = this.cards[type][`${whichEco}`]
                    this.cardDisplay.region = this.regions[this.getRandomInt(this.regions.length)];
                    console.log(this.cardDisplay);

                }else{
                    alert("Oh rats... a Problem in... Dev cards")
                }

                

            }

            

        },
        getRandomInt(max){
            return Math.floor(Math.random() * (max)) + 1
        },
        raise(cnt, army, cap = 9999999){    // not elegant, but functional
            for (i = 0; i < Math.min(cnt,cap); i++){
                army.push(this.getRandomInt(6))
            }
            army = army.sort(function(a,b){return b - a})
        },
        fight(){
            this.fightOver = false
            this.fightBook = {
                winner: "None",
                start_attack: this.cnt_army['attack'],
                start_defend: this.cnt_army['defend'],
                remaining_attack: 0,
                remaining_defend: 0, 
                losses_attack: 0,
                losses_defend: 0,
                fightLog: {}
            }
                        
            //escape if no fight mode selected
            if (!this.btn_sel['skirm'] && !this.btn_sel['risk']){
                alert("No fight mode selected. Please select ONE!")
                return 0
            }
            //escape if not sufficient armies selected
            if (this.cnt_army['attack'] < 1 || this.cnt_army['defend'] < 1){
                alert("Not enough armies selected. Select at least one per side!!")
                return 0
            }

            let cnt_attack = this.cnt_army['attack']
            let cnt_defend = this.cnt_army['defend']

            //Skirmish fighting
            
            let arr_attackRes = []
            let arr_defendRes = []
            let loss_O = 0
            let loss_D = 0
            rounds = 1
            

            while(cnt_attack > 0 && cnt_defend > 0){
                this.fightBook.fightLog[`round_${rounds}`] = {
                    round: rounds,
                    winner: "",
                    loss_A: 0,
                    loss_D: 0,
                    attack: [],
                    defend:[]
                }
                arr_attackRes = []
                arr_defendRes = []
                loss_O = 0
                loss_D = 0

                // raise pips
                // fight mode only takes effect here

                if(this.btn_sel['skirm']){
                    this.raise(cnt_defend, arr_defendRes)
                    this.raise(cnt_attack, arr_attackRes)
                }else if(this.btn_sel['risk']){
                    this.raise(cnt_defend, arr_defendRes,2)
                    this.raise(cnt_attack, arr_attackRes,3) 
                }else{
                    alert("Something went terribly wrong here...")
                    return 0
                }
                
    
                this.fightBook.fightLog[`round_${rounds}`].attack = arr_attackRes
                this.fightBook.fightLog[`round_${rounds}`].defend = arr_defendRes

                for (i=0; i < cnt_attack; i++){
                    if (!arr_defendRes[i]){break}
                    if (arr_attackRes[i] > arr_defendRes[i]){
                        loss_D ++
                    }else{loss_O ++}
                }
                
                if (arr_defendRes.length == loss_D){
                    this.fightBook.fightLog[`round_${rounds}`].winner = "Attack"
                }else{
                    this.fightBook.fightLog[`round_${rounds}`].winner = "Defender"
                }
 
                cnt_attack = cnt_attack - loss_O
                cnt_defend = cnt_defend - loss_D
                if (cnt_defend > 0){
                    this.fightBook.winner = "Defender"
                    
                }else{
                    this.fightBook.winner = "Attack"
                    
                }
                
                this.fightBook.fightLog[`round_${rounds}`].pips_attack = [
                    {pips:"6", count : arr_attackRes.filter(p => p===6).length},
                    {pips:"5", count : arr_attackRes.filter(p => p===5).length},
                    {pips:"4", count : arr_attackRes.filter(p => p===4).length},
                    {pips:"3", count : arr_attackRes.filter(p => p===3).length},
                    {pips:"2", count : arr_attackRes.filter(p => p===2).length},
                    {pips:"1", count : arr_attackRes.filter(p => p===1).length}
                ]
                
                this.fightBook.fightLog[`round_${rounds}`].pips_defend = [
                    {pips:"6", count: arr_defendRes.filter(p => p===6).length},
                    {pips:"5", count: arr_defendRes.filter(p => p===5).length},
                    {pips:"4", count: arr_defendRes.filter(p => p===4).length},
                    {pips:"3", count: arr_defendRes.filter(p => p===3).length},
                    {pips:"2", count: arr_defendRes.filter(p => p===2).length},
                    {pips:"1", count: arr_defendRes.filter(p => p===1).length}
                ]
                
                this.fightBook.fightLog[`round_${rounds}`].loss_A = loss_O
                this.fightBook.fightLog[`round_${rounds}`].loss_D = loss_D

                if (!this.repeatAttack) break;
                rounds ++;


            }

            
            
            this.fightBook.remaining_attack = cnt_attack
            this.fightBook.remaining_defend = cnt_defend
            this.fightBook.losses_attack = this.cnt_army['attack'] - cnt_attack
            this.fightBook.losses_defend = this.cnt_army['defend'] - cnt_defend

            this.cnt_army['attack'] = cnt_attack
            this.cnt_army['defend'] = cnt_defend
            this.fightOver = !this.fightOver



            console.log(JSON.stringify(this.fightBook));
            this.toggleFight()


            

        },
        
    }


})

app.mount("#main")