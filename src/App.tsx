
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import LottieView from 'lottie-react-native';
import React, { useState , useRef, useEffect} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Snackbar from "react-native-snackbar";
import Icons from './Components/Icons.jsx';


function App(): JSX.Element {
  const[isCross,setisCross]=useState<boolean>(false)
  const[gameWinner,setgameWinner]=useState<string>("")
  const[gameState,setgameState]=useState(new Array(9).fill("empty",0,9))
  const [winningCombination, setWinningCombination] = useState<number[]>([]);
  const confettiRef = useRef<LottieView>(null);
  const dance=useRef<LottieView>(null)

// TODO: Delay the animation time
  useEffect(() => {
    if (gameWinner) {
      triggerConfetti();
      danceconfetti();
    }
  }, [gameWinner]);
 


  const triggerConfetti = () => {
    confettiRef.current?.play();
  }

  const danceconfetti =()=>{
    dance.current?.play();
  }

  const reloadGame=()=>{
    setisCross(false);
    setgameWinner("");
    setgameState(new Array(9).fill("empty",0,9))
   
  }


  const checkisWinner=()=>{
    if(
      gameState[0]==gameState[1] &&
      gameState[0]==gameState[2] &&
      gameState[0]!== "empty"
      ){
        setgameWinner(`${gameState[0]} won the game`);
      }
   else if
   (
    gameState[4]==gameState[5] &&
    gameState[3]==gameState[4] &&
    gameState[3]!== "empty"
    ){
      setgameWinner(`${gameState[3]} won the game `);
    }
    else if
    (
     gameState[6]==gameState[7] &&
     gameState[7]==gameState[8] &&
     gameState[6]!== "empty"
     ){
       setgameWinner(`${gameState[6]} won the game `);
     }
     else if
    (
     gameState[0]==gameState[3] &&
     gameState[3]==gameState[6] &&
     gameState[0]!== "empty"
     ){
       setgameWinner(`${gameState[0]} won the game `);
     }
     else if
    (
     gameState[4]==gameState[1] &&
     gameState[4]==gameState[7] &&
     gameState[1]!== "empty"
     ){
       setgameWinner(`${gameState[1]} won the game `);
     }
     else if
    (
     gameState[2]==gameState[5] &&
     gameState[5]==gameState[8] &&
     gameState[2]!== "empty"
     ){
       setgameWinner(`${gameState[2]} won the game `);
     }
     else if
    (
     gameState[0]==gameState[4] &&
     gameState[4]==gameState[8] &&
     gameState[0]!== "empty"
     ){
       setgameWinner(`${gameState[0]} won the game `);
     }
     else if
    (
     gameState[2]==gameState[4] &&
     gameState[4]==gameState[6] &&
     gameState[2]!== "empty"
     ){
       setgameWinner(`${gameState[2]} won the game `);
     }

    else if( (!gameWinner && !gameState.includes("empty",0))){
      setgameWinner("Game is Draw")
    }
  }
  


  const onchangeitem = (itemNumber : number) =>{
    if(gameWinner){
      triggerConfetti();
      danceconfetti();
      return Snackbar.show({
        text:gameWinner,
        backgroundColor:"#00000",
        textColor:"#FFFFFF"
      })
    }

  if(gameState[itemNumber]=="empty"){
    gameState[itemNumber]= isCross ? "cross" : "circle";
    setisCross(!isCross)
  }
  else {
    return Snackbar.show({
      text:"Position is already filled",
      backgroundColor:"red",
      textColor:"#FFF"
    })
  }
    checkisWinner()
  }




  return (
    <SafeAreaView>
       
      <StatusBar />
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View style={[styles.playerInfo, isCross ? styles.playerX : styles.playerO]}>
          <Text style={styles.gameTurnTxt}>
            Player {isCross ? 'X' : 'O'}'s Turn!!
          </Text>
        </View>
      )}
  
      {/* GAME GRID */}
      <FlatList
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({ item, index }) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => onchangeitem(index)}
          >
            <Icons name={item} />
          </Pressable>
        )}
      />
  
      {/* Reset button */}
      <Pressable onPress={reloadGame} style={styles.gameBtn}>
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Start new Game' : 'Reload The Game'}
        </Text>
      </Pressable>
      {gameWinner && (
        <>
          <View style={styles.centeredContainer}>
        <LottieView
          ref={confettiRef}
          source={require('./Components/confetti.json')}
         
          autoPlay={true}
          loop={true}
          style={styles.lottie}
          resizeMode='cover'
        />
        </View>
            <View style={styles.centeredContainer}>
        <LottieView 
        ref={dance}
        source={require("./Components/dance.json")}
        autoPlay={true}
        loop={true}
        style={styles.dance}
        resizeMode='cover'
      />
      </View>
      </>
      )}
           
  

          
    </SafeAreaView>
  );
  
}
const styles = StyleSheet.create({
  dance:{
    height:350,
    width:350,
    
   
  },
  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },

  lottie: {
    width: 500, 
    height: 300,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#F93106',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  centeredContainer: {
    position:'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
