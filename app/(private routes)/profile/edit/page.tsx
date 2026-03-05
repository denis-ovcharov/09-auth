"use client";

import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";
import { getMe, updateMe } from "@/lib/api/clientApi";

export default function EditProfilePage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.username ?? "");
      setPhotoUrl(user.avatar ?? "");
      setUserEmail(user.email);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const onCancel = () => {
    router.push("/profile");
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedUser = await updateMe({ username: userName });
    setUser(updatedUser);
    router.push("/profile");
  };

  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Edit Profile</h1>

          <Image
            src={
              photoUrl ||
              "https://ac.goit.global/fullstack/react/default-avatar.jpg"
            }
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />

          <form className={css.profileInfo} onSubmit={handleSaveUser}>
            <div className={css.usernameWrapper}>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                className={css.input}
                value={userName}
                onChange={handleChange}
              />
            </div>

            <p>Email: {userEmail}</p>

            <div className={css.actions}>
              <button type="submit" className={css.saveButton}>
                Save
              </button>
              <button
                type="button"
                className={css.cancelButton}
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
