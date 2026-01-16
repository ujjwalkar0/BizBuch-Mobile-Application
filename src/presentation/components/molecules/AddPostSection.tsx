// import React, { useMemo } from 'react';
// import { View, TouchableOpacity, ViewStyle } from 'react-native';
// import { faImage, faVideo, faPen } from '@fortawesome/free-solid-svg-icons';
// import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
// import { theme } from '../../theme';
// import { AvatarRing } from '../atoms/AvatarRing';
// import { AvatarImage } from '../atoms/AvatarImage';
// import { PostInputBar } from '../atoms/PostInputBar';
// import { IconTextButton } from '../atoms/IconTextButton';

// const { addPostSection } = theme.components;

// /**
//  * Action configuration for AddPostSection
//  * Single Responsibility: Define available post actions
//  * SOLID: Open/Closed - Easy to add new actions without modifying component
//  */
// interface PostAction {
//   id: string;
//   icon: IconDefinition;
//   label: string;
//   color: string;
// }

// const POST_ACTIONS: PostAction[] = [
//   { id: 'post', icon: faPen, label: 'Post', color: theme.colors.primary },
//   { id: 'photo', icon: faImage, label: 'Photo', color: theme.colors.green500 },
//   { id: 'video', icon: faVideo, label: 'Video', color: theme.colors.red500 },
// ];

// interface AddPostSectionProps {
//   onPress?: () => void;
//   onActionPress?: (actionId: string) => void;
//   userAvatar?: string;
//   userName?: string;
//   placeholder?: string;
// }

// /**
//  * AddPostSection Molecule
//  * Atomic Design: Molecule - Composed of AvatarRing, AvatarImage, PostInputBar, IconTextButton atoms
//  * Single Responsibility: Display post creation entry point
//  * SOLID: Open/Closed - Extensible via props, styles from theme
//  * SOLID: Dependency Inversion - Depends on atom abstractions
//  */
// export const AddPostSection: React.FC<AddPostSectionProps> = ({
//   onPress,
//   onActionPress,
//   userAvatar,
//   userName = 'User',
//   placeholder,
// }) => {
//   const containerStyle = useMemo<ViewStyle>(
//     () => ({
//       backgroundColor: theme.colors.white,
//       padding: addPostSection.padding,
//       marginHorizontal: addPostSection.marginHorizontal,
//       marginTop: addPostSection.marginTop,
//       marginBottom: addPostSection.marginBottom,
//       borderRadius: addPostSection.borderRadius,
//       borderWidth: addPostSection.borderWidth,
//       borderColor: theme.colors.gray200,
//       shadowColor: theme.colors.gray900,
//       shadowOffset: addPostSection.shadowOffset,
//       shadowOpacity: addPostSection.shadowOpacity,
//       shadowRadius: addPostSection.shadowRadius,
//       elevation: addPostSection.elevation,
//     }),
//     [],
//   );

//   const inputRowStyle = useMemo<ViewStyle>(
//     () => ({
//       flexDirection: 'row',
//       alignItems: 'center',
//     }),
//     [],
//   );

//   const dividerStyle = useMemo<ViewStyle>(
//     () => ({
//       height: addPostSection.dividerHeight,
//       backgroundColor: theme.colors.gray200,
//       marginVertical: addPostSection.dividerMarginVertical,
//     }),
//     [],
//   );

//   const actionsRowStyle = useMemo<ViewStyle>(
//     () => ({
//       flexDirection: 'row',
//       justifyContent: 'space-around',
//     }),
//     [],
//   );

//   const initial = userName?.[0]?.toUpperCase() ?? '?';

//   return (
//     <View style={containerStyle}>
//       {/* Top Row: Avatar + Input */}
//       <TouchableOpacity
//         style={inputRowStyle}
//         activeOpacity={0.7}
//         onPress={onPress}
//       >
//         <AvatarRing
//           size={addPostSection.avatarSize}
//           borderWidth={addPostSection.avatarRingBorderWidth}
//           borderColor={`${theme.colors.primary}30`}
//           padding={addPostSection.avatarRingPadding}
//         >
//           <AvatarImage
//             uri={userAvatar}
//             initial={initial}
//             size={addPostSection.avatarSize}
//           />
//         </AvatarRing>
//         <PostInputBar placeholder={placeholder} />
//       </TouchableOpacity>

//       {/* Divider */}
//       <View style={dividerStyle} />

//       {/* Action Row */}
//       <View style={actionsRowStyle}>
//         {POST_ACTIONS.map((action) => (
//           <IconTextButton
//             key={action.id}
//             icon={action.icon}
//             label={action.label}
//             iconColor={action.color}
//             onPress={() => onActionPress?.(action.id)}
//           />
//         ))}
//       </View>
//     </View>
//   );
// };
