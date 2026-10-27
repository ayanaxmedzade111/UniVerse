import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyConfessionLocally } from './aiClassifier';

test('classifies love & crushes confession with romantic sentiment', () => {
  const result = classifyConfessionLocally(
    'I have a huge crush on the person sitting next to me in calculus class. Their smile is so cute!',
    'Calculus crush'
  );
  assert.equal(result.category, 'Love & Crushes');
  assert.equal(result.sentiment, 'Romantic');
  assert.equal(result.moderationStatus, 'Published');
});

test('identifies questions and requests for advice', () => {
  const result = classifyConfessionLocally(
    'How do I prepare for the econometrics midterm? Any tips or advice for surviving the exam?',
    'Midterm help'
  );
  assert.equal(result.category, 'Academic Life');
  assert.equal(result.isQuestion, true);
  assert.equal(result.needsAdvice, true);
});

test('flags confessions containing personal phone numbers or emails for moderation review', () => {
  const result = classifyConfessionLocally(
    'Lost my keys near the library, call me at +994 50 123 45 67 if found!',
    'Lost keys'
  );
  assert.equal(result.containsPersonalInfo, true);
  assert.equal(result.potentialViolation, true);
  assert.equal(result.moderationStatus, 'Needs Review');
});

test('classifies roommate complaints as Roommates category with frustrated sentiment', () => {
  const result = classifyConfessionLocally(
    'My roommate keeps leaving the alarm at 6am on full volume and dirty dishes everywhere. So frustrated and tired of this dorm!',
    'Dorm struggle'
  );
  assert.equal(result.category, 'Roommates');
  assert.equal(result.sentiment, 'Frustrated');
});
