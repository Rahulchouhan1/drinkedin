import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

// ─── MOCK DATA ──────────────────────────────────────────────────────────────────

const STORIES = [
  { id: '0', name: 'Your Story', avatar: null, isYou: true },
  { id: '1', name: 'Rahul', avatar: '🧔' },
  { id: '2', name: 'Priya', avatar: '👩' },
  { id: '3', name: 'Amit', avatar: '👨‍💼' },
  { id: '4', name: 'Neha', avatar: '👩‍🎤' },
  { id: '5', name: 'Sky Bar', avatar: '🍸' },
  { id: '6', name: 'Trek Co', avatar: '🏔️' },
];

const POSTS = [
  {
    id: '1',
    author: 'Rahul Sharma',
    role: 'Software Engineer at Google',
    avatar: '🧔',
    category: 'DRINKS',
    categoryColor: '#A78BFA',
    timeAgo: '2h ago',
    content:
      'Had an amazing evening at the new rooftop bar downtown! 🍻 The vibe was incredible. Anyone up for a drink this weekend?',
    likes: 42,
    comments: 8,
  },
  {
    id: '2',
    author: 'Sky Lounge Bar',
    role: '🏪 Premium Rooftop Bar · Koramangala',
    avatar: '🍸',
    category: 'BUSINESS',
    categoryColor: '#FBBF24',
    timeAgo: '5h ago',
    content:
      '🎉 FRIDAY SPECIAL! Buy 1 Get 1 on all craft cocktails. Live DJ from 8 PM. Book your table now! #SkyLounge #FridayNight',
    likes: 128,
    comments: 23,
  },
  {
    id: '3',
    author: 'Priya Patel',
    role: 'Product Manager at Flipkart',
    avatar: '👩',
    category: 'TREKKING',
    categoryColor: '#34D399',
    timeAgo: '1d ago',
    content:
      'Just completed the Skandagiri sunrise trek! 🌄 The view was breathtaking. Looking for a group to do Kudremukh next month. Who\'s in?',
    likes: 89,
    comments: 31,
  },
  {
    id: '4',
    author: 'Amit Kumar',
    role: 'Founder at TechStart',
    avatar: '👨‍💼',
    category: 'DINNER',
    categoryColor: '#F87171',
    timeAgo: '3h ago',
    content:
      'Team dinner at The Biere Club! 🍝 Nothing beats good food with great company. Highly recommend their truffle pasta!',
    likes: 56,
    comments: 12,
  },
];

// ─── STORY ITEM ─────────────────────────────────────────────────────────────────

