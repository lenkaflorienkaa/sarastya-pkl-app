import { Checkbox } from "@/components/ui/checkbox";

interface SignUpTermsProps {
  terms: boolean;
  onChange: (checked: boolean) => void;
}

const SignUpTerms = ({ terms, onChange }: SignUpTermsProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" checked={terms} onCheckedChange={onChange} />
      <label htmlFor="terms" className="text-sm font-medium leading-none">
        {/* Original text split into two lines for demonstration */}
        I agree to the terms of use of Sarastya Agility's
        <span className="block mt-1">Internship Program.</span>
        {/* OR if you want to control line-height more directly:
        <span className="block" style={{ lineHeight: '1.5em' }}>Internship Program.</span>
        */}
      </label>
    </div>
  );
};

export default SignUpTerms;