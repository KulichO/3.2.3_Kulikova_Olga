export type Launch = {
  mission_name: string;
  links: { mission_patch_small?: string | null; mission_patch?: string | null };

  rocket: { rocket_name: string };

  details: string;
};
