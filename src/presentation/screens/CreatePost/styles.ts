import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 6,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  postButton: {
    backgroundColor: '#f29520',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#F6C27A',
  },
  postButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  userInfo: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
  },
  audienceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
  },
  audienceText: {
    marginLeft: 4,
    fontSize: 12,
  },
  textArea: {
    minHeight: 240,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#000',
    textAlignVertical: 'top',
  },
  imageContainer: {
    marginHorizontal: 16,
    marginTop: 10,
    position: 'relative',
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    padding: 6,
  },
  addSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 8,
    color: '#374151',
  },
  addOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addOption: {
    alignItems: 'center',
    width: '22%',
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  hashtagSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
  hashtagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  badgeText: {
    fontSize: 12,
    color: '#374151',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  bottomSheet: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  sheetOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },

  sheetText: {
    marginLeft: 12,
    fontSize: 16,
  },

  cancel: {
    justifyContent: 'center',
  },

  cancelText: {
    textAlign: 'center',
    color: '#DC2626',
    fontWeight: '600',
  },
  // Poll Creator Styles
  pollContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },

  pollHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  pollTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },

  pollQuestionInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },

  pollOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  pollOptionInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
  },

  addPollOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  addPollText: {
    marginLeft: 6,
    color: '#2563EB',
    fontWeight: '500',
  },
  // End Poll Creator Styles
  // Feeling Picker Styles
  sheetTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },

  feelingItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 16,
  },

  feelingEmoji: {
    fontSize: 28,
  },

  feelingLabel: {
    fontSize: 12,
    marginTop: 4,
  },

  feelingPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 8,
  },

  feelingPreviewText: {
    fontSize: 14,
    fontWeight: '500',
  },

  feelingInline: {
    fontSize: 14,
    fontWeight: '400',
    color: '#374151',
  },

  // End Feeling Picker Styles
});
