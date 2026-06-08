import PillGroup from '../PillGroup'

interface FormStep1Props {
  data: any
  setData: (data: any) => void
  errors: Set<string>
}

export default function FormStep1({ data, setData, errors }: FormStep1Props) {
  return (
    <div className="animate-slideIn space-y-10 px-10 py-10 max-sm:px-6">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
          Step 1 of 4
        </p>
        <h2 className="font-playfair text-3xl font-bold text-foreground">
          Tell us <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">About You</span>
        </h2>
      </div>

      <div className="space-y-7">
        <PillGroup
          label="What is your gender?"
          field="gender"
          options={['Male', 'Female']}
          value={data.gender}
          onChange={(value) => setData({ ...data, gender: value })}
          hasError={errors.has('gender')}
        />

        <PillGroup
          label="What type of school do you attend?"
          field="school_type"
          options={[{ label: '🏫 Public School', value: 'Public' }, { label: '🎓 Private School', value: 'Private' }]}
          value={data.school_type}
          onChange={(value) => setData({ ...data, school_type: value })}
          hasError={errors.has('school_type')}
        />

        <PillGroup
          label="How far is your home from school?"
          field="distance_from_home"
          options={[{ label: '📍 Near', value: 'Near' }, { label: '🚌 Moderate', value: 'Moderate' }, { label: '🗺️ Far', value: 'Far' }]}
          value={data.distance_from_home}
          onChange={(value) => setData({ ...data, distance_from_home: value })}
          hasError={errors.has('distance_from_home')}
        />

        <PillGroup
          label="How would you describe your family's income level?"
          field="family_income"
          options={['Low', 'Medium', 'High']}
          value={data.family_income}
          onChange={(value) => setData({ ...data, family_income: value })}
          hasError={errors.has('family_income')}
        />
      </div>
    </div>
  )
}
