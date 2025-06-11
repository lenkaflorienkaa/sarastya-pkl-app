'use client';

import { useRouter } from 'next/navigation';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  // You could fetch real data here
  const job = {
    title: 'Frontend Developer',
    description: 'Detailed description...',
    requirements: ['React', 'Tailwind', 'Next.js'],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="mt-4">{job.description}</p>
      <ul className="mt-4 list-disc list-inside">
        {job.requirements.map((req, i) => (
          <li key={i}>{req}</li>
        ))}
      </ul>
      <button
        onClick={() => router.push(`/apply/${params.id}`)}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Apply Now
      </button>
    </div>
  );
}
