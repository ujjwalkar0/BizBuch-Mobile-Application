import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { styles } from './styles';

interface Feeling {
  id: string;
  label: string;
  emoji: string;
}

interface Props {
  audience: string;
  userName: string;
  feeling?: Feeling | null;
}

export const UserSection: React.FC<Props> = ({
  audience,
  userName,
  feeling,
}) => (
  <View style={styles.userSection}>
    <Image
      source={{
        uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      }}
      style={styles.avatar}
    />

    <View style={styles.userInfo}>
      <Text style={styles.userName}>
        {userName}
        {feeling && (
          <Text style={styles.feelingInline}>
            {' '}is feeling {feeling.emoji} {feeling.label}
          </Text>
        )}
      </Text>

      {/* currently audiences are public. We will add a dropdown later in release/3.0 */}
      <TouchableOpacity style={styles.audienceButton}>
        <FontAwesomeIcon icon={faUsers} size={12} />
        <Text style={styles.audienceText}>{audience}</Text>
      </TouchableOpacity>
      
    </View>
  </View>
);
