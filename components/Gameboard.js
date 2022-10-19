import React, { useState, useEffect } from "react";
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';

//Muuttujat
let board = [];
let nbrSum = [0, 0, 0, 0, 0, 0];
let nbrSelectPossible = false;
let diceSelectPossible = false;
let throwPossible = true;
let getBonus = false;
let gameOver = false;

//Vakiot
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
const SUM_FOR_BONUS = 63;
const BONUS = 35;

export default function Gameboard() {

    //State variaabelit
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [sum, setSum] = useState(0);
    const [status, setStatus] = useState('');
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    const [usedNbrs, setUsedNbrs] = useState(new Array(6).fill(false));




    //Nopat
    const diceRow = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        diceRow.push(
            <Pressable
                key={"row" + i}
                onPress={() => selectDice(i)}
            >
                <MaterialCommunityIcons
                    name={board[i]}
                    key={"row" + i}
                    size={65}
                    color={selectedDices[i] ? "purple" : "black"}
                />
            </Pressable>
        );
    }

    //Valinta
    function selectDice(i) {
        if (diceSelectPossible) {
            let dices = [...selectedDices];
            dices[i] = selectedDices[i] ? false : true;
            setSelectedDices(dices);
        } else (
            setStatus("Ensin pitää heittää noppaa.")
        )
    }

    //Heitto
    function throwDices() {
        if (throwPossible && !gameOver) {
            for (let i = 0; i < NBR_OF_DICES; i++) {
                if (!selectedDices[i]) {
                    let randomNumber = Math.floor(Math.random() * 6 + 1);
                    board[i] = 'dice-' + randomNumber;
                }
            }
            setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
        } else if (gameOver) {
            newGame();
        }
    }




    //Numerot
    const nbrRow = [];
    for (let i = 0; i < 6; i++) {
        nbrRow.push(
            <View style={styles.numbers} key={"nbrRow" + i}>
                <Text style={styles.nbrSum}>{nbrSum[i]}</Text>
                <Pressable
                    key={"nbrRow" + i}
                    onPress={() => useNbr(i)}
                >
                    <MaterialCommunityIcons
                        name={'numeric-' + (i + 1) + '-circle'}
                        key={"nbrRow" + i}
                        size={50}
                        color={usedNbrs[i] ? "purple" : "smoke"}
                    />
                </Pressable>
            </View>
        );
    }

    //Valinta
    function useNbr(i) {
        let nbrs = [...usedNbrs];
        if (nbrSelectPossible && !nbrs[i]) {
            nbrs[i] = true;
            setUsedNbrs(nbrs);
            var tempSum = 0;
            for (let x = 0; x < diceRow.length; x++) {
                var diceVal = parseInt(board[x].match(/(\d+)/)[0]); 
                if (diceVal - 1 == i) {
                    tempSum += diceVal;
                }
            }
            nbrSum[i] = tempSum;
            setSum(sum + parseInt(tempSum));
            //Reset
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
            setNbrOfThrowsLeft(3);
        } else if (nbrs[i]) {
            setStatus("Valitsit jo " + (i + 1));
        }
    }




    //Status 
    useEffect(() => {
        if (nbrOfThrowsLeft === 0) {
            setStatus('Valitse numero.');
            throwPossible = false;
            nbrSelectPossible = true;
            
        } else if (nbrOfThrowsLeft < NBR_OF_THROWS) {
            setStatus('Heitä uudelleen tai valitse numero');
            throwPossible = true;
            nbrSelectPossible = true;
            diceSelectPossible = true;
        } else if (nbrOfThrowsLeft === NBR_OF_THROWS && !usedNbrs.every(x => x === true)) {
            setStatus('Heitä noppia.');
            throwPossible = true;
            nbrSelectPossible = false;
            diceSelectPossible = false;
        } else if (nbrOfThrowsLeft === NBR_OF_THROWS && usedNbrs.every(x => x === true)) {
            setStatus('Game over dude!');
            throwPossible = false;
            diceSelectPossible = false;
            nbrSelectPossible = false;
            gameOver = true;
        }
    }, [nbrOfThrowsLeft]);

    //Bonus
    function checkBonus() {
        if (sum >= SUM_FOR_BONUS) {
            getBonus = true;
            return ("Bonusta tipahti!")
        } else {
            return ((SUM_FOR_BONUS - sum) + " pisteen päässä bonuksesta.");
        }
    }

    //Uuden pelit variaabelit
    function newGame() {
        gameOver = false;
        setSum(0);
        setUsedNbrs(new Array(6).fill(false));
        nbrSum = [0, 0, 0, 0, 0, 0];
        setNbrOfThrowsLeft(3);
        nbrSelectPossible = true;
        diceSelectPossible = true;
        throwPossible = true;
        getBonus = false;
        throwDices();
    }

    return(
        <View style={styles.gameboard}>
            <View style={[styles.flex, styles.dropShadow]}>{diceRow}</View>
            <Text style={styles.gameinfo}>Heittoja jäljellä: {nbrOfThrowsLeft}</Text>
            <Text style={styles.gameinfo}>{status}</Text>
            <Pressable style={[styles.button, styles.dropShadow]}
                onPress={() => throwDices()}>
                <Text style={styles.buttonText}>
                    {gameOver ? 'Uusi peli' : 'Heitä noppaa'}
                </Text>
            </Pressable>
            <Text style={[styles.gameinfo, styles.gamevalue]}>Tulos: {getBonus ? (sum + BONUS) : sum }</Text>
            <Text style={styles.gameinfo}>{checkBonus()}</Text>
            <View style={[styles.flex, styles.dropShadow]}>{nbrRow}</View>
        </View>
    )
};