import Slider from '../Slider'
import PillGroup from '../PillGroup'

interface FormStep3Props {
  data: any
  setData: (data: any) => void
  errors: Set<string>
}

export default function FormStep3({ data, setData, errors }: FormStep3Props) {
  return (
    <div className="animate-slideIn space-y-8 px-9 py-8 max-sm:px-5">
      <div>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-sage-dk">
          Academics & Health
        </p>
        <h2 className="font-playfair text-3xl font-bold text-plum">
          Your performance<br />& wellbeing
        </h2>
      </div>

      <div className="space-y-7">
        <Slider
          label="What was your previous exam score?"
          value={data.previous_scores}
          onChange={(value) => setData({ ...data, previous_scores: value })}
          min={50}
          max={100}
          step={1}
          suffix=""
          minLabel="50"
          maxLabel="100"
        />

        <Slider
          label="How many hours of physical activity do you do per week?"
          value={data.physical_activity}
          onChange={(value) => setData({ ...data, physical_activity: value })}
          min={0}
          max={6}
          step={1}
          suffix=""
          minLabel="0 hrs"
          maxLabel="6 hrs"
        />

        <PillGroup
          label="Do you have any learning disabilities?"
          field="learning_disabilities"
          options={['Yes', 'No']}
          value={data.learning_disabilities}
          onChange={(value) => setData({ ...data, learning_disabilities: value })}
          hasError={errors.has('learning_disabilities')}
        />

        <PillGroup
          label="How would you describe your motivation level?"
          field="motivation_level"
          options={[{ label: '😔 Low', value: 'Low' }, { label: '😐 Medium', value: 'Medium' }, { label: '🔥 High', value: 'High' }]}
          value={data.motivation_level}
          onChange={(value) => setData({ ...data, motivation_level: value })}
          hasError={errors.has('motivation_level')}
        />

        <PillGroup
          label="How do your peers influence your studies?"
          field="peer_influence"
          options={[{ label: '👎 Negative', value: 'Negative' }, { label: '😶 Neutral', value: 'Neutral' }, { label: '👍 Positive', value: 'Positive' }]}
          value={data.peer_influence}
          onChange={(value) => setData({ ...data, peer_influence: value })}
          hasError={errors.has('peer_influence')}
        />
      </div>
    </div>
  )
}
