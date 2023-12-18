/* eslint-disable */

const everyAyahUrl = 'https://everyayah.com/data/Ahmed_ibn_Ali_al-Ajamy_128kbps_ketaballah.net/070023.mp3';

window.onload = () => {
  /** Global variables */
  const MAX_REWIND = 3;
  const MAX_FAST_FORWARD = 3;
  let AUDIO_TRIGGER_IS_DRAGGING = false;

  const currentRecitationMeta = {
    audioPath: 'static/audio',
    recitatorPath: null,
    surahPath: null,
  };

  const capturedReplayMeta = {
    PLAYING_CAPTURE: false,
    START_TIME: null,
    END_TIME: null,
  };

  /** Global element tags */
  const recitatorOption = document.querySelector('#recitator');
  const surahOption = document.querySelector('#surah');
  const recitationAudioTag = document.querySelector('#recitation-audio');
  const audioBar = document.querySelector('#audio-bar');
  const audioTrigger = document.querySelector('#audio-trigger');
  const innerAudioBar = document.querySelector('#inner-audio-bar');
  const capturedTimeTextArea = document.querySelector('#captured-time');
  const copyCapturedTimeArea = document.querySelector('#copy-area');

  const copyBtn = document.querySelector('#copy-button');
  const captureBtn = document.querySelector('#capture-btn');
  const playBtn = document.querySelector('#play');
  const fastForwardBtn = document.querySelector('#fastforward');
  const rewindBtn = document.querySelector('#rewind');
  const resetBtn = document.querySelector('#reset');

  const currentTimeText = document.querySelector('#current-time');
  const durationTimeText = document.querySelector('#duration-time');

  let capturedTime = [];

  /** Custom Helper Function */
  const fetcher = async (url, options) => {
    try {
      const result = await fetch(url, options);
      const responses = await result.json();
      return responses;
    } catch (err) {
      console.log(err);
    }
  };

  const formatNumberPad = (number, length = 3) => {
    return String(number).padStart(length, '0');
  };

  const formatTime = (timeInSecond) => {
    const absoluteTime = Math.abs(timeInSecond);
    const hours = Math.floor(absoluteTime / 3600);
    const minutes = Math.floor((absoluteTime % 3600) / 60);
    const seconds = Math.floor(absoluteTime % 60);
    return `${formatNumberPad(hours, 2)}:${formatNumberPad(minutes, 2)}:${formatNumberPad(seconds, 2)}`;
  };

  const formatCapturedTime = (time) => {
    const splittedTime = String(time).split('.');
    return `${splittedTime[0]}.${splittedTime[1].toString()[0]}`;
  };

  /** Custom Helper DOM Function */
  const recitatorSurahDOM = (recitatorAvailableSurah) => {
    const surahOptionList = surahOption.querySelectorAll('option');
    surahOptionList.forEach((optionElement) => {
      if (!recitatorAvailableSurah.find((surahSequence) => String(surahSequence) === optionElement.value)) {
        optionElement.setAttribute('disabled', '');
      }
    });
  };

  const playingStateDOM = () => {
    const playingState = document.querySelector('#state');
    if (currentRecitationMeta.recitatorPath && currentRecitationMeta.surahPath) {
      const selectedSurah = surahOption.options[surahOption.selectedIndex];
      const selectedRecitator = recitatorOption.options[recitatorOption.selectedIndex];
      playingState.textContent = `Playing Q.S ${selectedSurah.innerHTML} - ${selectedRecitator.innerHTML}`;
    }
  };

  const togglePlayButtonDOM = () => {
    if (playBtn.querySelector('i').classList.contains('bx-play') && !recitationAudioTag.paused) {
      playBtn.querySelector('i').classList.remove('bx-play');
      playBtn.querySelector('i').classList.add('bx-pause');
    } else {
      playBtn.querySelector('i').classList.remove('bx-pause');
      playBtn.querySelector('i').classList.add('bx-play');
    }
  };

  const renderCapturedTimeDOM = () => {
    capturedTimeTextArea.innerHTML = '';

    capturedTime.forEach((time) => {
      const span = document.createElement('span');
      span.innerText = `${time.s || ''} - ${time.e || ''}`;
      span.onclick = handleReplayCapturedTime;
      span.className = 'block col-span-1 bg-white border border-slate-300 hover:bg-slate-200 text-center py-2 rounded-sm relative cursor-pointer';
      span.dataset.id = time.i;
      span.dataset.start = time.s;
      span.dataset.end = time.e;
      capturedTimeTextArea.appendChild(span);
    });
  };

  const audioBarPercentage = (percent) => {
    audioBar.style.width = `${percent}%`;
    audioTrigger.style.left = `${percent}%`;
  };

  /** Custom handler function */
  const handleResetRecitation = (e) => {
    if (currentRecitationMeta.recitatorPath && currentRecitationMeta.surahPath) {
      recitationAudioTag.currentTime = 0;
      recitationAudioTag.src = Object.values(currentRecitationMeta).join('/');
      audioBarPercentage(0);
      togglePlayButtonDOM();
      capturedTime = [];
      renderCapturedTimeDOM();
    }
  };

  const handleRecitatorOption = async (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];

    if (selectedOption.dataset.path) {
      currentRecitationMeta.recitatorPath = selectedOption.dataset.path;
    }

    const recitatorMeta = await fetcher(`/api/v1/recitator/${e.target.value}`);
    if (recitatorMeta?.header.code === 200) {
      const availableSurahList = recitatorMeta.body.data.audioSurahSequence;
      recitatorSurahDOM(availableSurahList);
    }

    playingStateDOM();
    handleResetRecitation();
  };

  const handleSurahOption = (e) => {
    const selectedOption = e.target.value;

    if (currentRecitationMeta.recitatorPath) {
      currentRecitationMeta.surahPath = `SU${formatNumberPad(selectedOption, 3)}.mp3`;
    }

    playingStateDOM();
    handleResetRecitation();
  };

  const handlePlayButton = (e) => {
    if (currentRecitationMeta.recitatorPath && currentRecitationMeta.surahPath) {
      if (recitationAudioTag.paused) {
        recitationAudioTag.play();
      } else {
        recitationAudioTag.pause();
      }

      togglePlayButtonDOM();
    }
  };

  const handleRewindButton = (e) => {
    if (currentRecitationMeta.recitatorPath && currentRecitationMeta.surahPath) {
      if (recitationAudioTag.currentTime) {
        if (recitationAudioTag.currentTime < 3) {
          recitationAudioTag.currentTime = 0;
        } else {
          recitationAudioTag.currentTime = recitationAudioTag.currentTime - MAX_REWIND;
        }
      }
    }
  };

  const handleFastforwardButton = (e) => {
    if (currentRecitationMeta.recitatorPath && currentRecitationMeta.surahPath) {
      if (recitationAudioTag.currentTime) {
        if (recitationAudioTag.duration < recitationAudioTag.currentTime + MAX_FAST_FORWARD) {
          recitationAudioTag.currentTime = recitationAudioTag.duration;
        } else {
          recitationAudioTag.currentTime = recitationAudioTag.currentTime + MAX_REWIND;
        }
      }
    }
  };

  const handleResetButton = (e) => {
    recitationAudioTag.currentTime = 0;
    recitationAudioTag.pause();
    togglePlayButtonDOM();
  };

  const handleAudioEnded = (e) => {
    togglePlayButtonDOM();
  };

  const handleAudioPlaying = (e) => {
    currentTimeText.innerText = formatTime(recitationAudioTag.currentTime);
    audioBarPercentage((recitationAudioTag.currentTime / recitationAudioTag.duration) * 100);

    if (capturedReplayMeta.PLAYING_CAPTURE && capturedReplayMeta.END_TIME && Number(capturedReplayMeta.END_TIME) <= recitationAudioTag.currentTime) {
      recitationAudioTag.pause();
      togglePlayButtonDOM();
      capturedReplayMeta.PLAYING_CAPTURE = false;
      capturedReplayMeta.START_TIME = null;
      capturedReplayMeta.END_TIME = null;
    }
  };

  const handleAudioTagLoaded = (e) => {
    durationTimeText.innerText = formatTime(recitationAudioTag.duration);
  };

  const handleCaptureTheCurrentAudioTime = (e) => {
    if (currentRecitationMeta.recitatorPath && currentRecitationMeta.surahPath) {
      if (capturedTime.length && !capturedTime[capturedTime.length - 1]['e']) {
        capturedTime[capturedTime.length - 1]['e'] = formatCapturedTime(recitationAudioTag.currentTime);
      } else {
        capturedTime.push({
          i: capturedTime.length + 1,
          s: formatCapturedTime(recitationAudioTag.currentTime),
        });
      }
      copyCapturedTimeArea.value = JSON.stringify(capturedTime);
      renderCapturedTimeDOM();
    }
  };

  const handleRemoveCapturedTheCurrentAudioTime = (e) => {
    if (currentRecitationMeta.recitatorPath && currentRecitationMeta.surahPath) {
      if (capturedTime.length) {
        if (capturedTime[capturedTime.length - 1]['e']) {
          capturedTime[capturedTime.length - 1]['e'] = null;
        } else {
          capturedTime.pop();
        }
      }
      renderCapturedTimeDOM();
    }
  };

  const handleReplayCapturedTime = (e) => {
    capturedReplayMeta.START_TIME = e.target.dataset.start === 'undefined' ? undefined : e.target.dataset.start;
    capturedReplayMeta.END_TIME = e.target.dataset.end === 'undefined' ? undefined : e.target.dataset.end;
    if (capturedReplayMeta.START_TIME && capturedReplayMeta.END_TIME) {
      capturedReplayMeta.PLAYING_CAPTURE = true;
      recitationAudioTag.currentTime = Number(e.target.dataset.start);
      if (recitationAudioTag.paused) {
        recitationAudioTag.play();
        togglePlayButtonDOM();
      }
    }
  };

  /** Event Listener */
  recitatorOption.addEventListener('change', handleRecitatorOption);
  surahOption.addEventListener('change', handleSurahOption);
  playBtn.addEventListener('click', handlePlayButton);
  rewindBtn.addEventListener('click', handleRewindButton);
  fastForwardBtn.addEventListener('click', handleFastforwardButton);
  resetBtn.addEventListener('click', handleResetButton);
  recitationAudioTag.addEventListener('timeupdate', handleAudioPlaying);
  recitationAudioTag.addEventListener('ended', handleAudioEnded);
  recitationAudioTag.addEventListener('loadedmetadata', handleAudioTagLoaded);
  captureBtn.addEventListener('click', handleCaptureTheCurrentAudioTime);

  audioTrigger.addEventListener('mousedown', (e) => {
    AUDIO_TRIGGER_IS_DRAGGING = true;
  });

  document.addEventListener('mousemove', (e) => {
    if (AUDIO_TRIGGER_IS_DRAGGING && currentRecitationMeta.recitatorPath && currentRecitationMeta.surahPath) {
      const innerAudioBarRect = innerAudioBar.getBoundingClientRect();
      if (e.x >= innerAudioBarRect.left && e.x <= innerAudioBarRect.right) {
        const audioTriggerPercentagePosition = ((e.x - innerAudioBarRect.left) / innerAudioBarRect.width) * 100;
        recitationAudioTag.currentTime = (audioTriggerPercentagePosition * recitationAudioTag.duration) / 100;
        audioTrigger.style.left = `${audioTriggerPercentagePosition}%`;
        audioBar.style.width = `${audioTriggerPercentagePosition}%`;
      }
    }
  });

  document.addEventListener('mouseup', (e) => {
    if (AUDIO_TRIGGER_IS_DRAGGING) {
      AUDIO_TRIGGER_IS_DRAGGING = false;
    }
  });

  document.addEventListener('keyup', (e) => {
    // handleCaptureTheCurrentAudioTime(e);
    switch (e.code) {
      case 'ArrowRight':
        handleFastforwardButton(e);
        break;
      case 'ArrowLeft':
        handleRewindButton(e);
        break;
      case 'KeyC':
        handleCaptureTheCurrentAudioTime(e);
        break;
      case 'KeyR':
        handleResetButton(e);
        break;
      case 'KeyZ':
        handleRemoveCapturedTheCurrentAudioTime(e);
        break;
    }
  });

  copyBtn.addEventListener('click', (e) => {
    navigator.clipboard
      .writeText(copyCapturedTimeArea.value)
      .then(() => alert('JSON has been copied to the clipboard'))
      .catch((e) => alert('Unable to copy text'));
  });
};
