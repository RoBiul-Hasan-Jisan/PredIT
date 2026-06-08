import PillGroup from '../PillGroup'

interface FormStep4Props {
  data: any
  setData: (data: any) => void
  errors: Set<string>
}

export default function FormStep4({ data, setData, errors }: FormStep4Props) {
  return (
    <div className="animate-slideIn space-y-8 px-9 py-8 max-sm:px-5">
      <div>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-sage-dk">
          Home Environment
        </p>
        <h2 className="font-playfair text-3xl font-bold text-plum">
          Your support<br />system at home
        </h2>
      </div>

      <div className="space-y-7">
        <PillGroup
          label="How involved are your parents in your education?"
          field="parental_involvement"
          options={['Low', 'Medium', 'High']}
          value={data.parental_involvement}
          onChange={(value) => setData({ ...data, parental_involvement: value })}
          hasError={errors.has('parental_involvement')}
        />

        <PillGroup
          label="What is the highest education level of your parents?"
          field="parental_education_level"
          options={[{ label: 'None', value: 'Uneducated' }, { label: 'High School', value: 'High School' }, { label: 'College', value: 'College' }, { label: 'Postgraduate', value: 'Postgraduate' }]}
          value={data.parental_education_level}
          onChange={(value) => setData({ ...data, parental_education_level: value })}
          hasError={errors.has('parental_education_level')}
        />

        <PillGroup
          label="How would you rate the quality of your teachers?"
          field="teacher_quality"
          options={[{ label: '⭐ Low', value: 'Low' }, { label: '⭐⭐ Medium', value: 'Medium' }, { label: '⭐⭐⭐ High', value: 'High' }]}
          value={data.teacher_quality}
          onChange={(value) => setData({ ...data, teacher_quality: value })}
          hasError={errors.has('teacher_quality')}
        />

        <PillGroup
          label="How accessible are learning resources at home? (books, internet, etc.)"
          field="access_to_resources"
          options={[{ label: 'Limited', value: 'Low' }, { label: 'Some', value: 'Medium' }, { label: 'Plenty', value: 'High' }]}
          value={data.access_to_resources}
          onChange={(value) => setData({ ...data, access_to_resources: value })}
          hasError={errors.has('access_to_resources')}
        />
      </div>
    </div>
  )
}
