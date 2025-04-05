"use client";

import React, { useState } from "react";
import styles from "./InstagramBioGenerator.module.css";
import { Button, Form } from "react-bootstrap";

type BioCategory =
    | "Funny"
    | "Aesthetic"
    | "Business"
    | "Travel"
    | "Fitness"
    | "Quotes"
    | "Love"
    | "Attitude"
    | "Self-love"
    | "Motivational"
    | "Food"
    | "Pet"
    | "Lifestyle"
    | "Art"
    | "Gaming"
    | "Music"
    | "Tech"
    | "Books"
    | "Photography"
    | "Education"
    | "Finance";

type BioTone = "Casual" | "Witty" | "Professional" | "Emotional" | "Minimalist";

const bioData: Record<BioCategory, string[]> = {
    Funny: [
        "Just a cupcake looking for a stud muffin 🍰\nSpilling sarcasm like it's tea ☕\nLaughing at my own jokes so you don't have to\nFollow me for chaotic giggles 🤪",
        "Running on caffeine, sarcasm, and inappropriate thoughts\nMeme dealer in DMs\nCan’t adult today – or ever\nStill wondering how I got verified 😂",
        "Professional overthinker since birth\nPHD in overanalyzing texts\nWill cry over spilled coffee\nYes, I talk to my dog like a therapist 🐶"
    ],
    Aesthetic: [
        "Dreaming in pastel clouds ☁️\nSoft grunge soul in a cottagecore world\nCrystals, candles, and calm vibes\nMoodboard IRL 🌙",
        "Less perfection, more authenticity ✨\nCurating color palettes for my life\nSoft heart with sharp eyeliner\nVibes as smooth as lo-fi beats 🎧",
        "Curating a life of beauty and intention\nMinimalism is my love language\nSlowing down to romanticize the mundane\nAlways in a state of aesthetic bliss"
    ],
    Business: [
        "Turning ideas into impact 💼\nHelping brands scale with strategy\nWork smarter, not harder\nLinkedIn by day, hustle by night",
        "Entrepreneur | Speaker | Doer\nSolving problems one pitch at a time\nEmpowering minds, elevating brands\nMy network is my net worth",
        "Helping brands scale with strategy\nBuilding systems that don’t sleep\nFrom startup chaos to structured success\nThe grind looks good on me"
    ],
    Travel: [
        "Globe trotter 🌍✈️\nCollecting passport stamps & memories\nBorn to wander, wired for wifi\nJet lag is my cardio",
        "Passport in one hand, confidence in the other\nWanderlust-driven & culture-fed\nI take the scenic route, always\nAdventure is my favorite language",
        "Catch flights, not feelings\nBag always packed, heart always open\nSleeping under new skies\nEvery airport is a new beginning"
    ],
    Fitness: [
        "Built not bought 💪\nFueled by protein and persistence\nMind right. Body tight.\nNo shortcuts, just sweat",
        "Chasing gains and goals\nLifting spirits & weights\nYour excuses don’t burn calories\nTrain like a beast, shine like a legend",
        "Eat. Train. Sleep. Repeat.\nFitness is my therapy\nStronger every rep\nDiscipline = freedom"
    ],
    Quotes: [
        "Be the change you wish to see in the world\nKindness is a language the blind can see\nGreat things never come from comfort zones\nInhale courage, exhale fear",
        "Do what you love, love what you do\nChase dreams, not people\nProgress is a process\nYou are exactly where you need to be",
        "Stay hungry, stay foolish\nLive with intention\nSpeak less, do more\nLet your actions inspire others"
    ],
    Love: [
        "Just a hopeless romantic in a digital world 💌\nWriting love stories with emojis\nHeart full of poetry\nLooking for a soulmate, not followers",
        "You + Me = ❤️\nLove like it's the 90s\nEye contact > screen time\nI believe in forever",
        "Heart on sleeve, always\nEmotionally available and vibing\nLoving loudly in a quiet world\nMy playlist is full of love songs"
    ],
    Attitude: [
        "Born to stand out 💥\nConfidence louder than my outfit\nSuccess tastes better when they doubt you\nWatch me win in silence",
        "Savage, not average\nClassy, boujee, a little bit bossy\nThey said I couldn’t, so I did\nKeep watching, I’m just getting started",
        "Don’t study me, you won’t graduate\nMy vibe? Expensive.\nWarning: zero tolerance for drama\nYour approval isn’t required"
    ],
    "Self-love": [
        "Learning to love the chaos inside\nHealing looks good on me\nGentle with myself, fierce with my goals\nTaking up space unapologetically",
        "Your vibe attracts your tribe\nI’m choosing me, daily\nAffirming my worth in every breath\nSoft but powerful",
        "Made of flaws and still worthy\nThis is my era of self-respect\nMy growth scares people who don’t want to evolve\nI glow differently now"
    ],
    Motivational: [
        "Progress over perfection\nFailure is feedback\nKeep going, you’re closer than you think\nDiscipline makes dreams reality",
        "Small steps every day\nThe grind will never betray you\nIt’s not about motivation, it’s about consistency\nWinners show up even when it’s hard",
        "Grind now, shine later\nLet your hustle speak volumes\nNo elevator to success, take the stairs\nOne day, or day one — you decide"
    ],
    Food: [
        "Fueled by coffee & croissants ☕🥐\nIn a committed relationship with food\nIf you need me, I’m in the fridge\nCalories don’t count on weekends 🍩",
        "Taco 'bout obsessed 🌮\nPizza is my love language\nSnack queen/king 👑\nMy heart says gym, but my stomach says fries",
        "Life is short, eat dessert first 🍰\nMaster of brunch 🥞\nWill work for snacks\nTaste buds living their best life"
    ],
    Pet: [
        "Dog hair, don't care 🐶\nFluff is my aesthetic\nPet parent 24/7\nMy dog > your boyfriend",
        "Cat mom life 🐾\nWhiskers & warm cuddles\nI meow back at my cat\nPurring through life",
        "My pet runs my world 🐾\nFur real obsessed\nThey poop, I scoop\nPaws & positive vibes only"
    ],
    Lifestyle: [
        "Chasing good energy ✨\nRomanticizing my own life\nDesigning a life I love\nVibes: high and unbothered",
        "Slowing down to enjoy life ☀️\nChoosing peace daily\nGratitude is my lifestyle\nLess stuff, more soul",
        "Curated chaos\nBalance over burnout\nSoft living in a loud world\nMaking ordinary moments beautiful"
    ],
    Art: [
        "Creating beauty one stroke at a time 🎨\nCanvas is my confessional\nI color outside the lines on purpose\nArt is how I breathe",
        "Art is freedom\nBrush in hand, world off\nSculpting feelings into form\nWhere words fail, art speaks",
        "Color outside the lines\nI draw emotions\nArt = soul on display\nDripping paint and poetry"
    ],
    Gaming: [
        "Respawning IRL 🎮\nNPC in someone else’s drama\nCatch me in the final boss battle\nGaming > adulting",
        "Leveling up one day at a time\nAchievement unlocked: Inner peace\nSave progress. Hydrate. Win.\nYes, this is my main quest",
        "Controller in hand, stress gone\nLag is my only enemy\nSkill > luck\nI play to escape, not to compete"
    ],
    Music: [
        "Living in melodies 🎶\nMy playlist knows me best\nNotes over noise\nFeeling every beat",
        "Headphones on, world off\nMusic is my therapy\nVinyl soul in a digital world\nTurn the volume up on life",
        "Musician. Dreamer. Creator.\nI speak fluent song lyrics\nDancing through heartbreaks\nSoundtrack of my journey"
    ],
    Tech: [
        "Coded in caffeine ☕\nWiFi stronger than my willpower\nI debug life one error at a time\nProud digital native",
        "Future-proof mindset 🤖\nStacking skills like code blocks\n404: sleep not found\nI dream in JavaScript",
        "Debugging life, one bug at a time\nCurrently compiling...\nTech is my playground\nSilicon soul in a carbon world"
    ],
    Books: [
        "Living between pages 📚\nMy library smells like heaven\nBook > boyfriend\nEscaping reality one chapter at a time",
        "Bookworm mode activated\nTBR pile > social life\nFiction is my love language\nPlot twists are my cardio",
        "My happy place: inside a story\nInk over pixels\nBibliophile with opinions\nBookmarks are my trophies"
    ],
    Photography: [
        "Chasing light & shadows 📸\nFreezing moments forever\nAperture addict\nSeeing beauty through the lens",
        "Moments over poses\nCapturing souls, not smiles\nSnap. Edit. Inspire.\nShutterbug for life",
        "Life through a lens\nClicking memories\nVisual storyteller\nFocus, frame, shoot"
    ],
    Education: [
        "Learning daily 🧠\nCuriosity never graduates\nEmpowered by knowledge\nStudying life in all its forms",
        "Teacher by heart\nLessons that last forever\nSharing wisdom, spreading light\nEvery student matters",
        "Knowledge is my superpower\nI’m still learning\nReading to lead\nCurious mind, limitless soul"
    ],
    Finance: [
        "Saving cents to make sense 💰\nSpending intentionally\nCredit score over clout\nInvesting in future me",
        "Budget queen 👑\nTracking coins like a boss\nCompound interest is sexy\nMoney talks, I negotiate",
        "Invest in yourself\nFinancial literacy is power\nWallet goals on point\nEarn, save, repeat"
    ]
};

