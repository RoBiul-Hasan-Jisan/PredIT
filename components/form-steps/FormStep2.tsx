import Slider from '../Slider'
import PillGroup from '../PillGroup'

interface FormStep2Props {
  data: any
  setData: (data: any) => void
  errors: Set<string>
}

export default function FormStep2({ data, setData, errors }: FormStep2Props) {
  return (
    <div className="animate-slideIn space-y-10 px-10 py-10 max-sm:px-6">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
          Step 2 of 4
        </p>
        <h2 className="font-playfair text-3xl font-bold text-foreground">
          How do you <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Spend Your Time</span>?
        </h2>
      </div>

      <div className="space-y-7">
        <Slider
          label="How many hours do you study per day?"
          value={data.hours_studied}
          onChange={(value) => setData({ ...data, hours_studied: value })}
          min={1}
          max={10}
          step={1}
          suffix=""
          minLabel="1 hr"
          maxLabel="10 hrs"
        />

        <Slider
          label="What is your class attendance percentage?"
          value={data.attendance}
          onChange={(value) => setData({ ...data, attendance: value })}
          min={60}
          max={100}
          step={1}
          suffix="%"
          minLabel="60%"
          maxLabel="100%"
        />

        <Slider
          label="How many hours of sleep do you get each night?"
          value={data.sleep_hours}
          onChange={(value) => setData({ ...data, sleep_hours: value })}
          min={4}
          max={10}
          step={1}
          suffix=""
          minLabel="4 hrs"
          maxLabel="10 hrs"
        />

        <Slider
          label="How many tutoring sessions do you attend per month?"
          value={data.tutoring_sessions}
          onChange={(value) => setData({ ...data, tutoring_sessions: value })}
          min={0}
          max={8}
          step={1}
          suffix=""
          minLabel="0"
          maxLabel="8"
        />

        <PillGroup
          label="Do you participate in extracurricular activities?"
          field="extracurricular_activities"
          options={[{ label: '✅ Yes', value: 'Yes' }, { label: '❌ No', value: 'No' }]}
          value={data.extracurricular_activities}
          onChange={(value) => setData({ ...data, extracurricular_activities: value })}
          hasError={errors.has('extracurricular_activities')}
        />

        <PillGroup
          label="Do you have access to the internet at home?"
          field="internet_access"
          options={[{ label: '✅ Yes', value: 'Yes' }, { label: '❌ No', value: 'No' }]}
          value={data.internet_access}
          onChange={(value) => setData({ ...data, internet_access: value })}
          hasError={errors.has('internet_access')}
        />
      </div>
    </div>
  )
}
