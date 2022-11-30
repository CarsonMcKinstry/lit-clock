import { useSettings } from './context';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

export const SettingsPage = () => {
    const router = useRouter();
    const { dark_mode, updateSettings } = useSettings() ?? {};

    const [darkMode, setDarkMode] = useState(() => dark_mode);

    const saveChanges = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // updateSettings?.({
        //     id: '1',
        //     dark_mode: !!darkMode,
        // }).then((data) => {
        //     router.push('/');
        // });
    };

    return (
        <div
            className={cn(
                'h-full w-full flex flex-col transition-all duration-500',
                {
                    'bg-neutral-800': darkMode,
                    'bg-neutral-100': !darkMode,
                }
            )}
        >
            <h1
                className={cn(
                    'text-center p-4 text-3xl font-extrabold tracking-wider',
                    {
                        'text-neutral-200': darkMode,
                        'text-neutral-700': !darkMode,
                    }
                )}
            >
                Settings
            </h1>
            <form
                onSubmit={saveChanges}
                className="flex flex-col justify-between h-full"
            >
                <div className="settings-grid">
                    <label
                        className={cn(
                            'justify-self-center self-center toggle pt-4 pb-4 pl-6 pr-6 rounded border-4 font-bold',
                            {
                                'bg-white border-neutral-900 text-neutral-700':
                                    !darkMode,
                                'bg-neutral-900 border-white text-neutral-200':
                                    darkMode,
                            }
                        )}
                    >
                        <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={() => setDarkMode((t) => !t)}
                        />
                        Dark Mode
                    </label>
                </div>
                <div className="w-full flex justify-end p-4">
                    <button
                        className={cn('pt-2 pb-2 pr-5 pl-5 rounded border-2', {
                            'bg-white border-neutral-900 text-neutral-700':
                                !darkMode,
                            'bg-neutral-900 border-white text-neutral-200':
                                darkMode,
                        })}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};