export default function InstaBioGenerator() {
    const [category, setCategory] = useState<BioCategory>("Funny");
    const [tone, setTone] = useState<BioTone>("Casual");
    const [useEmojis, setUseEmojis] = useState<boolean>(true);
    const [useHashtags, setUseHashtags] = useState<boolean>(false);
    const [bio, setBio] = useState<string>("");

    const generateBio = () => {
        const options = bioData[category];
        const randomBio = options[Math.floor(Math.random() * options.length)];

        let finalBio = randomBio;

        // Tone modifier (simplified logic, can be extended)
        if (tone === "Professional") {
            finalBio = finalBio.replace(/\b(fun|crazy|lol|cool)\b/gi, "focused");
        } else if (tone === "Witty") {
            finalBio += " 😏";
        } else if (tone === "Minimalist") {
            finalBio = finalBio.split(" ").slice(0, 5).join(" ") + "...";
        }

        if (useEmojis) finalBio += " 🎯";
        if (useHashtags) finalBio += " #instabio #vibes";

        setBio(finalBio);
    };

    return (
        <div className={styles.container}>
            <Form className={styles.formArea}>
                <Form.Group>
                    <Form.Label>Choose a category:</Form.Label>
                    <Form.Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as BioCategory)}
                    >
                        {Object.keys(bioData).map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Choose a tone:</Form.Label>
                    <Form.Select
                        value={tone}
                        onChange={(e) => setTone(e.target.value as BioTone)}
                    >
                        <option>Casual</option>
                        <option>Witty</option>
                        <option>Professional</option>
                        <option>Emotional</option>
                        <option>Minimalist</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="d-flex gap-3 mt-2">
                    <Form.Check
                        type="checkbox"
                        label="Add Emojis"
                        checked={useEmojis}
                        onChange={(e) => setUseEmojis(e.target.checked)}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Add Hashtags"
                        checked={useHashtags}
                        onChange={(e) => setUseHashtags(e.target.checked)}
                    />
                </Form.Group>

                <Button className="mt-3" onClick={generateBio}>
                    Generate Bio
                </Button>
            </Form>

            {bio && (
                <div className={styles.bioOutput}>
                    <h4>Your Bio:</h4>
                    <p>{bio}</p>
                </div>
            )}
        </div>
    );
}
