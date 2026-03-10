import { c as client } from "../../../chunks/sanity.js";
const load = async () => {
  const resume = await client.fetch(`*[_type == "resume"][0]{
		name,
		jobTitle,
		phone,
		email,
		portfolioUrl,
		summary,
		interests,
		education[]{
			_key,
			degree,
			school,
			year
		},
		experience[]{
			_key,
			role,
			employer,
			start,
			end,
			achievment[]{
				_key,
				achievment
			}
		},
		skills[]{value}
	}`);
  const skills = resume?.skills?.map((s) => s.value).sort() ?? [];
  const experience = resume?.experience?.map((item) => ({
    ...item,
    start: item.start ? formatDate(item.start) : "",
    end: item.end ? formatDate(item.end) : ""
  })) ?? [];
  return {
    resume: {
      ...resume,
      experience,
      skills
    }
  };
};
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
export {
  load
};
