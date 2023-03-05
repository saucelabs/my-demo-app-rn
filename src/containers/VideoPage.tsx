import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ContainerHeader from '../components/ContainerHeader';
import I18n from '../config/I18n';
import {Colors} from '../styles/Colors';
import {testProperties} from '../config/TestProperties';

const VideoPage = () => {
  const [playing, setPlaying] = useState(true);
  const [isMute, setMute] = useState(false);
  const controlRef = useRef();
  const togglePlaying = () => {
    setPlaying(!playing);
  };
  const seekBackAndForth = (control: string) => {
    console.log('currentTime');
    // @ts-ignore
    controlRef.current?.getCurrentTime().then((currentTime: number) => {
      control === 'forward'
        ? // @ts-ignore
          controlRef.current?.seekTo(currentTime + 15, true)
        : // @ts-ignore
          controlRef.current?.seekTo(currentTime - 15, true);
    });
  };
  const muteVideo = () => setMute(!isMute);
  const ControlIcon = ({
    name,
    onPress,
  }: {
    name: string;
    onPress: () => void;
  }) => (
    <View
      style={styles.videoIconContainer}
      {...testProperties(`video icon ${name}`)}>
      <Icon name={name} onPress={onPress} size={20} style={styles.videoIcon} />
    </View>
  );

  return (
    <View style={styles.container} {...testProperties(I18n.t('video.testId'))}>
      <ContainerHeader
        title={I18n.t('video.header')}
        containerStyle={styles.containerHeader}
      />
      <YoutubePlayer
        height={300}
        // @ts-ignore
        ref={controlRef}
        play={playing}
        mute={isMute}
        videoId={'DHY0LndPigE'}
      />
      <View style={styles.controlContainer}>
        <ControlIcon
          onPress={() => seekBackAndForth('rewind')}
          name="backward"
        />
        <ControlIcon onPress={togglePlaying} name={playing ? 'stop' : 'play'} />
        <ControlIcon
          onPress={() => seekBackAndForth('forward')}
          name="forward"
        />
        <ControlIcon
          onPress={muteVideo}
          name={isMute ? 'volume-mute' : 'volume-up'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containerHeader: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingHorizontal: 0,
    paddingVertical: 0,
    height: 20,
    flex: 0.2,
    marginVertical: 50,
  },
  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  videoIconContainer: {
    height: 40,
    width: 40,
    backgroundColor: Colors.green,
    borderWidth: 1,
    borderColor: Colors.green,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoIcon: {
    color: Colors.dark,
  },
});

export default VideoPage;