function StoryItem({ item }: { item: (typeof STORIES)[0] }) {
  return (
    <TouchableOpacity style={styles.storyItem} activeOpacity={0.7}>
      <View style={[styles.storyRing, item.isYou && styles.storyRingYou]}>
        <View style={styles.storyAvatar}>
          {item.isYou ? (
            <Text style={styles.storyPlusIcon}>+</Text>
          ) : (
            <Text style={styles.storyAvatarEmoji}>{item.avatar}</Text>
          )}
        </View>
      </View>
      <Text style={styles.storyName} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

// ─── POST CARD ──────────────────────────────────────────────────────────────────

function PostCard({ post }: { post: (typeof POSTS)[0] }) {
  return (
    <View style={styles.postCard}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <View style={styles.postAvatarCircle}>
          <Text style={styles.postAvatarEmoji}>{post.avatar}</Text>
        </View>
        <View style={styles.postAuthorInfo}>
          <Text style={styles.postAuthorName}>{post.author}</Text>
          <Text style={styles.postAuthorRole} numberOfLines={1}>
            {post.role}
          </Text>
        </View>
        <View style={[styles.categoryBadge, { backgroundColor: post.categoryColor + '20' }]}>
          <Text style={[styles.categoryText, { color: post.categoryColor }]}>
            {post.category}
          </Text>
        </View>
      </View>

      {/* Post Content */}
      <Text style={styles.postContent}>{post.content}</Text>

      {/* Post Footer */}
      <View style={styles.postFooter}>
        <Text style={styles.postTimeAgo}>{post.timeAgo}</Text>
        <View style={styles.postActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>❤️</Text>
            <Text style={styles.actionCount}>{post.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>💬</Text>
            <Text style={styles.actionCount}>{post.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🔗</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ─── FEED SCREEN ────────────────────────────────────────────────────────────────

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />

      <SafeAreaView style={styles.safeArea}>
        {/* App Header */}
        <View style={styles.appHeader}>
          <View style={styles.headerSearchContainer}>
            <Text style={styles.headerSearchIcon}>🔍</Text>
            <Text style={styles.headerSearchText}>Search</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerIconButton}>
              <Text style={styles.headerIcon}>💬</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerProfileBtn}>
              <Text style={styles.headerProfileEmoji}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={POSTS}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.feedContent}
          ListHeaderComponent={() => (
            <>
              {/* Stories */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.storiesContainer}
              >
                {STORIES.map((story) => (
                  <StoryItem key={story.id} item={story} />
                ))}
              </ScrollView>

              {/* Create Post Prompt */}
              <View style={styles.createPostBar}>
                <View style={styles.createPostAvatar}>
                  <Text style={{ fontSize: 18 }}>😊</Text>
                </View>
                <TouchableOpacity style={styles.createPostInput}>
                  <Text style={styles.createPostPlaceholder}>
                    What's happening tonight?
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.createPostImageBtn}>
                  <Text style={{ fontSize: 20 }}>📸</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          renderItem={({ item }) => <PostCard post={item} />}
        />
      </SafeAreaView>
    </View>
  );
}

// ─── STYLES ─────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  safeArea: {
    flex: 1,
  },

  // Header
  // Header
  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
    gap: Spacing.three,
  },
  headerSearchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.backgroundElement,
    height: 36,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
  },
  headerSearchIcon: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
  },
  headerSearchText: {
    color: Colors.dark.textSecondary,
    fontSize: 14,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  headerIconButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 22,
  },
  headerProfileBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerProfileEmoji: {
    fontSize: 18,
  },

  feedContent: {
    paddingBottom: 100,
  },

  // Stories
  storiesContainer: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    gap: Spacing.three,
  },
  storyItem: {
    alignItems: 'center',
    width: 68,
    gap: Spacing.one,
  },
  storyRing: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2.5,
    borderColor: Colors.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyRingYou: {
    borderColor: Colors.dark.border,
    borderStyle: 'dashed',
  },
  storyAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.dark.backgroundElement,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyPlusIcon: {
    fontSize: 24,
    color: Colors.dark.primary,
    fontWeight: '300',
  },
  storyAvatarEmoji: {
    fontSize: 24,
  },
  storyName: {
    fontSize: 11,
    color: Colors.dark.textSecondary,
    fontWeight: '500',
  },

  // Create Post
  createPostBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    gap: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  createPostAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.backgroundElement,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createPostInput: {
    flex: 1,
    height: 40,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
  },
  createPostPlaceholder: {
    color: Colors.dark.textSecondary,
    fontSize: 14,
  },
  createPostImageBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.backgroundElement,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Post Card
  postCard: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginBottom: Spacing.three,
  },
  postAvatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.dark.backgroundElement,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postAvatarEmoji: {
    fontSize: 22,
  },
  postAuthorInfo: {
    flex: 1,
  },
  postAuthorName: {
    color: Colors.dark.text,
    fontSize: 15,
    fontWeight: '700',
  },
  postAuthorRole: {
    color: Colors.dark.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  postContent: {
    color: Colors.dark.text,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: Spacing.three,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  postTimeAgo: {
    color: Colors.dark.textSecondary,
    fontSize: 12,
  },
  postActions: {
    flexDirection: 'row',
    gap: Spacing.four,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  actionIcon: {
    fontSize: 16,
  },
  actionCount: {
    color: Colors.dark.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
});
