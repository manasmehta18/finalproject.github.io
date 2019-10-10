import React from 'react';
import * as dat from "dat.gui";
import {audioGraph, audioInit, getCanvas} from "./setUpModule";
import {visualizer} from "./visualizerModule";

export default function FeedItem(props) {

    /* Props: 
     * song - {title: "foo", artist: "foo"}
     * user - {username: "foo", name: "foo"}
     * options - {height: 0, length: 0, file: 0}
     */

    async function handleClick() {
        console.log('paper has been clicked');

        //get song and play it for the vis


    }

    const gui = new dat.GUI()

    let currColor = 0

    const blue = function () {
        currColor = 0
    }

    const green = function () {
        currColor = 1
    }

    const changeParam = new function () {
        this.barHeight = 1
        this.barWidth = 4
        this.barFit = 2
        this.canvasClr = '#000000'
    }()

    const startMello = function () {
        console.log("yoooooooo")
        const canvas = getCanvas()

        const jsonAudioInit = audioInit(canvas)
        const jsonAudioGraph = audioGraph(canvas, jsonAudioInit)

        jsonAudioInit.audioElement.src = 'mello.mp3'
        jsonAudioInit.audioElement.controls = true;
        jsonAudioInit.audioElement.play()

        const results = new Uint8Array(jsonAudioGraph.analyser.frequencyBinCount)

        const draw = function () {
            window.requestAnimationFrame(draw)
            visualizer(canvas, jsonAudioInit, jsonAudioGraph, results, currColor, changeParam.barHeight, changeParam.barWidth, changeParam.barFit, changeParam.canvasClr)
        }
        draw()
    }

    window.localStorage;
    window.onload = function () {

        console.log("dddd");

        document.getElementById('mello').onclick = startMello
        document.getElementById('blue').onclick = blue
        document.getElementById('green').onclick = green

        gui.add(changeParam, 'barHeight', 0, 3).name('Bar Height')
        gui.add(changeParam, 'barWidth', 0, 6).name('Bar Width')
        gui.add(changeParam, 'barFit', 0.5, 5).name('Visualizer Fit')
        gui.addColor(changeParam, 'canvasClr').name('Canvas Color')
    }

    return (
            <div className="w-full my-5">
                <div className="w-full bg-white rounded overflow-hidden shadow-lg glower">
                    <div className="w-full h-48 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-t lg:rounded-t-none lg:rounded-l p-4 flex flex-col justify-between leading-normal">
                        <div className="mb-8">
                            <p className="text-sm text-gray-600 flex items-center">
                            </p>
                            <div className="text-gray-900 font-bold text-xl mb-2">{props.song.title}</div>
                            <p className="text-gray-700 text-base">
                                Visualize the awesome tracks that you upload! We have a wide range of customizable visualizers.
                            </p>
                        </div>
                        <div className="w-full flex">
                            <div className="flex w-1/2 items-center">
                                <img className="w-10 h-10 rounded-full mr-4" src={require("../media/Manas.jpg")}
                                     alt="Avatar of Manas Mehta"/>
                                <div className="text-sm">
                                    <p className="text-gray-900 leading-none">{props.user.username}</p>
                                    <p className="text-gray-600">Oct 8</p>
                                </div>
                            </div>
                            <div id="btnContainer" className="w-1/2">
                                <button id="mello" className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={startMello}>Play</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}