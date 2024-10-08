const fs = require('fs');
const path = require('path');

const files = {
    'watering.txt': `**Watering Plants**

1. Frequency:
   - Most indoor plants should be watered once a week.
   - During hotter months, you may need to water more frequently.

2. Techniques:
   - Water thoroughly until it drains out of the bottom of the pot.
   - Avoid watering the leaves; focus on the soil.

3. Common Mistakes:
   - Overwatering: Look for yellowing leaves as a sign of overwatering.
   - Underwatering: If the soil feels dry an inch below the surface, it’s time to water.
`,

    'sunlight.txt': `**Sunlight Requirements for Plants**

1. Low Light Plants:
   - Snake Plant: Thrives in low light, water sparingly.
   - Pothos: Adapts well to low light, but prefers indirect sunlight.

2. Medium Light Plants:
   - Peace Lily: Needs moderate light; avoid direct sun.
   - Spider Plant: Prefers indirect sunlight but can tolerate low light.

3. High Light Plants:
   - Succulents: Require full sunlight; water less frequently.
   - Fiddle Leaf Fig: Needs bright, indirect light to thrive.
`,

    'fertilizing.txt': `**Fertilizing Plants**

1. When to Fertilize:
   - Spring: Most plants benefit from fertilization during their active growth phase.
   - Summer: Fertilize every 4-6 weeks during the growing season.

2. Types of Fertilizer:
   - Liquid Fertilizer: Best for quick nutrient absorption.
   - Slow-Release Fertilizer: Gradually feeds plants over time.

3. Common Mistakes:
   - Over-fertilizing: Too much fertilizer can burn the roots; always follow package instructions.
   - Fertilizing Dormant Plants: Avoid fertilizing during the winter months.
`,

    'pest_control.txt': `**Pest Control for Plants**

1. Common Pests:
   - Aphids: Small, green insects that suck sap; often found on new growth.
   - Spider Mites: Tiny, web-spinning pests; look for fine webbing on leaves.

2. Prevention Tips:
   - Keep plants clean: Wipe leaves with a damp cloth to remove dust.
   - Quarantine new plants: Always isolate new plants for a few weeks to prevent infestations.

3. Treatment Options:
   - Neem Oil: A natural pesticide effective against many pests.
   - Insecticidal Soap: Safe for most plants and effective against soft-bodied insects.
`,

    'growth_tracking.txt': `**Tracking Plant Growth**

1. Measurement:
   - Measure height weekly or bi-weekly; note any changes.
   - Take photos to visually track growth over time.

2. Notes:
   - Keep a journal of watering, fertilization, and any pest treatments.
   - Record the date of new leaf growth or flower blooms.

3. Tools:
   - Use a ruler or measuring tape for accurate height measurements.
   - Consider using a plant care app for reminders and tracking.
`
};

// Create the files
for (const [fileName, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(__dirname, 'data', fileName), content);
}
